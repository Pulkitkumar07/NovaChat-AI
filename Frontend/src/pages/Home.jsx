import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import ChatMobileBar from "../components/chats/ChatMobileBar.jsx";
import ChatSidebar from "../components/chats/ChatSidebar.jsx";
import ChatMessages from "../components/chats/ChatMessages.jsx";
import ChatComposer from "../components/chats/ChatComposer.jsx";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  startNewChat,
  selectChat,
  setInput,
  sendingStarted,
  sendingFinished,
  setChats,
} from "../store/chatSlice.js";

const BASE_URL = "https://chat-gpt-clone-hcp6.onrender.com";

const Home = () => {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chat.chats);
  const activeChatId = useSelector((state) => state.chat.activeChatId);
  const input = useSelector((state) => state.chat.input);
  const isSending = useSelector((state) => state.chat.isSending);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  const getMessages = async (chatId) => {
    if (!chatId) return;
    try {
      const response = await axios.get(`${BASE_URL}/chat/messages/${chatId}`, {
        withCredentials: true,
      });
      if (!response.data?.messages) return setMessages([]);
      setMessages(
        response.data.messages.map((m) => ({
          type: m.role === "user" ? "user" : "ai",
          content: m.content,
        }))
      );
    } catch {
      setMessages([]);
    }
  };

  const handleNewChat = async () => {
    let title = window.prompt("Enter chat title:", "");
    if (!title?.trim()) return;

    const response = await axios.post(
      `${BASE_URL}/chat/chats`,
      { title },
      { withCredentials: true }
    );

    dispatch(startNewChat(response.data.chat));
    getMessages(response.data.chat._id);
    setSidebarOpen(false);
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/chat`, { withCredentials: true })
      .then((res) => dispatch(setChats(res.data.chats.reverse())))
      .catch(() => {});

    const s = io("https://chat-gpt-clone-1-gz4v.onrender.com", {
      withCredentials: true,
      transports: ["websocket"],
    });

    s.on("ai-response", (payload) => {
      setMessages((prev) => [...prev, { type: "ai", content: payload.content }]);
      dispatch(sendingFinished());
    });

    setSocket(s);
    return () => s.disconnect();
  }, []);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || !activeChatId || isSending) return;

    dispatch(sendingStarted());
    setMessages((prev) => [...prev, { type: "user", content: trimmed }]);
    dispatch(setInput(""));
    socket.emit("ai-message", { chat: activeChatId, content: trimmed });
  };

  return (
    <div className=" flex  h-screen bg-black  text-white ">
    
      <div className="hidden md:flex">
        <ChatSidebar
          chats={chats}
          activeChatId={activeChatId}
          onSelectChat={(id) => {
            dispatch(selectChat(id));
            getMessages(id);
          }}
          onNewChat={handleNewChat}
          open={true}
        />
      </div>

      {/* Mobile Top Bar */}
      <div className="md:hidden flex-shrink-0 border-b border-neutral-800 bg-black/80 backdrop-blur-sm">
        <ChatMobileBar
          onToggleSidebar={() => setSidebarOpen((o) => !o)}
          onNewChat={handleNewChat}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40"
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className="absolute left-0 top-0 w-64 h-full bg-black shadow-lg z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <ChatSidebar
              chats={chats}
              activeChatId={activeChatId}
              onSelectChat={(id) => {
                dispatch(selectChat(id));
                setSidebarOpen(false);
                getMessages(id);
              }}
              onNewChat={handleNewChat}
              open={true}
            />
          </div>
        </div>
      )}

   
      <main className="flex flex-col   flex-1 min-h-0">
   
        <div className="flex-1 overflow-y-auto px-4 py-3">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <span className="px-3 py-1 text-sm rounded-full bg-gray-800 text-gray-200 mb-4">
                Early Preview
              </span>
              <h1 className="text-2xl font-semibold mb-2">ChatGPT Clone</h1>
              <p className="text-gray-400">Type anything to begin chatting.</p>
            </div>
          ) : (
            <ChatMessages messages={messages} isSending={isSending} />
          )}
        </div>

      
        <div className="border-t border-neutral-800 bg-black/95 backdrop-blur-sm p-3">
          <ChatComposer
            input={input}
            setInput={(v) => dispatch(setInput(v))}
            onSend={sendMessage}
            isSending={isSending || !activeChatId}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
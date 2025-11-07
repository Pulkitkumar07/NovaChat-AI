import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Home = () => {
  const { register, handleSubmit, reset } = useForm();
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState(["New Chat"]);
  const [typing, setTyping] = useState(false);

  const onSubmit = (data) => {
    const userMsg = { text: data.message, sender: "user" };
    setMessages([...messages, userMsg]);
    reset();

    setTyping(true);

  
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "🤖 Ye AI ka demo reply hai!", sender: "bot" },
      ]);
      setTyping(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">

      {/* ✅ Sidebar */}
      <aside className="w-64 bg-gray-800 border-r border-gray-700 p-4 flex flex-col gap-3">
        <h2 className="text-lg font-semibold mb-3">Chats</h2>

        {chats.map((chat, i) => (
          <div
            key={i}
            className="p-2 bg-gray-700 rounded cursor-pointer hover:bg-gray-600"
          >
            {chat}
          </div>
        ))}

        <button
          onClick={() => setChats([...chats, `Chat ${chats.length + 1}`])}
          className="mt-auto bg-indigo-600 hover:bg-indigo-700 py-2 rounded"
        >
          + New Chat
        </button>
      </aside>

      {/* ✅ Chat Area */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <header className="p-4 border-b border-gray-700 text-center text-xl font-semibold">
          ChatGPT Clone 💬
        </header>

        {/* Messages Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <p
                className={`px-4 py-2 rounded-lg max-w-xs ${
                  msg.sender === "user" ? "bg-indigo-600" : "bg-gray-700"
                }`}
              >
                {msg.text}
              </p>
            </div>
          ))}

          {/* 🟡 Typing Loader */}
          {typing && (
            <div className="flex justify-start">
              <p className="bg-gray-700 px-4 py-2 rounded-lg animate-pulse">
                AI is thinking...
              </p>
            </div>
          )}

          {messages.length === 0 && !typing && (
            <div className="text-center text-gray-400 mt-20">
              Start typing to chat 👇
            </div>
          )}
        </div>

        {/* Input Box with useForm */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 border-t border-gray-700 flex gap-3">
          <input
            type="text"
            {...register("message", { required: true })}
            placeholder="Type a message..."
            className="flex-1 p-2 rounded bg-gray-800 text-white outline-none"
          />
          <button
            type="submit"
            className="px-4 bg-indigo-600 hover:bg-indigo-700 rounded font-medium"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;


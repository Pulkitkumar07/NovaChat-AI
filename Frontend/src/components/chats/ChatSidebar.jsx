import { Plus, X } from "lucide-react";
import { useState } from "react";

const ChatSidebar = ({ chats, activeChatId, onSelectChat, onNewChat, onDeleteChat, open }) => {
  const [search, setSearch] = useState("");

  const filteredChats = chats.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside
      className={`fixed top-0 bottom-0 left-0 z-40 w-[250px] flex-shrink-0 border-r border-gray-900 bg-black/95 backdrop-blur-md transform transition-transform duration-200 pt-14 md:static md:pt-0 md:translate-x-0 ${
        open ? "translate-x-0" : "-translate-x-[270px]"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 gap-2">
        <h2 className="text-sm font-medium text-white">Chats</h2>
        <button
          onClick={onNewChat}
          className="inline-flex items-center gap-1 rounded-md border border-gray-700 bg-gray-900 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wide hover:bg-gray-800 transition"
        >
          <Plus className="h-3 w-3 text-white" /> New
        </button>
      </div>

      {/* Search Bar */}
      <div className="px-3 py-2 border-b border-gray-800">
        <input
          type="text"
          placeholder="Search chats..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 rounded-md bg-gray-900 border border-gray-800 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-gray-500"
        />
      </div>

      {/* Chat List */}
      <nav className="flex flex-col gap-1 p-3 overflow-y-auto h-full" aria-live="polite">
        {filteredChats.map((c) => (
          <div
            key={c._id}
            className={`flex justify-between items-center text-left rounded-xl border px-4 py-3 bg-gray-900 border-gray-800 hover:bg-gray-800 transition text-white ${
              c._id === activeChatId ? "border-white shadow-[0_0_0_1px_white]" : ""
            }`}
          >
            <button
              onClick={() => onSelectChat(c._id)}
              className="flex-1 text-left text-sm font-medium leading-tight"
            >
              {c.title}
            </button>
           
          </div>
        ))}

        {filteredChats.length === 0 && (
          <p className="text-sm text-white/70 p-4">No chats found.</p>
        )}
      </nav>
    </aside>
  );
};

export default ChatSidebar;

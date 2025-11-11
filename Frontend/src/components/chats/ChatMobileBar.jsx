import React from "react";

const ChatMobileBar = ({ onToggleSidebar, onNewChat }) => (
  <header className="fixed top-0 left-0 right-0 h-14 flex items-center gap-3 px-4 border-b border-neutral-800 bg-black/80 backdrop-blur-md z-30 md:hidden">
    <button
      onClick={onToggleSidebar}
      aria-label="Toggle chat history"
      className="bg-neutral-900 border border-neutral-800 px-3 py-2 rounded-lg text-neutral-300 hover:bg-neutral-800 hover:text-white transition"
    >
      ☰
    </button>

    <h1 className="flex-1 text-center text-base font-medium text-neutral-200 select-none pointer-events-none">
      Chat
    </h1>

    <button
      onClick={onNewChat}
      aria-label="New chat"
      className="bg-neutral-900 border border-neutral-800 px-3 py-2 rounded-lg text-neutral-300 hover:bg-neutral-800 hover:text-white transition"
    >
      ＋
    </button>
  </header>
);

export default ChatMobileBar;
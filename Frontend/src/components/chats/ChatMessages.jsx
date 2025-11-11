import React, { useEffect, useRef } from "react";

const ChatMessages = ({ messages, isSending }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isSending]);

  return (
    <div className="flex flex-col flex-1 w-full overflow-hidden gap-4 max-w-[820px] mx-auto pr-2" aria-live="polite">
      {messages.map((m, index) => (
        <div key={index} className={`flex flex-col max-w-[780px] ${m.type === "user" ? "self-end" : "self-start"}`}>
          <div className="text-[0.65rem] uppercase tracking-wider text-gray-400 mb-1 font-semibold">
            {m.type === "user" ? "You" : "AI"}
          </div>

          <div
            className={`whitespace-pre-wrap break-words text-sm border rounded-xl px-4 py-3 leading-relaxed transition-all
            ${m.type === "user" ? "bg-[#1f1f1f] border-[#2a2a2a] text-gray-100" : "bg-[#0d0d0d] border-[#1e1e1e] text-gray-200"}`}
          >
            {m.content}
          </div>

          <div className="flex items-center gap-2 opacity-0 pointer-events-none mt-2 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(m.content)}
              className="w-7 h-7 rounded-md border border-[#1e1e1e] bg-[#0d0d0d] flex items-center justify-center text-gray-500 hover:bg-[#151515] hover:text-white"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
            </button>

            {m.type === "ai" && (
              <>
                <button className="w-7 h-7 rounded-md border border-[#1e1e1e] bg-[#0d0d0d] flex items-center justify-center text-gray-500 hover:bg-[#151515] hover:text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4"><path d="M7 10v11" /><path d="M15 21H9a2 2 0 0 1-2-2v-9l5-7 1 1a2 2 0 0 1 .5 1.3V9h5a2 2 0 0 1 2 2l-2 8a2 2 0 0 1-2 2Z" /></svg>
                </button>

                <button className="w-7 h-7 rounded-md border border-[#1e1e1e] bg-[#0d0d0d] flex items-center justify-center text-gray-500 hover:bg-[#151515] hover:text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4"><path d="M17 14V3" /><path d="M9 3h6a2 2 0 0 1 2 2v9l-5 7-1-1a2 2 0 0 1-.5-1.3V15H5a2 2 0 0 1-2-2l2-8a2 2 0 0 1 2-2Z" /></svg>
                </button>

                <button
                  type="button"
                  onClick={() => { try { const u = new SpeechSynthesisUtterance(m.content); speechSynthesis.speak(u);} catch {} }}
                  className="w-7 h-7 rounded-md border border-[#1e1e1e] bg-[#0d0d0d] flex items-center justify-center text-gray-500 hover:bg-[#151515] hover:text-white"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4"><path d="M5 8v8" /><path d="M8 4v16" /><path d="M12 2v20" /><path d="M19 5c1.5 2 1.5 12 0 14" /><path d="M16 8c.8 1 1 7 0 8" /></svg>
                </button>

                <button className="w-7 h-7 rounded-md border border-[#1e1e1e] bg-[#0d0d0d] flex items-center justify-center text-gray-500 hover:bg-[#151515] hover:text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4"><path d="M2 12A10 10 0 0 1 12 2c2.5 0 4.8 1 6.5 2.5L22 8" /><path d="M22 2v6h-6" /><path d="M22 12a10 10 0 0 1-10 10c-2.5 0-4.8-1-6.5-2.5L2 16" /><path d="M2 22v-6h6" /></svg>
                </button>
              </>
            )}
          </div>
        </div>
      ))}

      {isSending && (
        <div className="flex flex-col max-w-[780px] self-start animate-pulse">
          <div className="text-[0.65rem] uppercase tracking-wider text-gray-500 mb-1 font-semibold">AI</div>
          <div className="flex gap-1 px-4 py-3 bg-[#0d0d0d] border border-[#1e1e1e] rounded-xl text-gray-300">
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"></span>
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce delay-200"></span>
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce delay-400"></span>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessages;
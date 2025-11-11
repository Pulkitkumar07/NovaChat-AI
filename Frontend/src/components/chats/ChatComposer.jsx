import React, { useCallback, useRef, useLayoutEffect } from 'react';

const ChatComposer = ({ input, setInput, onSend, isSending }) => {
  const textareaRef = useRef(null);

  
  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 320) + 'px';
  }, [input]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) onSend();
    }
  }, [onSend, input]);

  return (
    <form
      onSubmit={e => { e.preventDefault(); if (input.trim()) onSend(); }}
      className="sticky bottom-0 w-full flex justify-center pt-4 pb-6 bg-black/90 backdrop-blur-md z-10"
    >
      <div className="flex items-end gap-3 max-w-3xl w-full mx-4 bg-black border border-gray-800 rounded-3xl px-5 py-3 shadow-md focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-500 transition">
        
       
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            className="w-full resize-none bg-transparent text-white placeholder-gray-400 outline-none text-sm leading-6 max-h-64 pr-1 pb-4"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            spellCheck
            autoComplete="off"
          />

          <div className="absolute left-1 bottom-0 text-xs text-gray-500 select-none pointer-events-none hidden sm:block">
            Enter ↵ to send • Shift+Enter = newline
          </div>
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!input.trim() || isSending}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 active:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={isSending ? "Sending…" : "Send message"}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </button>

      </div>
    </form>
  );
};

export default ChatComposer;

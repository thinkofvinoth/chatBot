import React, { useState, useRef } from 'react';
import { Send, Smile, Paperclip, Mic } from 'lucide-react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

export const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiButtonRef = useRef(null);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMessage((prev) => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  return (
    <div className="relative border-t border-gray-100/80 dark:border-gray-800/50">
      {/* Background layers for both themes */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-50/90 to-gray-100/90 dark:from-dark-surface dark:to-dark-surface/90" />
      <div className="absolute inset-0 bg-dot-pattern bg-[length:24px_24px] opacity-[0.03] dark:opacity-[0.03]" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-dark-accent/5 via-dark-accent2/3 to-dark-accent/5 animate-shimmer" />
      </div>
      <div className="absolute inset-0 bg-noise-pattern opacity-[0.015] mix-blend-overlay" />

      {/* Content */}
      <div className="relative px-4 py-4 sm:px-6 backdrop-blur-sm">
        <div className="relative flex items-center gap-2">
          <div className="relative">
            <button
              ref={emojiButtonRef}
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="rounded-full p-2 text-gray-500 hover:bg-white/50 hover:text-dark-accent 
                dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-gray-300 
                transition-colors shadow-sm hover:shadow-md"
            >
              <Smile className="h-5 w-5" />
            </button>
            {showEmojiPicker && (
              <div className="absolute bottom-12 left-0 z-50">
                <Picker
                  data={data}
                  onEmojiSelect={handleEmojiSelect}
                  theme="light"
                  previewPosition="none"
                  skinTonePosition="none"
                />
              </div>
            )}
          </div>
          <button className="rounded-full p-2 text-gray-500 hover:bg-white/50 hover:text-dark-accent 
            dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-gray-300 
            transition-colors shadow-sm hover:shadow-md">
            <Paperclip className="h-5 w-5" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 rounded-xl border border-gray-200/80 bg-white/60 px-4 py-3 
              text-gray-700 placeholder-gray-400 shadow-sm transition-all duration-200 
              focus:border-dark-accent focus:outline-none focus:ring-1 focus:ring-dark-accent focus:bg-white/90
              dark:border-gray-700/50 dark:bg-gray-800/50 dark:text-gray-200 dark:placeholder-gray-500
              dark:focus:border-dark-accent dark:focus:bg-gray-800/80
              backdrop-blur-sm"
          />
          <button className="rounded-full p-2 text-gray-500 hover:bg-white/50 hover:text-dark-accent 
            dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-gray-300 
            transition-colors shadow-sm hover:shadow-md">
            <Mic className="h-5 w-5" />
          </button>
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="flex h-11 w-11 items-center justify-center rounded-full 
              bg-gradient-to-r from-dark-accent to-dark-accent2 text-white 
              shadow-sm transition-all duration-200 
              hover:opacity-90 hover:shadow-md hover:scale-105
              disabled:opacity-50 disabled:hover:shadow-none disabled:hover:scale-100
              disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, ThumbsUp, ThumbsDown, Share2, User, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../utils/cn';

const Avatar = ({ sender, size = 'default' }) => {
  const sizeClasses = {
    default: 'h-10 w-10',
    small: 'h-8 w-8',
  };

  if (sender.id === 'bot') {
    return (
      <div className={cn(
        "flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500",
        sizeClasses[size]
      )}>
        <Bot className="h-6 w-6 text-white" />
      </div>
    );
  }

  if (sender.avatar) {
    return (
      <img
        src={sender.avatar}
        alt={sender.name}
        className={cn(
          "rounded-full object-cover",
          sizeClasses[size]
        )}
      />
    );
  }

  const initials = sender.name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={cn(
      "flex items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-white font-medium",
      sizeClasses[size]
    )}>
      {initials || <User className="h-6 w-6" />}
    </div>
  );
};

export const ChatMessage = ({ message, isBot }) => {
  const [reaction, setReaction] = useState(null);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleReaction = (type) => {
    setReaction(type);
  };

  const handleShare = async (method) => {
    switch (method) {
      case 'copy':
        await navigator.clipboard.writeText(message.content);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message.content)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${encodeURIComponent(message.content)}`);
        break;
    }
    setShowShareMenu(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'group flex gap-4',
        isBot ? 'justify-start' : 'flex-row-reverse'
      )}
    >
      <Avatar sender={message.sender} />

      <div className="flex flex-col gap-2 max-w-[80%]">
        <div
          className={cn(
            'rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed',
            isBot
              ? 'rounded-bl-sm bg-white/10 dark:bg-gray-800/50 backdrop-blur-md border border-white/10 dark:border-white/5 text-gray-700 dark:text-gray-200'
              : 'rounded-br-sm bg-gradient-to-br from-indigo-500 to-purple-500 text-white'
          )}
        >
          {message.content}
        </div>

        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500" />
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {format(message.timestamp, 'h:mm a')}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleReaction('up')}
              className={cn(
                'rounded-full p-1.5 transition-colors',
                reaction === 'up' ? 'text-indigo-500 dark:text-indigo-400' : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300'
              )}
            >
              <ThumbsUp className="h-4 w-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleReaction('down')}
              className={cn(
                'rounded-full p-1.5 transition-colors',
                reaction === 'down' ? 'text-red-500 dark:text-red-400' : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300'
              )}
            >
              <ThumbsDown className="h-4 w-4" />
            </motion.button>

            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="rounded-full p-1.5 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
              >
                <Share2 className="h-4 w-4" />
              </motion.button>

              {showShareMenu && (
                <div className="absolute bottom-8 right-0 z-10 w-48 rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 dark:ring-white/5">
                  <div className="p-1">
                    <button
                      onClick={() => handleShare('copy')}
                      className="w-full rounded-md px-2 py-1 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Copy to clipboard
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="w-full rounded-md px-2 py-1 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Share on Twitter
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="w-full rounded-md px-2 py-1 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Share on LinkedIn
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
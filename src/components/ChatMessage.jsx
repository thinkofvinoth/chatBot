import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, ThumbsUp, Clock, User } from 'lucide-react';
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

  // Generate initials from name
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

export const ChatMessage = ({ message, isBot, onReaction, actions = [] }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onReaction?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'group flex items-end gap-2',
        isBot ? 'justify-start' : 'flex-row-reverse'
      )}
    >
      <div className="flex flex-col items-center gap-2">
        <Avatar sender={message.sender} />
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleLike}
          className={cn(
            'rounded-full p-1.5 transition-colors',
            isLiked ? 'text-indigo-500 dark:text-indigo-400' : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300'
          )}
        >
          <ThumbsUp className="h-4 w-4" />
        </motion.button>
      </div>

      <div className="flex flex-col gap-1">
        <div
          className={cn(
            'max-w-[280px] sm:max-w-[440px] rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed shadow-sm',
            isBot
              ? 'rounded-bl-sm bg-white dark:bg-gray-800 ring-1 ring-black/5 dark:ring-white/5 text-gray-700 dark:text-gray-200'
              : 'rounded-br-sm bg-gradient-to-br from-indigo-500 to-purple-500 text-white'
          )}
        >
          {message.content}
        </div>

        <div className="flex items-center gap-2 px-1">
          <Clock className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500" />
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {format(message.timestamp, 'h:mm a')}
          </span>
        </div>

        {actions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {actions.map((action, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={action.onClick}
                className="rounded-lg bg-gray-100 dark:bg-gray-800 px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {action.label}
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};
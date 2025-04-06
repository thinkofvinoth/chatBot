import React from 'react';
import { Bot, Moon, Sun, X } from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';
import { motion } from 'framer-motion';

export const Header = ({
  title = 'AI Assistant',
  subtitle = 'Always here to help',
  onClose,
  theme = {
    primaryColor: 'from-indigo-500 to-purple-500',
    secondaryColor: 'from-pink-500 to-rose-500',
  },
}) => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-10 border-b border-gray-100/80 dark:border-gray-800 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 backdrop-blur-xl px-6 py-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${theme.primaryColor}`}>
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className={`text-xl font-semibold bg-gradient-to-r ${theme.primaryColor} bg-clip-text text-transparent`}>
              {title}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
          >
            <motion.div
              initial={false}
              animate={{ rotate: isDarkMode ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </motion.div>
          </button>
          
          {onClose && (
            <button
              onClick={onClose}
              className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
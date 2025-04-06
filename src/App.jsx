import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { EmbeddedChat } from './components/EmbeddedChat';
import { Header } from './components/Header';
import { ChatContainer } from './components/ChatContainer';
import { useThemeStore } from './store/useThemeStore';

const initialMessages = [
  {
    id: '1',
    content: "Hi! I'm your AI assistant. How can I help you today?",
    sender: {
      id: 'bot',
      name: 'AI Assistant',
      avatar: '',
      status: 'online'
    },
    timestamp: new Date(),
    read: true,
    reactions: [],
    attachments: [],
    edited: false,
  }
];

const userProfile = {
  id: 'user',
  name: 'John Doe',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  status: 'online'
};

function App() {
  const { isDarkMode } = useThemeStore();
  const [mainMessages, setMainMessages] = useState(initialMessages);

  const handleMainChatMessage = async (content) => {
    const newMessage = {
      id: Date.now().toString(),
      content,
      sender: userProfile,
      timestamp: new Date(),
      read: true,
      reactions: [],
      attachments: [],
      edited: false,
    };

    setMainMessages((prev) => [...prev, newMessage]);

    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        content: `I received your message: "${content}". How can I help you further?`,
        sender: {
          id: 'bot',
          name: 'AI Assistant',
          avatar: '',
          status: 'online'
        },
        timestamp: new Date(),
        read: true,
        reactions: [],
        attachments: [],
        edited: false,
      };
      setMainMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const handleEmbeddedChatMessage = async (message) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `I received your message: "${message}". How can I help you further?`;
  };

  return (
    <div className={`relative min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      {/* Background layers */}
      <div className="fixed inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-dark-bg dark:via-dark-secondary dark:to-dark-surface transition-colors duration-500"></div>
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent dark:via-dark-accent/5 animate-shimmer"></div>
        
        {/* Dot pattern overlay */}
        <div className="absolute inset-0 bg-dot-pattern bg-[length:20px_20px] opacity-[0.15] dark:opacity-[0.07]"></div>
        
        {/* Noise texture overlay */}
        <div className="absolute inset-0 bg-noise-pattern opacity-[0.015] mix-blend-overlay"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto max-w-6xl px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-dark-accent via-dark-accent2 to-dark-accent animate-gradient">
             CSW Chat Bot
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-dark-text">
              Experience our chat interface in two different formats
            </p>
          </div>

          <div className="rounded-2xl bg-white/80 dark:bg-dark-surface/90 backdrop-blur-sm ring-1 ring-black/5 dark:ring-dark-border shadow-2xl overflow-hidden">
            <Header
              title="Main Chat Interface"
              subtitle="Full-featured chat experience"
              theme={{
                primaryColor: 'from-dark-accent to-dark-accent2',
                secondaryColor: 'from-dark-accent2 to-dark-accent',
              }}
            />
            <ChatContainer
              messages={mainMessages}
              onSendMessage={handleMainChatMessage}
            />
          </div>
        </div>
      </div>

      <EmbeddedChat
        initialMessages={initialMessages}
        position="bottom-right"
        buttonIcon={<MessageCircle className="h-6 w-6" />}
        title="Quick Assistant"
        subtitle="Here to help you 24/7"
        theme={{
          primaryColor: 'from-dark-accent to-dark-accent2',
          secondaryColor: 'from-dark-accent2 to-dark-accent',
          buttonColor: 'from-dark-accent to-dark-accent2'
        }}
        onSendMessage={handleEmbeddedChatMessage}
      />
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';

export const ChatContainer = ({ messages, onSendMessage }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message) => {
    setIsLoading(true);
    await onSendMessage(message);
    setIsLoading(false);
  };

  return (
    <div className="flex h-[calc(100vh-12rem)] max-h-[600px] flex-col sm:h-[600px] w-full">
      <div className="chat-container flex-1 overflow-hidden bg-transparent px-4 sm:px-6">
        <Virtuoso
          style={{ height: '100%' }}
          data={[...messages, ...(isLoading ? [{ id: 'loading', isLoading: true }] : [])]}
          itemContent={(_, item) => (
            <div className="py-4">
              <ChatMessage
                message={item}
                isBot={item.sender?.id === 'bot'}
                isLoading={item.isLoading}
              />
            </div>
          )}
          followOutput="smooth"
          alignToBottom
        />
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};
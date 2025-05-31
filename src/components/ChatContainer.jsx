import React from 'react';
import { Virtuoso } from 'react-virtuoso';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';

export const ChatContainer = ({ messages, onSendMessage }) => {
  return (
    <div className="flex h-[calc(100vh-12rem)] max-h-[600px] flex-col sm:h-[600px] w-full">
      <div className="chat-container flex-1 overflow-hidden bg-transparent px-4 sm:px-6">
        <Virtuoso
          style={{ height: '100%' }}
          data={messages}
          itemContent={(_, message) => (
            <div className="py-4">
              <ChatMessage
                message={message}
                isBot={message.sender.id === 'bot'}
              />
            </div>
          )}
          followOutput="smooth"
          alignToBottom
        />
      </div>
      <ChatInput onSendMessage={onSendMessage} />
    </div>
  );
};
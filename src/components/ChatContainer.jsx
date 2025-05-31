import React from 'react';
import { Virtuoso } from 'react-virtuoso';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';

export const ChatContainer = ({ messages, onSendMessage }) => {
  return (
    <div className="chat-container">
      <div className="chat-messages">
        <Virtuoso
          style={{ height: '100%' }}
          data={messages}
          itemContent={(_, message) => (
            <div className="message-wrapper">
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
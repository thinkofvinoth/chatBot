import React from 'react';
import { Virtuoso } from 'react-virtuoso';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { QuickActions } from './QuickActions';

export const ChatContainer = ({ messages, onSendMessage }) => {
  const handleQuickAction = (content) => {
    onSendMessage(content);
  };

  return (
    <div className="flex h-[calc(100vh-12rem)] max-h-[600px] flex-col sm:h-[600px]">
      <div className="chat-container flex-1 overflow-hidden bg-transparent px-4 sm:px-6">
        <Virtuoso
          style={{ height: '100%' }}
          data={messages}
          itemContent={(_, message) => (
            <div className="py-4">
              <ChatMessage
                message={message}
                isBot={message.sender.id === 'bot'}
                actions={message.sender.id === 'bot' ? [
                  {
                    label: '👍 Thanks!',
                    onClick: () => handleQuickAction("Thanks for the help!"),
                  },
                  {
                    label: '❓ Tell me more',
                    onClick: () => handleQuickAction("Can you tell me more about this?"),
                  }
                ] : undefined}
              />
            </div>
          )}
          followOutput="smooth"
          alignToBottom
        />
      </div>

      <QuickActions onAction={handleQuickAction} messages={messages} />
      <ChatInput onSendMessage={onSendMessage} />
    </div>
  );
};
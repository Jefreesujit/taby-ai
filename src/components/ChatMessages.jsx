/* -----------------Globals--------------- */
import React, { useState, useEffect, createRef } from 'react';
import browser from 'webextension-polyfill';

/* -----------------Child components--------------- */
import MessageItem from './MessageItem';

/* -----------------Helpers & Hooks--------------- */
// import { useSettings } from '../hooks/useSettings';
import { useStore } from '../store';

/* -----------------Styles--------------- */
import 'tailwindcss/tailwind.css';

/* -----------------Component--------------- */

const SkeletonMessage = () => (
  <div role="status" className="space-y-2.5 animate-pulse max-w-lg">
    <div className="flex items-center w-full max-w-[200px]">
      <div className="h-2.5 ms-2 mr-2 bg-gray-400 rounded-sm dark:bg-gray-600 w-40"></div>
    </div>
    <div className="flex items-center w-full max-w-[200px]">
      <div className="h-2.5 ms-2 mr-2 bg-gray-400 rounded-sm dark:bg-gray-600 w-20"></div>
    </div>
  </div>
);

const ChatMessages = () => {
  const { messages, loading, streamMessage } = useStore();
  const [ streamContent, setStreamContent ] = useState('');

  // const [settings, setSettings] = useState(null);

  // useEffect(() => {
  //   const fetchSettings = async () => {
  //     const fetchedSettings = await useSettings();
  //     setSettings(fetchedSettings);
  //   };

  //   fetchSettings();
  // }, []);

  const isPlaceholder = messages.length === 0;

  const endRef = createRef();

  useEffect(() => {
    endRef.current.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    if (loading && streamMessage) {
      // TODO: Temporary fix until They fix the streaming
      // setStreamContent((prev) => prev + streamMessage);
      setStreamContent(streamMessage);
    } else {
      setStreamContent('');
    }
  }, [loading, streamMessage]);

  return (
    <div className={`messages p-1 flex flex-col mt-2 flex-grow overflow-y-auto ${isPlaceholder ? 'justify-center' : ''}`}>
      {
        messages.length > 0 ? (
          <>
            {messages.map((message, index) => (
              <MessageItem key={index} message={message} />
            ))}
            {loading && <MessageItem message={{ role: 'ai', content: streamContent || <SkeletonMessage /> }} />}
          </>
        ) : (<>
            <p className="text-gray-500 text-center">No messages.</p>
            <p className="text-gray-500 text-center"> Start a new conversation!</p>
          </>
        )
      }
      <div ref={endRef} />
    </div>
  );
};

export default ChatMessages;

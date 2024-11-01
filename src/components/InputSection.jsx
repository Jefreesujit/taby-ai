
/* -----------------Globals--------------- */
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Send } from 'lucide-react';

/* -----------------Styles--------------- */
import 'tailwindcss/tailwind.css';

/* -----------------Helpers & Hooks--------------- */
import { useSettings } from '../hooks/useSettings';
import { useStore } from '../store';

/* -----------------Services--------------- */
import { sendMessage } from '../services';

const InputSection = () => {
  const { updateMessageContext, setMessageLoading, setStreamMessage } = useStore();
  const [message, setMessage] = useState('');
  // const [settings, setSettings] = useState(null);

  // useEffect(() => {
  //   const fetchSettings = async () => {
  //     const fetchedSettings = await useSettings();
  //     setSettings(fetchedSettings);
  //   };

  //   fetchSettings();
  // }, []);

  const settings = useSettings();
  const { theme } = settings;

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleStreamMessage = (chunk) => {
    setStreamMessage(chunk);
  };

  const handleSendClick = async () => {
    if (message.trim() !== '') {
      // console.log('Sending message:', message);
      updateMessageContext({ role: 'user', content: message });
      setMessageLoading(true);
      setMessage('');
      try {
        const response = await sendMessage(message, handleStreamMessage);
        updateMessageContext({ role: 'ai', content: response });
        setMessageLoading(false);
      } catch (error) {
        console.error(error);
        setMessageLoading(false);
        toast.error("Something went wrong. Please check your API key and try again.");
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendClick();
    }
  };

  const isDark = settings && settings.theme === 'dark';

  return (
    <div className="pt-2 flex justify-between items-center">
      <Toaster position="top-center" toastOptions={{ duration: 3000, className:'toast-message' }} />
      <textarea
        className={`border border-gray-300 rounded-lg p-2 flex-grow max-h-20 resize-none overflow-y-auto ${isDark ? 'bg-slate-500 text-white' : 'bg-white text-black'}`}
        placeholder="Type your message here..."
        value={message}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        autoFocus
      />
      <button
        className={`${isDark ? 'bg-blue-900' : 'bg-blue-500'} text-white rounded p-2 ml-2 h-auto`}
        onClick={handleSendClick}
        disabled={!settings || !settings.isApiKeySet}
      >
        <Send />
      </button>
    </div>
  );
};

export default InputSection;

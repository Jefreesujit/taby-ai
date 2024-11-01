/* -----------------Globals ----------------- */

import React, { useEffect, useState } from 'react';

/* -----------------Child components--------------- */
import Header from './components/Header';
import ChatMessages from './components/ChatMessages';
import InputSection from './components/InputSection';
import { useStore } from './store';
import { initChatHistory } from './utils';
import { useSettings } from './hooks/useSettings';
import './styles/main.css';

const App = () => {

  const { messages, updateMessageHistory } = useStore();

  // const [theme, setTheme] = useState('light');

  const settings = useSettings();
  const { theme } = settings;

  // useEffect(() => {
  //   const fetchSettings = async () => {
  //     const fetchedSettings = await useSettings();
  //     setTheme(fetchedSettings.theme);
  //   };

  //   fetchSettings();
  // }, []);

  useEffect(async () => {
    const chatHistory = await initChatHistory();
    // console.log('Init chatHistory', chatHistory);
    const messageContext = chatHistory ? chatHistory.map((item) => ({
      role: item.role, content: item.message,
    })).slice(2) : [];
    if (messages.length === 0 && messageContext.length > 0) {
      updateMessageHistory(messageContext);
    }
  }, []);

  return (
    <div className={`qwikassist h-screen flex flex-col justify-between p-4 box-border text-sm font-sans ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-50'}`}>
      <Header />
      <ChatMessages />
      <InputSection />
    </div>
  );
}

export default App;

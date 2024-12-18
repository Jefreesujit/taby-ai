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

  const settings = useSettings();
  const { theme, activeTabId } = settings;

  useEffect(async () => {
    const chatHistory = await initChatHistory(activeTabId);
    // console.log('Init chatHistory', chatHistory);
    const messageContext = chatHistory ? chatHistory.map((item) => ({
      role: item.role, content: item.message,
    })).slice(2) : [];
    updateMessageHistory(messageContext);
  }, [activeTabId]);

  return (
    <div className={`qwikassist h-screen flex flex-col justify-between p-4 box-border text-sm font-sans ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
      <Header />
      <ChatMessages />
      <InputSection />
    </div>
  );
}

export default App;

// src/components/Header.js

/* -----------------Globals--------------- */
import React, { useState, useEffect } from 'react';
import browser from 'webextension-polyfill';
import { useSettings } from '../hooks/useSettings';


/* -----------------UI--------------- */
import 'tailwindcss/tailwind.css';
import { Settings, RefreshCcw } from 'lucide-react';

/* -----------------Utils--------------- */
import { resetChatHistory } from '../utils';
import { useStore } from '../store';

const Header = () => {
  const { updateMessageHistory } = useStore();

  const handleRefresh = () => {
    resetChatHistory();
    updateMessageHistory([]);
  }

  const settings = useSettings();

  const isDark = settings && settings.theme === 'dark';

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <img className={`w-11 h-11 bg-white rounded-lg mr-2 ${isDark ? 'text-white' : ''}`} src="assets/icon.png" alt="Taby AI Icon" />
        <div className="flex flex-col">
          <div className={`font-bold text-lg ${isDark ? 'text-white' : 'text-black'}`}>Taby AI</div>
          <div className={`text-xs ${isDark ? 'text-white' : 'text-black'}`}>Chat with this page!</div>
        </div>
      </div>
      <div className={`flex items-center ${isDark ? 'text-white' : 'text-black'}`}>
        <button className="mr-4"
          onClick={handleRefresh}>
          <RefreshCcw />
        </button>
        <button className="mr-2"
          onClick={() => window.open(chrome.runtime.getURL('options.html'))}>
          <Settings />
        </button>
      </div>
    </div>
  );
};

export default Header;

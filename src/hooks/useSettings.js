// useSettings.js

import { useState, useEffect } from 'react';
import { fetchSyncStorage, fetchLocalStorage } from '../utils';

export const useSettings = () => {
  const [settings, setSettings] = useState({
    theme: 'light',
    temperature: 0.3,
    topK: 10,
    activeTabId: '',
  });

  useEffect(() => {
    // Async function to load initial settings
    const loadSettings = async () => {
      const data = await fetchSyncStorage();
      const localData = await fetchLocalStorage();
      if (data) {
        setSettings(prevSettings => ({
          ...prevSettings,
          theme: data.theme || prevSettings.theme,
          temperature: Number(data.temperature) || prevSettings.temperature,
          topK: Number(data.topK) || prevSettings.topK,
          activeTabId: localData.activeTabId || prevSettings.activeTabId,
        }));
      }
    };

    // Initial load of settings
    loadSettings();

    // Listener for storage changes
    const handleStorageChange = (changes, area) => {
      if (area === 'sync') {
        setSettings(prevSettings => ({
          ...prevSettings,
          theme: changes.theme ? changes.theme.newValue : prevSettings.theme,
          temperature: changes.temperature ? Number(changes.temperature.newValue) : prevSettings.temperature,
          topK: changes.topK ? Number(changes.topK.newValue) : prevSettings.topK,
        }));
      } else if (area === 'local') {
        setSettings(prevSettings => ({
          ...prevSettings,
          activeTabId: changes.activeTabId ? changes.activeTabId.newValue : prevSettings.activeTabId,
        }));
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);

    // Cleanup the listener on component unmount
    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  return settings;
};

import React, { useState, useEffect } from 'react';
import { saveToStorage, fetchStorageByKeys } from '../utils';

const Settings = () => {
  const [theme, setTheme] = useState('light');
  const [temperature, setTemperature] = useState(1);
  const [topK, setTopK] = useState(3);

  useEffect(() => {
    const restoreOptions = async () => {
      const data = await fetchStorageByKeys(['theme', 'temperature', 'topK']);
      if (data) {
        setTheme(data.theme || 'light');
        setTemperature(data.temperature || 1);
        setTopK(data.topK || 3);
      }
    };

    restoreOptions();
  }, []);

  const handleTemperatureChange = (e) => {
    const value = parseFloat(e.target.value);
    if (value >= 0 && value <= 1) {
      setTemperature(value);
    } else {
      alert('Please enter a valid temperature value between 0 and 1.');
    }
  };

  const handleTopKChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1 && value <= 8) {
      setTopK(value);
    } else {
      alert('Please enter a valid top K value between 1 and 8.');
    }
  };

  const handleSave = async () => {
    await saveToStorage({
      theme: theme,
      temperature: temperature,
      topK: topK
    });
    alert('Options saved successfully!');
  };

  return (
    <div className="mb-10 p-4 bg-white rounded-lg shadow w-1/2 mx-auto max-w-[800px]">
      <h2 className="text-xl font-semibold">Settings</h2>
      <hr className="my-4" />
      <div className="flex items-center mb-5">
        <label htmlFor="temperature" className="text-base mr-2 w-1/3">Temperature:</label>
        <input
          type="number"
          id="temperature"
          className="text-sm w-full p-2 my-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={temperature}
          onChange={handleTemperatureChange}
          min="0"
          max="1"
          step="0.1"
        />
      </div>
      <div className="flex items-center mb-5">
        <label htmlFor="topK" className="text-base mr-2 w-1/3">Top K:</label>
        <input
          type="number"
          id="topK"
          className="text-sm w-full p-2 my-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={topK}
          onChange={handleTopKChange}
          min="1"
          max="8"
        />
      </div>
      <div className="flex items-center mb-5">
        <label htmlFor="theme" className="text-base mr-2 w-1/3">Chat Theme:</label>
        <select id="theme" className="text-sm w-full p-2 my-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200" value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div className="flex justify-center">
        <button id="save" className="text-sm p-2 my-2 rounded bg-blue-500 text-white cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default Settings;

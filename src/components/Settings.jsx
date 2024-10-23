import React, { useState, useEffect } from 'react';
import { saveToStorage, fetchStorageByKeys } from '../utils';

const Settings = () => {
  const [theme, setTheme] = useState('light');
  const [temperature, setTemperature] = useState(0);
  const [topK, setTopK] = useState(10);

  useEffect(() => {
    const restoreOptions = async () => {
      const data = await fetchStorageByKeys(['theme', 'temperature', 'topK']);
      if (data) {
        setTheme(data.theme || 'light');
        setTemperature(data.temperature || 0);
        setTopK(data.topK || 10);
      }
    };

    restoreOptions();
  }, []);

  const handleSave = async () => {
    await saveToStorage({
      theme: theme,
      temperature: temperature,
      topK: topK
    });
  };

  return (
    <div className="settings">
      <h1>Settings</h1>
      <form onSubmit={(e) => e.preventDefault()}>

        <label>Theme:</label>
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>

        <label>Temperature:</label>
        <input
          type="number"
          value={temperature}
          onChange={(e) => setTemperature(parseFloat(e.target.value))}
        />
        <p>Default: 0</p>

        <label>TopK:</label>
        <input
          type="number"
          value={topK}
          onChange={(e) => setTopK(parseInt(e.target.value))}
        />
        <p>Default: 10</p>

        <button type="submit" onClick={handleSave}>
          Save
        </button>
      </form>
    </div>
  );
};

export default Settings;

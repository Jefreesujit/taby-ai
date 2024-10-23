/* -----------------Helpers & Hooks--------------- */
import { fetchSyncStorage } from '../utils';

export const useSettings = async () => {
  const data = await fetchSyncStorage();

  const defaultSettings = {
    theme: 'light',
    temperature: 0.3,
    topK: 10,
  }

  if (!data) {
    return defaultSettings;
  }

  return {
    ...defaultSettings,
    theme: data.theme || defaultSettings.theme,
    temperature: Number(data.temperature) || defaultSettings.temperature,
    topK: Number(data.topK) || defaultSettings.topK,
  };
};

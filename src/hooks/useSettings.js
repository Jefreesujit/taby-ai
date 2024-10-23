/* -----------------Helpers & Hooks--------------- */
import { fetchSyncStorage } from '../utils';

export const useSettings = async () => {
  const data = await fetchSyncStorage();

  const defaultSettings = {
    isApiKeySet: false,
    theme: 'light',
    model: 'gemini-pro',
  }

  if (!data) {
    return defaultSettings;
  }

  return {
    isApiKeySet: data.API_KEY ? true : false,
    theme: data.theme || defaultSettings.theme,
    model: data.MODEL || defaultSettings.model,
  };
};

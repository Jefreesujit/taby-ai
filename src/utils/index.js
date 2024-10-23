import browser from 'webextension-polyfill';

console.log('Inside utils', browser);

export const getPrompt = (context, question) => `
  You are TabyAI a brand new, helpful AI Chat Assistant.
  TabyAI is designed to enable interactions with the currently active webpage the user is in.
  TabyAI is always friendly, kind, and inspiring, and able to make interesting conversations with the user.
  TabyAI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
  START CONTEXT BLOCK
  ${context}
  END OF CONTEXT BLOCK
  TabyAI will take into account any CONTEXT BLOCK that is provided above, to answer the questions in the conversation
  If the CONTEXT BLOCK does not provide the answer to question asked, TabyAI will say, "I'm sorry, but I don't know the answer to that question".
  TabyAI is not a language model and has no associations to google, gemini, openai or any other language model.
`;

export const fetchSyncStorage = async () => {
  const data = await chrome.storage.sync.get();
  return data;
};

export const fetchStorageByKeys = async (keys) => {
  return await chrome.storage.local.get(keys);
};

export const saveToStorage = async (data) => {
  await chrome.storage.local.set(data);
  await chrome.storage.sync.set(data);
};

export const fetchLocalStorage = async () => {
  const data = await chrome.storage.local.get();
  return data;
};

export const fetchPageContext = async () => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const response = await chrome.tabs.sendMessage(tabs[0].id, { action: "fetchContext" });
  // const response = await chrome.storage.session.get('pageContent');
  console.log('Response', response);
  return response.text;
}

export const fetchChatHistory = async () => {
  const { activeTabId } = await chrome.storage.local.get(['activeTabId']);
  // console.log('Active tab id fetched from fetchChatHistory', activeTabId);
  if (activeTabId) {
    const result = await chrome.storage.local.get(activeTabId);
    console.log('Chat history fetched from fetchChatHistory', result);
    return result[activeTabId] ? JSON.parse(result[activeTabId]) : [];
  }
  return [];
};

export const updateChatHistory = async (userMessage, modelResponse) => {
  const chatHistory = await fetchChatHistory();
  chatHistory.push({ role: 'user', message: userMessage });
  chatHistory.push({ role: 'model', message: modelResponse });
  const { activeTabId } = await chrome.storage.local.get(['activeTabId']);
  await chrome.storage.local.set({ [activeTabId]: JSON.stringify(chatHistory) });
  return chatHistory;
};

export const initChatHistory = async () => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const activeTabId = `taby-${tabs[0].id}`;
  await chrome.storage.local.set({ activeTabId });
  let chatHistory = await fetchChatHistory();
  // console.log('Chat history fetched from initChatHistory', chatHistory);
  if (!chatHistory || chatHistory.length === 0) {
    // const response = await chrome.tabs.sendMessage(tabs[0].id, { action: "fetchContext" });
    // console.log('Inside fetchContext', response.text);
    // const prompt = getPrompt(response.text);
    const prompt = 'You are an helpful assistant.';
    chatHistory = await updateChatHistory(prompt, '');
  }
  return chatHistory;
};

export const resetChatHistory = async () => {
  const { activeTabId } = await chrome.storage.local.get(['activeTabId']);
  // console.log('Active tab id fetched from fetchChatHistory', activeTabId);
  await chrome.storage.local.remove([activeTabId]);
  await initChatHistory();
};

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

const clearChatHistory = async (tabId) => {
  const tabIdString = `taby-${tabId}`;
  await chrome.storage.local.remove([tabIdString]);
}

async function getPageContent(tabId) {
  const tab = await chrome.tabs.get(tabId);
  console.log('background Tab', tab);
  if (tab.url && !tab.url.startsWith('http')) {
    return;
  }
  const injection = await chrome.scripting.executeScript({
    target: { tabId },
    files: ['scripts/content.js']
  });
  chrome.storage.session.set({ pageContent: injection[0].result });
}

chrome.tabs.onRemoved.addListener((tabId) => {
  clearChatHistory(tabId);
});

// chrome.tabs.onActivated.addListener((activeInfo) => {
//   getPageContent(activeInfo.tabId);
// });
// chrome.tabs.onUpdated.addListener(async (tabId) => {
//   getPageContent(tabId);
// });

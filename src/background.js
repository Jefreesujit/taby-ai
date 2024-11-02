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
  if (!tab.url && !tab.url.startsWith('http')) {
    return;
  }
  const injection = await chrome.scripting.executeScript({
    target: { tabId },
    files: ['./content.js']
  });
  chrome.storage.session.set({ pageContent: injection[0].result });
}

const updateActiveTabId = async (tabId) => {
  await chrome.storage.local.set({ activeTabId: `taby-${tabId}` });
  console.log('Active tab id updated in background.js');
};

chrome.tabs.onRemoved.addListener((tabId) => {
  clearChatHistory(tabId);
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "openTabyAI",
    title: "Chat with Taby AI",
    contexts: ["all"]
  });
});

// Handle clicks on the context menu item
chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log("Context menu clicked", info, tab);
  if (info.menuItemId === "openTabyAI") {
    chrome.sidePanel.open({ windowId: tab.windowId });
  }
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  // await getPageContent(activeInfo.tabId);
  await updateActiveTabId(activeInfo.tabId);
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
  if (changeInfo.status === 'complete') {
    // await getPageContent(tabId);
    await updateActiveTabId(tabId);
  }
});

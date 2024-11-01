import { isProbablyReaderable, Readability } from '@mozilla/readability';
console.log('TabyAI running');

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "fetchContext") {
    sendResponse({ text: document.body.innerText });
  }
});

function canBeParsed(document) {
  return isProbablyReaderable(document, {
    minContentLength: 100
  });
}

function parse(document) {
  if (!canBeParsed(document)) {
    return false;
  }
  const documentClone = document.cloneNode(true);
  const article = new Readability(documentClone).parse();
  return article.textContent;
}

parse(window.document);

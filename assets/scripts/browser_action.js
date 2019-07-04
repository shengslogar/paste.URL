function isValidUrl(url) {
  try {
    new URL(url);
  } catch {
    return false;
  }

  return true;
}

(function () {
  let badgeIndicatorTimeout = null;

  const showBadgeIndicator = () => {
    clearTimeout(badgeIndicatorTimeout);
    this.setBadgeText({ text: '\u2713' });

    badgeIndicatorTimeout = setTimeout(() => {
      this.setBadgeText({ text: '' });
    }, 500);
  };

  this.onClicked.addListener(({ id: tabId }) => {
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.focus();

    try {
      if (document.execCommand('paste') && isValidUrl(input.value)) {
        chrome.tabs.update(tabId, { url: input.value });
        showBadgeIndicator();
      }
    } catch {
    }

    input.remove();
  });
}).apply(chrome.browserAction);

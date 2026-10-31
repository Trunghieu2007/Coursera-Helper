// the toolbar icon opens the side panel instead of a popup
chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch(() => {});

// the toolbar follows the appearance setting: the light build is a white tile around the blue
// c, the dark build is the blue tile around the white c
const ICON_PATHS = {
    light: {
        16: "icons/light/icon16.png",
        32: "icons/light/icon32.png",
        48: "icons/light/icon48.png",
        128: "icons/light/icon128.png"
    },
    dark: {
        16: "icons/icon16.png",
        32: "icons/icon32.png",
        48: "icons/icon48.png",
        128: "icons/icon128.png"
    }
};

// draw the toolbar in the chosen build
function setToolbarIcon(dark) {
    chrome.action.setIcon({ path: dark ? ICON_PATHS.dark : ICON_PATHS.light }).catch(() => {});
}

// the panel resolves system appearance and reports it here
chrome.runtime.onMessage.addListener((message) => {
    if (message && message.action === "iconTheme") setToolbarIcon(message.dark !== false);
    return false;
});

// a choice made in the panel also reaches the toolbar without the message
chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "local" || !changes.theme) return;
    if (changes.theme.newValue === "light") setToolbarIcon(false);
    else if (changes.theme.newValue === "dark") setToolbarIcon(true);
});

// before the panel has ever opened, only an explicit light choice can be followed; system
// keeps the dark build until the panel resolves it
chrome.storage.local.get("theme", ({ theme }) => {
    if (theme === "light") setToolbarIcon(false);
});

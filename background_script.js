browser.contextMenus.create({
  id: "add-image",
  title: "Add image",
  contexts: ["image"],
});

browser.contextMenus.onClicked.addListener(addImage);

function addImage(info, tab) {
  console.log(info);
  let imageUrl = info.src;
  const url = "https://duckduckgo.com/?q=" + imageUrl;
  browser.tabs.create({ url: url });
}

//srcUrl

// browser.browserAction.setBadgeText({ text: "&" });
// browser.browserAction.setBadgeBackgroundColor({ color: "red" });

// browser.browserAction.onClicked.addListener(() => {
//   browser.browserAction.setBadgeBackgroundColor({ color: "green" });
// });

chrome.contextMenus.create({
  id: "add-image",
  title: "Add image",
  contexts: ["image"],
});

// chrome.contextMenus.onClicked.addListener(addNewImage);

// function addImage(info, tab) {
//   console.log(info);
//   let imageUrl = info.src;
//   const url = "https://duckduckgo.com/?q=" + imageUrl;
//   chrome.tabs.create({ url: url });
// }

// function addNewImage(image, tabs) {
//   let imageUrl = image.src;
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     chrome.tabs.sendMessage(tabs[0].id, {
//       imageToSave: `${imageUrl}`,
//       function((response)) {
//       },
//     });
//   });
// }

function onError(error) {
  console.error(`Error: ${error}`);
}

function sendMessageToTabs(tabs, image) {
  for (const tab of tabs) {
    // let image = "test";
    chrome.tabs
      .sendMessage(tab.id, {
        greeting: `Hi from background script ${image.srcUrl}`,
        image: image,
      })
      .then((response) => {
        console.log("Message from the content script:");
        console.log(response.response);
        // chrome.chromeAction.setBadgeText({ text: "✓" });
        // chrome.chromeAction.setBadgeBackgroundColor({ color: "#2c2c2c" });
      })
      .catch(onError);
  }
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
  chrome.tabs
    .query({
      currentWindow: true,
      active: true,
    })
    .then((tabs) => {
      sendMessageToTabs(tabs, info);
    })
    .catch(onError);
});

//srcUrl

// chrome.chromeAction.setBadgeText({ text: "&" });
// chrome.chromeAction.setBadgeBackgroundColor({ color: "red" });

// chrome.chromeAction.onClicked.addListener(() => {
//   chrome.chromeAction.setBadgeBackgroundColor({ color: "green" });
// });

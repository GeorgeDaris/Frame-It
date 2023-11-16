browser.contextMenus.create({
  id: "add-image",
  title: "Add image",
  contexts: ["image"],
});

// browser.contextMenus.onClicked.addListener(addNewImage);

// function addImage(info, tab) {
//   console.log(info);
//   let imageUrl = info.src;
//   const url = "https://duckduckgo.com/?q=" + imageUrl;
//   browser.tabs.create({ url: url });
// }

// function addNewImage(image, tabs) {
//   let imageUrl = image.src;
//   browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     browser.tabs.sendMessage(tabs[0].id, {
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
    browser.tabs
      .sendMessage(tab.id, {
        greeting: `Hi from background script ${image.srcUrl}`,
        image: image,
      })
      .then((response) => {
        console.log("Message from the content script:");
        console.log(response.response);
        // browser.browserAction.setBadgeText({ text: "✓" });
        // browser.browserAction.setBadgeBackgroundColor({ color: "#2c2c2c" });
      })
      .catch(onError);
  }
}

browser.contextMenus.onClicked.addListener((info, tab) => {
  browser.tabs
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

// browser.browserAction.setBadgeText({ text: "&" });
// browser.browserAction.setBadgeBackgroundColor({ color: "red" });

// browser.browserAction.onClicked.addListener(() => {
//   browser.browserAction.setBadgeBackgroundColor({ color: "green" });
// });

browser.contextMenus.create({
  id: "add-image",
  title: "Add image",
  contexts: ["image"],
});

browser.contextMenus.onClicked.addListener(addNewImage);

// function addImage(info, tab) {
//   console.log(info);
//   let imageUrl = info.src;
//   const url = "https://duckduckgo.com/?q=" + imageUrl;
//   browser.tabs.create({ url: url });
// }

function addNewImage(image, tab) {
  let imageUrl = image.src;
  browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    browser.tabs.sendMessage(tabs[0].id, {
      imageToSave: `${imageUrl}`,
      function(response) {},
    });
  });
}

//srcUrl

// browser.browserAction.setBadgeText({ text: "&" });
// browser.browserAction.setBadgeBackgroundColor({ color: "red" });

// browser.browserAction.onClicked.addListener(() => {
//   browser.browserAction.setBadgeBackgroundColor({ color: "green" });
// });

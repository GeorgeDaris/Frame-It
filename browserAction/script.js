async function loadStorage() {
  if (!browser.storage.local.get("theme")) {
    let theme;
  } else {
    let body = document.querySelector("body");
    let root = document.querySelector(":root");
    theme = await browser.storage.local.get("theme");
    console.log(theme.theme);
    if (theme.theme === "custom-theme") {
      let customThemeBgColor = await browser.storage.local.get("customBgColor");
      let customThemeAccentColor = await browser.storage.local.get(
        "customAccentColor"
      );

      root.style.setProperty(
        "--custom-theme-bg-color",
        customThemeBgColor.customBgColor
      );
      root.style.setProperty(
        "--custom-theme-accent-color",
        customThemeAccentColor.customAccentColor
      );
      console.log(`BG COLOR IS: ${customThemeBgColor.customBgColor}`);
    }
    body.classList.add(theme.theme);
  }

  //Font
  let gettingFont = browser.storage.local.get("currentFont");
  let fontExists;

  await gettingFont.then((value) => {
    if (value.currentFont) {
      fontExists = true;
    } else {
      fontExists = false;
    }
  });
  if (fontExists === false) {
    //not sure if anything is needed here
  } else {
    let main = document.querySelector("main");
    let font = await browser.storage.local.get("currentFont");
    main.classList.add(font.currentFont);
  }

  //Frame
  let mainImage = document.querySelectorAll(".main-image");
  let captionWrap = document.querySelectorAll(".fade-text");

  let gettingFrame = browser.storage.local.get("currentFrame");
  let frameExists;

  await gettingFrame.then((value) => {
    if (value.currentFrame) {
      frameExists = true;
    } else {
      frameExists = false;
    }
  });

  if (frameExists === false) {
    //not sure if anything is needed here
  } else {
    let frame = await browser.storage.local.get("currentFrame");
    mainImage.forEach((image) => {
      captionWrap.forEach((caption) => {
        // if (frame.currentFrame === "polaroid") {
        //   image.classList.add("frame-polaroid");
        //   caption.classList.add("frame-polaroid-caption");
        // }
        switch (frame.currentFrame) {
          case "shadow":
            image.classList.add("frame-shadow");
            break;
          case "polaroid":
            image.classList.add("frame-polaroid");
            caption.classList.add("frame-polaroid-caption");
            break;
          case "photo corner":
            let imageContainer = document.querySelectorAll(
              ".select-image-container"
            );
            imageContainer.forEach((container) => {
              container.classList.add("frame-corner");
            });
            image.classList.add("frame-none");
            break;
          case "image":
            image.classList.add("frame-image");
          case "none":
            image.classList.add("frame-none");
        }
      });
    });
  }
}

//maybe the popup can't access the user's color scheme?

loadStorage();
//IT WORKS

let test = [
  {
    name: "test",
    age: 34,
  },
  {
    name: "Two",
    age: 24,
  },
];

browser.storage.local.set({ test });
console.log(test);

let optionsBtn = document.querySelector(".openOptions");

optionsBtn.addEventListener("click", () => {
  browser.runtime.openOptionsPage();
});

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

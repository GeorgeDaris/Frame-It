let body = document.querySelector("body");
let root = document.querySelector(":root");
let main = document.querySelector("main");

// Theme Options
let themeOption = document.themeForm.theme;
let themeLabel = document.querySelectorAll(".theme-option");

//Custom Color Form
let colorPanel = document.querySelector(".custom-theme-wrapper");

let bgColor = document.colorForm.custom_theme_background_color;
let accentColor = document.colorForm.custom_theme_accent_color;

let colorLabel = document.querySelectorAll(".color-option");
let colorCode = document.querySelectorAll(".color-code");

let applyColorBtn = document.querySelector(".color-btn");
let previewThemeBg = document.querySelector(".theme-preview");
let previewThemeFrame = document.querySelector(".frame");

//Font options
let fontOption = document.fontForm.font;
let fontLabel = document.querySelectorAll(".font-option");

//Frame options
let frameOption = document.frameForm.frame;
let frameLabel = document.querySelectorAll(".frame-form label");

async function loadStorage() {
  //Theme
  let gettingTheme = browser.storage.local.get("theme");
  let themeExists;

  await gettingTheme.then((value) => {
    if (value.theme) {
      themeExists = true;
    } else {
      themeExists = false;
    }
  });
  if (themeExists === false) {
    //use the native theme until the user picks their own
    let theme;
    let currentThemeOption;
    console.log("The theme hasn't been stored");
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      themeOption[1].checked = true;
      themeLabel[1].classList.add("active-theme");
      console.log("HELLO");
      currentThemeOption = themeOption[1];
    } else {
      themeOption[0].checked = true;
      themeLabel[0].classList.add("active-theme");
      currentThemeOption = themeOption[0];
    }
  } else {
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

      colorCode[0].textContent = customThemeBgColor.customBgColor;
      previewThemeBg.style.backgroundColor = customThemeBgColor.customBgColor;

      colorCode[1].textContent = customThemeAccentColor.customAccentColor;
      previewThemeFrame.style.borderColor =
        customThemeAccentColor.customAccentColor;
      previewThemeFrame.style.color = customThemeAccentColor.customAccentColor;

      bgColor.value = customThemeBgColor.customBgColor;
      accentColor.value = customThemeAccentColor.customAccentColor;

      console.log(`BG COLOR IS: ${customThemeBgColor.customBgColor}`);
    }
    body.classList.add(`${theme.theme}`);

    if (theme.theme === "light-mode") {
      themeLabel[0].classList.add("active-theme");
      themeOption[0].checked = true;
      currentThemeOption = themeOption[0];
    } else if (theme.theme === "dark-mode") {
      themeLabel[1].classList.add("active-theme");
      themeOption[1].checked = true;
      currentThemeOption = themeOption[1];
    } else {
      themeLabel[2].classList.add("active-theme");
      themeOption[2].checked = true;
      currentThemeOption = themeOption[2];
    }
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
    fontLabel[0].classList.add("active-theme");
    fontOption[0].checked = true;
    let currentFont = "inter";
    browser.storage.local.set({ currentFont });
  } else {
    let font = await browser.storage.local.get("currentFont");
    main.classList.add(font.currentFont);
    fontOption.forEach((option) => {
      if (option.value === font.currentFont) {
        let fontId = option.getAttribute("id");
        option.checked = true;

        for (i = 0; i < fontLabel.length; i++) {
          let labelAttr = fontLabel[i].getAttribute("for");
          if (labelAttr.includes(fontId)) {
            //if they match, add the active class
            fontLabel[i].classList.add("active-theme");
            console.log(labelAttr);
          }
        }
      }
    });
  }
}

loadStorage();

function changeTheme(newTheme, newCurrentTheme) {
  body.className = ""; //remove previous theme
  body.classList.add(`${newTheme}`);
  theme = `${newTheme}`;
  browser.storage.local.set({ theme });
  console.log(`The theme "${theme}" was saved!`);
  currentThemeOption = newCurrentTheme;
  console.log(`New option: ${currentThemeOption}`);
}

function changeLabel(option) {
  if (option === "light-mode") {
    themeLabel[0].classList.add("active-theme");
    themeLabel[1].classList.remove("active-theme");
    themeLabel[2].classList.remove("active-theme");
  } else if (option === "dark-mode") {
    themeLabel[1].classList.add("active-theme");
    themeLabel[0].classList.remove("active-theme");
    themeLabel[2].classList.remove("active-theme");
  } else {
    themeLabel[2].classList.add("active-theme");
    themeLabel[0].classList.remove("active-theme");
    themeLabel[1].classList.remove("active-theme");
  }
}

//changing the theme
themeOption.forEach((option) => {
  option.addEventListener("change", () => {
    if (option.value === "custom") {
      colorPanel.classList.add("custom-theme-wrapper-active");
    } else if (option.value === "light") {
      changeTheme("light-mode", option);
      changeLabel("light-mode");
    } else {
      changeTheme("dark-mode", option);
      changeLabel("dark-mode");
    }
  });
});

// themeOption[2].addEventListener("click", () => {
//   if (
//     themeOption[2].checked === true &&
//     body.classList.contains("custom-theme")
//   ) {
//     colorPanel.classList.add("custom-theme-wrapper-active");
//     themeOption[2].checked = true;
//   }
// });

// Closing the popup when the user clicks outside the panel
let colorPanelDescendants = Array.from(colorPanel.querySelectorAll("*"));

body.addEventListener("click", (e) => {
  if (
    colorPanel !== e.target &&
    colorPanel.classList.contains("custom-theme-wrapper-active")
    // run the code below only when the popup is open and the click wasn't on the popup itself
  ) {
    for (i = 0; i < colorPanelDescendants.length; i++) {
      if (e.target === colorPanelDescendants[i]) {
        return; // don't close the popup when clicking on any of the form elements inside of it
      }
    }
    //otherwise, close the popup
    console.log(e.target);
    console.log(colorPanelDescendants);
    colorPanel.classList.remove("custom-theme-wrapper-active");
    console.log("TEST");

    //highlight/check the previously selected theme in case it wasn't the custom one
    if (theme.theme !== "custom-theme") {
      themeOption[2].checked = false;
      themeOption.forEach((option) => {
        if (option === currentThemeOption) {
          option.checked = true;
        }
      });
    }
  }
});

//Implementing the preview functionality
bgColor.addEventListener("change", () => {
  colorCode[0].textContent = bgColor.value;
  previewThemeBg.style.backgroundColor = bgColor.value;

  let customBgColor = bgColor.value;
  browser.storage.local.set({ customBgColor });
});

accentColor.addEventListener("change", () => {
  colorCode[1].textContent = accentColor.value;
  previewThemeFrame.style.borderColor = accentColor.value;
  previewThemeFrame.style.color = accentColor.value;

  let customAccentColor = accentColor.value;
  browser.storage.local.set({ customAccentColor });
});

applyColorBtn.addEventListener("click", (e) => {
  e.preventDefault();

  //changing the css variables to those selected
  root.style.setProperty("--custom-theme-bg-color", bgColor.value);
  root.style.setProperty("--custom-theme-accent-color", accentColor.value);
  colorPanel.classList.remove("custom-theme-wrapper-active"); //leaving it here for testing purposes
  changeTheme("custom-theme", themeOption[2]);
  changeLabel("custom-theme");

  //in case the user doesn't change the values we won't have to check whether they exist in the storage when loading the theme, eliminating some lines of code.
  let customBgColor = bgColor.value;
  let customAccentColor = accentColor.value;

  browser.storage.local.set({ customBgColor });
  browser.storage.local.set({ customAccentColor });
});

//Getting the font from the storage
async function getFont() {
  let gettingFont = await browser.storage.local.get("currentFont");
  currentFont = gettingFont.currentFont;
} //this is done to remove the previous font as seen below. Not the most elegant solution...

getFont();

//changing the font
fontOption.forEach((option) => {
  option.addEventListener("change", () => {
    main.classList.remove(currentFont);
    main.classList.add(option.value);
    currentFont = option.value;
    let fontId = option.getAttribute("id");
    browser.storage.local.set({ currentFont });
    //consider adding them to the main element to not interfere with the body, since it delete's all of it's classes when selecting a different theme

    for (i = 0; i < fontLabel.length; i++) {
      let labelAttr = fontLabel[i].getAttribute("for");
      if (labelAttr.includes(fontId)) {
        //if they match, add the active class
        fontLabel[i].classList.add("active-theme");
        console.log(labelAttr);
      } else if (fontLabel[i].classList.contains("active-theme")) {
        //otherwise, if it is the previously selected one, remove the class
        fontLabel[i].classList.remove("active-theme");
      }
    }
  });
});

//changing the frame
frameOption.forEach((option) => {
  option.addEventListener("change", () => {});
});

// let downloadLink = document.querySelector(".download");
let exportBtn = document.querySelector(".export-btn");

async function downloadJSON() {
  let data = await browser.storage.local.get("test");
  let dataStr = JSON.stringify(data.test, null, 4); //the third parameter is for adding indentations
  console.log(dataStr);
  let dataUri = "data: text/json;charset=utf-8," + encodeURIComponent(dataStr);
  let exportFileDefaultName = "test.json";

  let downloadLink = document.createElement("a");
  downloadLink.setAttribute("href", dataUri);
  downloadLink.setAttribute("download", exportFileDefaultName);
  downloadLink.click();
}
// downloadJSON();

exportBtn.addEventListener("click", downloadJSON);

if (!"theme" in window) {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    themeOption[1].checked = true;
  } else {
    themeOption[0].checked = true;
  }
}

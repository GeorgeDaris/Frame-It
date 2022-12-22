console.log("TESTTTTTTTTTTTTTTTTTTTTTTTT");

let body = document.querySelector("body");
let images = document.querySelectorAll("img");

images.forEach((image) => {
  // image.addEventListener("mouseover", () => {
  // })
});

browser.runtime.onMessage.addListener((request) => {
  console.log(request.imageToSave);
  console.log("HEYYYYYYYYYYYYYYYY");
});

async function getFont() {
  let font = await browser.storage.local.get("currentFont");
  console.log(font.currentFont);
}

getFont(); //works!

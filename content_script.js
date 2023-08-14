console.log("TESTTTTTTTTTTTTTTTTTTTTTTTT");

let body = document.querySelector("body");
let images = document.querySelectorAll("img");

images.forEach((image) => {
  // image.addEventListener("mouseover", () => {
  // })
});

// browser.runtime.onMessage.addListener((request) => {
//   console.log(request.imageToSave);
//   console.log("HEYYYYYYYYYYYYYYYY");
// });

async function getFont() {
  let font = await browser.storage.local.get("currentFont");
  console.log(font.currentFont);
}

getFont(); //works!

const capitalize = (sentence) => {
  sentence = sentence.toString();
  const words = sentence.split(" ");

  // words.forEach((word) => {
  //   word = word[0].toUpperCase() + word.substr(1);
  // });

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  console.log(words.join(" "));
  return words.join(" ");
};

browser.runtime.onMessage.addListener((request) => {
  console.log("Message from the background script:");
  console.log(request.greeting);

  const images = document.querySelectorAll("img");

  for (const img of images) {
    if (img.src == request.image.srcUrl) {
      img.style.transition = "all 0.3s ease";
      img.style.outline = "thick double #2596be";
      // img.style.border = "0.2rem solid black";
      // img.style.filter =
      //   "drop-shadow(0.2rem 0.2rem 0rem white)drop-shadow(-0.2rem -0.2rem 0rem black) drop-shadow(0.2rem 0.2rem 0rem black)drop-shadow(-0.2rem -0.2rem 0rem white) drop-shadow(0.2rem 0.2rem 0rem white)drop-shadow(-0.2rem -0.2rem 0rem black)";

      // const addImage = async () => {
      //   let images = await browser.storage.local.get("images");
      //   let newImage = {
      //     id: `${Math.floor(Date.now() * Math.random())}`,
      //     URL: request.image.srcUrl,
      //     description: img.alt ? img.alt : "",
      //     frame: "Border",
      //   };
      //   console.log(images);
      //   images = [newImage];
      //   browser.storage.local.set({ images });
      // };

      const addImage = async () => {
        let frameObj = await browser.storage.local.get("currentFrame");
        let frame = frameObj.currentFrame;
        frame = capitalize(frame);
        await browser.storage.local.get("images", ({ images = [] }) => {
          images.push({
            id: `${Math.floor(Date.now() * Math.random())}`,
            URL: request.image.srcUrl,
            description: img.alt ? img.alt : "New Image",
            frame: frame ? frame : "Border",
            isMainImage: images.length < 1 ? true : false,
          });
          browser.storage.local.set({ images });
          console.log(images);
        });
      };
      addImage();

      console.log(img.alt);
    }
  }
  return Promise.resolve({ response: "Hi from content script" });
});

<script setup>
import { reactive, provide, watch, computed, toRaw, ref } from 'vue'

import AddImage from './components/AddImage.vue'
import FramedImage from './components/FramedImage.vue'
import LayoutToggle from './components/LayoutToggle.vue'
import SetMainImageButton from './components/SetMainImageButton.vue'
import OpenOptions from './components/OpenOptions.vue'
// import FrameOptions from './components/FrameOptions.vue'

let hasLoaded = ref(false)
//For the extension version
let images = reactive([])

const getImages = async () => {
  let storedImages = await browser.storage.local.get('images')

  //I found the issue! I am pushing the entire array, instead of the individual items.
  if (storedImages && storedImages.images) {
    storedImages.images.forEach((img) => {
      images.push(img)
    })
    hasLoaded.value = true
  }
  console.log('storedImages')
  console.log(storedImages)
  console.log('images')
  console.log(images)
  console.log('images.images')
  console.log(images)
  console.log('images.length')
  console.log(images.length)
}

//For the extension version
getImages()

//For the regular web app demo
// let images = localStorage.images
//   ? reactive(JSON.parse(localStorage.images))
//   : reactive([
// {
//   id: undefined,
//   URL: undefined,
//   description: undefined,
//   frame: undefined,
//   isMainImage: undefined
// }
// ])

const addImage = (image) => {
  //adding it as the main image when there are no other images

  // Thinking of moving this to the watcher to ensure the first image to be added through a right click becomes the main one
  images.length < 1 ? (image.isMainImage = true) : (image.isMainImage = false)

  //pushing it as a shallow copy to prevent the reactivity from carrying over
  images.push({
    ...image
  })
  console.log('WHy is nothing working?')
  console.log(images)
}

provide('addImage', addImage)

const setAsMainImage = (imageToSet) => {
  //removing the previous main image
  let previousMainImage = images.find((image) => image.isMainImage === true)
  previousMainImage ? (previousMainImage.isMainImage = false) : ''

  let newMainImage = images.find((image) => image.id === imageToSet.id)
  newMainImage.isMainImage = true
}

provide('setAsMainImage', setAsMainImage)

const deleteImage = (imageToRemove) => {
  const imageIndex = images.findIndex((image) => image.id === imageToRemove.id)
  if (images[imageIndex].isMainImage) {
    if (images[imageIndex - 1]) {
      setAsMainImage(images[imageIndex - 1])
    } else if (images[imageIndex + 1]) {
      setAsMainImage(images[imageIndex + 1])
    }
  }
  images.splice(imageIndex, 1)
}

provide('deleteImage', deleteImage)

const hasImage = () => {
  return images.length >= 1 ? true : false
}

hasImage()

let border = hasImage() ? 'has-image' : ''

watch(
  images,
  (newValue) => {
    //For the extension version
    if (hasLoaded.value) {
      let plainImageObject = toRaw(newValue)
      browser.storage.local.set({ images: plainImageObject })
    }

    //For the Web App Demo
    // localStorage.setItem('images', JSON.stringify(newValue))
    // adding it as the main image when there are no other images
    images.length < 1 ? (newValue.isMainImage = true) : (newValue.isMainImage = false)
    console.log('The new image' + newValue)

    hasImage()
    border = hasImage() ? 'has-image' : ''
  },
  {
    deep: true,
    immediate: true
  }
)

const mainImage = computed(() => {
  return images.find((image) => image.isMainImage === true)
})

const recentImages = computed(() => {
  return images.slice().reverse()
})

async function loadStorage() {
  let body = document.querySelector('body')
  let root = document.querySelector(':root')
  let theme = await browser.storage.local.get('theme')
  console.log(theme.theme)
  if (theme.theme === 'custom-theme') {
    let customThemeBgColor = await browser.storage.local.get('customBgColor')
    let customThemeAccentColor = await browser.storage.local.get('customAccentColor')

    root.style.setProperty('--custom-theme-bg-color', customThemeBgColor.customBgColor)
    root.style.setProperty('--custom-theme-accent-color', customThemeAccentColor.customAccentColor)
    console.log(`BG COLOR IS: ${customThemeBgColor.customBgColor}`)
  }
  body.classList.add(theme.theme)
  // }

  //Font
  let gettingFont = browser.storage.local.get('currentFont')
  let fontExists

  await gettingFont.then((value) => {
    if (value.currentFont) {
      fontExists = true
    } else {
      fontExists = false
    }
  })
  if (fontExists === false) {
    //not sure if anything is needed here
  } else {
    let main = document.querySelector('main')
    let font = await browser.storage.local.get('currentFont')
    main.classList.add(font.currentFont)
  }

  // Popup size

  let popupData = await browser.storage.local.get('popupSize')

  const setSize = (size) => {
    root.style.setProperty('font-size', size)
  }

  if (popupData.popupSize) {
    switch (popupData.popupSize) {
      case 'small':
        setSize('0.8rem')
        break
      case 'default':
        setSize('1rem')
        break
      case 'large':
        setSize('1.2rem')
        break
      case 'extra large':
        setSize('1.5rem')
        break
      default:
        setSize('1rem')
        break
    }
  }
}

//maybe the popup can't access the user's color scheme?

//For the extension version
loadStorage()
</script>

<template>
  <!-- {{ hasImage() }} -->
  <main>
    <!-- {{ hasLoaded }}  -->
    <!-- {{ images }} -->
    <div class="image-container" :class="border">
      <AddImage v-if="images.length < 1" />
      <!-- Once there is an image present, we can set it as the main one -->
      <FramedImage v-if="mainImage" :image="mainImage" :key="mainImage.id" />
    </div>
    <hr v-if="images.length > 0" />
    <Transition name="section-fade">
      <div class="gallery-wrapper" v-if="images.length >= 1">
        <LayoutToggle />
        <section class="image-gallery mask">
          <!-- <Teleport to="main">
            <FrameOptions />
          </Teleport> -->
          <AddImage />
          <FramedImage v-for="image in recentImages" :key="image.id" :image="image">
            <SetMainImageButton :image="image" />
          </FramedImage>
        </section>
      </div>
    </Transition>
    <OpenOptions />
    <!-- <pre>
      {{ images }}
    </pre> -->
  </main>
</template>

<style></style>

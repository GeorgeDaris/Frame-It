<script setup>
import { reactive, ref, inject, nextTick, watch, onMounted } from 'vue'

// import FrameOptions from './FrameOptions.vue'
import { useImageURL } from '../composables/imageURL.ts'

const props = defineProps({
  isEditing: {
    type: Boolean,
    default: false
  },
  existingImage: {
    type: Object
  }
})

let newImage = props.existingImage
  ? reactive(props.existingImage)
  : reactive({
      id: undefined,
      URL: undefined,
      description: undefined,
      frame: 'Border'
    })

const frames = ['Border', 'Shadow', 'Polaroid', 'Photo Corner', 'Image', 'Blur', 'None']

const addNewImage = inject('addImage')

let formOpen = props.isEditing ? ref(true) : ref(false)
let imageReady = ref(undefined)
let addImageBtnCSS = props.isEditing ? ref('') : ref('add-image')
let showImage = ref(false)
let warnText = ref(undefined)
let warnURL = ref(undefined)
let warnDescr = ref(undefined)
let isValid = ref(undefined)
let validURL = ref('')
let input = ref(null)

async function checkURL() {
  return new Promise((resolve, reject) => {
    const imageToLoad = new Image()
    imageToLoad.src = newImage.URL
    imageToLoad.onload = () => resolve(true)
    imageToLoad.onerror = () => resolve(false)
  })
}

watch(newImage, (newValue) => {
  if (newImage.URL != '') {
    //otherwise the function would run while editing the description, or while typing it out for the first time. This would happen because the checkURL() function is inside the image watcher, which fires whenever any part of the image object changes, not just it's description
    checkURL().then((resolve, reject) => {
      if (resolve) {
        console.log('VALID')
        isValid.value = true
        warnText.value = null
        newImage.description !== '' && newImage.description !== undefined && !props.isEditing
          ? (imageReady.value = 'add-image-ready')
          : (imageReady.value = '')
        validURL.value = useImageURL(newImage.URL).value
      } else {
        isValid.value = false
        console.log('NOT VALID')
        warnText.value = 'Invalid URL'
        imageReady.value = ''
        validURL.value = ''
      }
    })
  }
})

const addImage = async () => {
  if (!formOpen.value) {
    //opening the form
    formOpen.value = !formOpen.value

    await nextTick()
    input.value.focus()
  } else if ((formOpen.value && newImage.description == '') || newImage.description == undefined) {
    if (isValid.value) {
      warnText.value = 'Please enter a description'
      warnDescr.value = 'add-image-url-error'
    } else {
      // warnText.value = 'Please enter a valid URL and a description'
      // warnDescr.value = 'add-image-url-error'
      // warnURL.value = 'add-image-url-error'
      formOpen.value = !formOpen.value
    }
  } else if (isValid.value) {
    newImage.id = `${Math.floor(Date.now() * Math.random())}`
    addNewImage(newImage)
    warnDescr.value = ''
    warnURL.value = ''
    imageReady.value = ''

    await nextTick()
    formOpen.value = !formOpen.value
    newImage.id = ''
    newImage.URL = ''
    newImage.description = ''
    newImage.frame = 'Border'
  } else {
    warnText.value = 'Please enter a valid URL'
    warnURL.value = 'add-image-url-error'
    warnDescr.value = ''
  }
}

// onMounted(async () => {
//   await nextTick()
//   props.existingImage ? (newImage = reactive(props.existingImage)) : ''
// })
</script>
<template>
  <div :class="[imageReady, addImageBtnCSS]" v-if="!showImage">
    <!-- Hides the UI once a valid image has been given -->
    <form @submit.prevent="" class="add-image-form" novalidate autocomplete="off" spellcheck="true">
      <button
        @click="addImage"
        class="add-image-btn"
        title="add image"
        v-if="!props.isEditing"
      ></button>
      <Transition name="btn-fade">
        <div class="label-container" v-if="formOpen">
          <label for="URL" class="add-image-label">Image URL</label>
          <input
            type="url"
            name="Image URL"
            id="URL"
            class="add-image-url"
            :class="warnURL"
            placeholder="https://cdn.wa.H's_Envelope.jpg"
            v-model="newImage.URL"
            ref="input"
            required="true"
            :disabled="props.isEditing ? true : false"
          />
          <label for="descr" class="add-image-label">Description</label>
          <input
            type="text"
            name="Image description"
            id="descr"
            class="add-image-url"
            :class="warnDescr"
            ref="inputDescr"
            placeholder="Hayley's envelope"
            v-model="newImage.description"
            required="true"
          />
          <label class="frame-label">
            Frame
            <select v-model="newImage.frame">
              <option
                :value="frame"
                v-for="frame in frames"
                :key="frame"
                :selected="frame === newImage.frame"
              >
                {{ frame }}
              </option>
            </select>
            <p class="warn-para" v-if="warnText">{{ warnText }}</p>
          </label>
          <!-- <Teleport to="body">
            <FrameOptions />
          </Teleport> -->
        </div>
      </Transition>
    </form>
  </div>
</template>
<style scoped>
button {
  background-image: v-bind(validURL);
  background-size: cover;
}

.frame-label {
  font-size: 0.8rem;
  margin-top: -0.4rem;
  margin-left: 0.2rem;
}

select {
  display: block;
  background-color: var(--white);
  color: var(--dark-color);
  width: 100%;
  padding: 0.2rem;
  border: 0.1rem solid var(--dark-color);
  font-family: var(--main-font), sans-serif;
  font-size: 0.833rem;
  /* border-radius: 0.1rem; */
  transition: box-shadow 0.3s;
  cursor: pointer;
}
</style>

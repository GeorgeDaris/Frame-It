<script setup>
import { ref, computed } from 'vue'
import EditContainer from './EditContainer.vue'
// import AddImage from './AddImage.vue'

import { useImageURL } from '../composables/imageURL.ts'

const props = defineProps({
  image: {
    type: Object,
    required: true
  },
  canEdit: {
    type: Boolean,
    default: true
  }
})

let imageRef = ref(null)

const url = useImageURL(props.image.URL).value

let frame = ref('')

const checkFrame = (type) => {
  switch (type) {
    case 'Shadow':
      frame.value = 'frame-shadow'
      break
    case 'Polaroid':
      frame.value = 'frame-polaroid'
      break
    case 'Photo Corner':
      frame.value = 'frame-none'
      break
    case 'Image':
      frame.value = 'frame-image'
      break
    case 'None':
      frame.value = 'frame-none'
      break
  }
}

const imageFrame = computed(() => {
  checkFrame(props.image.frame)
  return frame.value
})

const corner = computed(() => {
  return props.image.frame == 'Photo Corner' ? 'frame-corner' : ''
})

const caption = computed(() => {
  return props.image.frame == 'Polaroid' ? 'frame-polaroid-caption' : ''
})

const blur = computed(() => {
  return props.image.frame == 'Blur' ? 'blur' : ''
})

const polaroidCaptionWidth = computed(() => {
  return imageRef.value ? `${imageRef.value.offsetWidth}px` : '2px'
})

let btnContainer = ref(false)

const showBtn = () => (btnContainer.value = true)
const hideBtn = () => (btnContainer.value = false)
</script>
<template>
  <Transition name="fade" appear>
    <div class="image-wrapper" @mouseover="showBtn" @mouseleave="hideBtn">
      <EditContainer v-model="btnContainer" :image="image" v-if="props.canEdit" />
      <!-- <AddImage /> -->
      <figure>
        <div class="select-image-container" :class="[corner, blur]">
          <img
            class="main-image"
            :class="[imageFrame, blur]"
            :src="image.URL"
            :alt="image.description"
            ref="imageRef"
            loading="lazy"
          />
          <slot />
        </div>
        <figcaption class="fade-text" :class="caption">
          <span>{{ image.description }}</span>
        </figcaption>
      </figure>
    </div>
  </Transition>
</template>
<style>
/* background-image: url("v-bind('image.URL')"); */
.select-image-container.blur::after {
  content: '';
  background-image: v-bind(url);
  background-position: center;
  background-size: contain;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 1rem;
  right: -1rem;
  z-index: -1;
  filter: blur(1.2rem);
  opacity: 0.75;
}

.image-gallery .select-image-container.blur::after {
  position: absolute;
  top: 0.2rem;
  right: -0.2rem;
  filter: blur(0.25rem);
}

.main-image.blur {
  border: none;
  border-radius: 0.2rem;
  filter: drop-shadow(0.1rem 0.1rem 3px color-mix(in srgb, var(--white), black 70%));
}

.image-container .select-image-container {
  perspective: 1000px;
  transform-style: preserve-3d;
  transition: all 0.5s;
}

.image-container .select-image-container:hover {
  transform: rotateY(20deg) rotateX(10deg);
}

.frame-polaroid-caption {
  outline: 0.5rem solid var(--dark-color);
  background-color: var(--dark-color);
  color: var(--white);
  width: v-bind(polaroidCaptionWidth);
}
</style>

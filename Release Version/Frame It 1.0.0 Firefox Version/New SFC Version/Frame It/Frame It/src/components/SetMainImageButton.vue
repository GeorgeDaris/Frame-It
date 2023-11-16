<script setup>
import { inject, onMounted, ref } from 'vue'

defineProps({
  image: Object
})

const selectImage = inject('setAsMainImage')

let btnActive = ref('')
let parent = {}
let buttonContainer = ref(null)

const show = () => (btnActive.value = 'btn-container-active')
const hide = () => (btnActive.value = '')

onMounted(() => {
  parent = buttonContainer.value.parentElement

  //showing and removing the buttons when the user hovers over the parent element
  parent.addEventListener('mouseenter', () => {
    show()
  })

  parent.addEventListener('mouseleave', () => {
    hide()
  })
})
</script>
<template>
  <div class="select-image" :class="btnActive" ref="buttonContainer">
    <button
      class="add-image-btn select-image-btn"
      title="select as main image"
      @click="selectImage(image)"
      @focus="show"
      @blur="hide"
    ></button>
  </div>
</template>

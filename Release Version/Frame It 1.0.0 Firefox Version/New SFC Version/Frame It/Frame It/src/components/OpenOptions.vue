<script setup>
import GearIcon from './icons/GearIcon.vue'

const openOptions = () => browser.runtime.openOptionsPage()

const vOnBodyHover = {
  mounted(el) {
    const mouseOver = () => {
      el.style.opacity = '1'
    }

    const mouseOut = () => {
      el.style.opacity = '0'
    }

    //show the element when the user hovers over the body
    document.body.addEventListener('mouseover', mouseOver)
    document.body.addEventListener('mouseout', mouseOut)

    //or when they focus on the element itself
    el.addEventListener('focus', mouseOver)
    el.addEventListener('blur', mouseOut)
  }
}
</script>
<template>
  <button tile="open options page" @click="openOptions" v-on-body-hover><GearIcon /></button>
</template>
<style scoped>
button {
  position: absolute;
  top: 0rem;
  right: 0rem;
  background: var(--white);
  border: none;
  border-radius: 0.2rem;
  cursor: pointer;
  transition: opacity 0.3s;
}

button:hover {
  filter: brightness(1.3);
}
</style>

<script setup>
import { ref, onMounted } from 'vue'

let layout = localStorage.layout ? ref(JSON.parse(localStorage.layout)) : ref('vertical')
let buttonLayout = ref('layout-button')

const setLayout = (layout) => {
  if (layout === 'vertical') {
    buttonLayout.value = 'layout-button-horizontal'

    document.body.classList.add('horizontal-body')
    document.querySelector('main').classList.add('main-grid')
    document.querySelector('hr').classList.add('vertical-hr')
    document.querySelector('.image-gallery').setAttribute('id', 'horizontal-gallery')
  } else {
    buttonLayout.value = 'layout-button'

    document.body.classList.remove('horizontal-body')
    document.querySelector('main').classList.remove('main-grid')
    document.querySelector('hr').classList.remove('vertical-hr')
    document.querySelector('.image-gallery').removeAttribute('id')
  }
}

const changeLayout = () => {
  if (layout.value === 'vertical') {
    layout.value = 'horizontal'
    buttonLayout.value = 'layout-button-horizontal'
    localStorage.layout = JSON.stringify(layout.value)

    setLayout(layout.value)
  } else {
    layout.value = 'vertical'
    localStorage.layout = JSON.stringify(layout.value)

    setLayout(layout.value)
  }
}

onMounted(() => setLayout(layout.value))
</script>
<template>
  <button
    @click="changeLayout"
    title="change layout"
    class="toggle-switch"
    :class="buttonLayout"
  ></button>
</template>
<style scoped>
.toggle-switch {
  background-color: var(--white);
  border: 0.1rem solid var(--dark-color);
  border-radius: 0.2rem;
  position: relative;
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;
}

.toggle-switch:hover {
  filter: brightness(1.3);
}

.toggle-switch::after {
  content: '';
  background-color: var(--dark-color);
  width: 1.2rem;
  height: 0.1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
}

.layout-button {
  position: absolute;
  right: 1rem;
  top: -1.4rem;
  rotate: 90deg;
  z-index: 5;
  transition: rotate 0.5s;
}
.layout-button-horizontal {
  position: absolute;
  left: -1.2rem;
  top: 1.5rem;
  z-index: 5;
  transition: rotate 0.5s;
}
</style>

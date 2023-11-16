<script setup>
import { ref, nextTick, onMounted } from 'vue'

import FramedImage from './FramedImage.vue'
import AddImage from './AddImage.vue'

const props = defineProps({
  image: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['closeForm'])

let isOpen = ref(true)

const closeEditForm = () => {
  isOpen.value = !isOpen.value
  setTimeout(() => emit('closeForm'), 100)
}

let container = ref(null)

onMounted(async () => {
  await nextTick()
  container.value.focus()
})
</script>
<template>
  <Teleport to="main">
    <Transition name="section-fade" appear>
      <div
        class="container"
        v-if="isOpen"
        v-click-outside="closeEditForm"
        @keyup.esc="closeEditForm"
        tabindex="0"
        ref="container"
      >
        <FramedImage :image="props.image" :canEdit="false" />
        <div class="form-container">
          <AddImage :isEditing="true" :existingImage="props.image" />
          <div class="btns-container">
            <button class="add-image-url approve-btn" @click="closeEditForm">Save</button>
            <button class="add-image-url cancel-btn" @click="closeEditForm">Cancel</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<style>
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 80%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 5%;
  padding: 0.75rem;
  margin: 0.5rem;
  filter: drop-shadow(0.1rem 0.1rem 3px color-mix(in srgb, var(--white), black 70%));
  border-radius: 0.2rem;
  /* border: 0.1rem solid var(--secondary); */
  background-color: color-mix(in srgb, var(--white), transparent 40%);
  backdrop-filter: blur(7px);
  z-index: 10;
}

.horizontal-body .container {
  /* grid-template-columns: 1fr 1fr; */
  grid-template-columns: min-content auto;
  grid-template-rows: 1fr;
}

.container img {
  max-height: 14rem;
}

.form-container {
  display: flex;
  flex-direction: column;
}

.btns-container {
  display: flex;
  margin-top: auto;
  gap: 10%;
  margin-bottom: 0.2rem;
  padding-bottom: 1rem;
}

.horizontal-body .btns-container {
  padding-bottom: 0rem;
}

.btns-container .add-image-url {
  color: var(--dark);
  cursor: pointer;
}

.approve-btn {
  border-color: var(--ready);
}

.cancel-btn {
  border-color: var(--warn);
}
</style>

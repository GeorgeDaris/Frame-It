<script setup>
import { computed, ref, inject } from 'vue'

import EditIcon from './EditIcon.vue'
import DeleteIcon from './DeleteIcon.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  image: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const showBtns = () => {
  emit('update:modelValue', true)
}

const hideBtns = () => {
  emit('update:modelValue', false)
}

const deleteImage = inject('deleteImage')
</script>
<template>
  <Transition name="btn-fade">
    <div class="btn-container" :class="{ 'btn-container-active': modelValue }">
      <button
        class="edit-btn img-btn"
        title="edit image"
        @click="editImage"
        @focus="showBtns"
        ref="editBtn"
      >
        <EditIcon />
      </button>
      <button
        class="delete-btn img-btn"
        @click="deleteImage(image)"
        @focus="showBtns"
        @blur="hideBtns"
        title="delete image"
      >
        <DeleteIcon />
      </button>
    </div>
  </Transition>
</template>

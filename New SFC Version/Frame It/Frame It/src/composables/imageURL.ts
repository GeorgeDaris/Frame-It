import { computed } from 'vue'

export function useImageURL(src: string) {
  const url = computed(() => {
    return `url(${src})`
  })
  return url
}

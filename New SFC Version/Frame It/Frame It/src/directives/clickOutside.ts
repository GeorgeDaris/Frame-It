export const ClickOutside = {
  mounted(el: any, binding: any) {
    el.__ClickOutsideHandler__ = (event: any) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event)
      }
    }
    setTimeout(() => document.body.addEventListener('click', el.__ClickOutsideHandler__), 0)
  },
  unmounted(el: any) {
    document.body.removeEventListener('click', el.__ClickOutsideHandler__)
  }
}

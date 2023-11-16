import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import { ClickOutside } from './directives/clickOutside'

const app = createApp(App)

app.directive('click-outside', ClickOutside)

app.mount('#app')

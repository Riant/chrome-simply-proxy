import Vue from 'vue'
import App from './App.vue'
import VueI18n from 'vue-i18n'
import Local from '../local'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/assets/global.scss'

Vue.config.productionTip = false

Vue.use(VueI18n)
Vue.use(ElementUI, {size: 'small', zIndex: 3000})

let defaultLanguage = navigator.language

const i18n = new VueI18n({
  locale: defaultLanguage, // set locale
  messages: Local, // set locale messages
})

new Vue({
  i18n,
  render: h => h(App),
}).$mount('#app')

import { Vue } from './modules.js'
import App from './App.js'

if (Vue.version.startsWith('2')) {
    const app = new Vue(App)
    app.$mount('#app')
} else {
    const app = Vue.createApp(App)
    app.mount('#app')
}

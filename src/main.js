import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import * as VueGoogleMaps from 'vue2-google-maps'
import env from './env';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC04k2TIJBXUa0yJQ0N2XimbuiVubkgG6g',
    libraries: 'places',  
  }, 
})
import VueBarcodeScanner from 'vue-barcode-scanner'
Vue.use(VueBarcodeScanner)

import VueThailandAddress from 'vue-thailand-address';
Vue.use(VueThailandAddress);

Vue.use(VueAxios, axios) 
import VueAuthenticate from 'vue-authenticate'
Vue.use(VueAuthenticate, {
  baseUrl: env.AUTH_CALLBACK,  
  tokenPath: 'id',
   providers: {
     live: { 
       clientId: env.CLIENT_ID,
       authorizationEndpoint : env.AUTH_URL,
       scope: env.SCOPE,
       scopeDelimiter: ' ',
       oauthType: '2.0',
     }
   }
 })  

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

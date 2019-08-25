import '../scss/main.scss';
import Vue from 'vue';

import Application from './application/app.vue';

let app = new Vue({
  el: "#root",
  render(h) {
    return h(Application);
  }
});

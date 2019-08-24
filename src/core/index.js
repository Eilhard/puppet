import '../scss/main.scss';
import Vue from 'vue';

import Application from './application/app.vue';

/* Default values for tests */
if (!localStorage.getItem('food')) {
  let f1 = ["Apple", "Cookies"];
  let f2 = ["Sword", "Potion"];
  let f3 = [{id:1, name: "Mike"}, {id:2, name: "Steve"}];
  localStorage.setItem('food', JSON.stringify(f1));
  localStorage.setItem('equip', JSON.stringify(f2));
  localStorage.setItem('users', JSON.stringify(f3));
}

let app = new Vue({
  el: "#root",
  render(h) {
    return h(Application);
  }
});

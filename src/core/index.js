import '../scss/main.scss';
import Vue from 'vue';

import Application from './application/app.vue';

/* Default values for tests */
if (!localStorage.getItem('food')) {
  let f1 = ["Apple", "Cookies"];
  let f2 = ["Sword", "Potion"];
  let f3 = [{id:1, name: "Mike"}, {id:2, name: "Steve"}];
  let f4 = "SomePassword";
  let f5 = true;
  let f6 = 12;
  let f7 = { id: 107, name: "Hitmonchan", type: "Fighter"};
  localStorage.setItem('food', JSON.stringify(f1));
  localStorage.setItem('equip', JSON.stringify(f2));
  localStorage.setItem('users', JSON.stringify(f3));
  localStorage.setItem('isBool', JSON.stringify(f5));
  localStorage.setItem('numb', JSON.stringify(f6));
  localStorage.setItem('pokemon object', JSON.stringify(f7));
}

let app = new Vue({
  el: "#root",
  render(h) {
    return h(Application);
  }
});

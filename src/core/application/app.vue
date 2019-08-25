<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <div class="navbar-brand">
          <img class="pp-img" :src="logo" alt="">
          <span class="font-weight-bold">Puppet</span>
        </div>
        <form class="form-inline">
          <div class="input-group input-group-sm m-1">
            <input v-model="keyInput" type="text" class="form-control">
            <div class="input-group-append">
              <button v-on:click="addKey" class="btn btn-info font-weight-bold" type="button">Add key</button>
            </div>
          </div>
          <div class="input-group input-group-sm m-1">
            <select
              v-model="currentKey"
              class="custom-select custom-select-sm">
              <option value="0" selected disabled>Select key in Local Storage</option>
              <option v-for="item in localKeys" :value="item">{{item}}</option>
            </select>
            <div class="input-group-append">
              <button v-on:click="removeKey" class="btn btn-info font-weight-bold" type="button">Remove key</button>
            </div>
          </div>
        </form>
      </div>
    </nav>

    <div class="container px-3 py-2">
      <itemConstructor v-on:addNewItem="addLocalDataItem($event)">
      </itemConstructor>
      <item
        v-for="(item, index) in localData"
        v-bind:key="`${JSON.stringify(item)}_${index}`"
        v-bind:data-item="item"
        v-on:itemUpdated="updateLocalDataItem($event)" >
      </item>
    </div>
  </div>
</template>

<script>
  import logopng from './components/nav/puppet.png';
  import Item from './components/item.vue';
  import ItemConstructor from './components/item_constructor.vue';

  export default {
    data() {
      return {
        logo: logopng,
        currentKey: 0,
        keyInput: "",
        localKeys: [],
        localData: [],
        isLocalDataArray: true
      }
    },
    components: {
      item: Item,
      itemConstructor: ItemConstructor
    },
    mounted() {
      let localKeyArr = [];
      for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) == "loglevel:webpack-dev-server") continue;
        localKeyArr.push(localStorage.key(i))
      }
      this.localKeys = localKeyArr;
    },
    watch: {
      currentKey() {
        if (this.currentKey) {
          this.localData = JSON.parse(localStorage.getItem(this.currentKey));
          if (Array.isArray(this.localData)) {
            this.isLocalDataArray = true;
          } else {
            this.isLocalDataArray = false;
            this.localData = [ this.localData ];
          }
        }
      }
    },
    methods: {
      addLocalDataItem(event) {
        if (this.currentKey) {
          this.localData.push(event);
        } else {
          alert("Please choose key or add new one");
          return
        }
        if (this.localData.length == 1) {
          this.localData = this.localData[0];
          localStorage.setItem(this.currentKey, JSON.stringify(this.localData));
          this.localData = [ this.localData ];
        } else {
          localStorage.setItem(this.currentKey, JSON.stringify(this.localData));
        }
      },
      updateLocalDataItem(event) {
        let itemId = this.localData.indexOf(event.basic);
        this.$set(this.localData, itemId, event.updated);
        if (this.isLocalDataArray && this.localData.length > 1) {
          localStorage.setItem(this.currentKey, JSON.stringify(this.localData));
        } else {
          this.localData = this.localData[0];
          localStorage.setItem(this.currentKey, JSON.stringify(this.localData));
          this.localData = [ this.localData ];
        }
      },
      addKey() {
        this.localData = [];
        this.localKeys.push(this.keyInput);
        this.currentKey = this.keyInput;
        localStorage.setItem(this.keyInput, JSON.stringify(this.localData));
        this.keyInput = "";
      },
      removeKey() {
        localStorage.removeItem(this.currentKey);
        this.localKeys.splice(this.localKeys.indexOf(this.currentKey), 1);
        this.localData = [];
        this.currentKey = 0;
      }
    }
  }
</script>

<style scoped>
</style>

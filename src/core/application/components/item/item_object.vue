<template>
  <div  class="bg-secondary p-2 my-2 rounded">
    <button
      v-show="!isEditorMode"
      v-on:click="isEditorMode = !isEditorMode"
      class="btn btn-dark btn-sm btn-block font-weight-bold my-2">New pair</button>
    <form v-show="isEditorMode" class="form-inline">
      <div class="w-100 d-flex flex-wrap justify-content-between">
        <div class="input-group my-2 item-obj-w">
          <div class="input-group-prepend">
            <span class="input-group-text font-weight-bold">Key</span>
          </div>
          <input v-model="newKey" type="text" class="form-control">
        </div>
        <div class="input-group my-2 item-obj-w">
          <div class="input-group-prepend">
            <span class="input-group-text font-weight-bold">Value</span>
          </div>
          <input v-model="newValue" type="text" class="form-control">
          <div class="input-group-append">
            <button v-on:click="addNewPair" class="btn btn-info" type="button">Save</button>
            <button v-on:click="isEditorMode = !isEditorMode" class="btn btn-dark" type="button">Cancel</button>
          </div>
        </div>
      </div>
    </form>
    <object-pair
      v-for="(key, index) in itemKeys"
      v-bind:key="`${key}_${index}`"
      v-bind:itemObjKey="key"
      v-bind:itemObjValue="itemObject[key]"
      v-on:objectPairUpdated="itemObjectUpdated($event)">
    </object-pair>
  </div>
</template>

<script>
  import ObjectPair from './object_pair.vue';

  export default {
    props: {
      itemObject: Object
    },
    components: {
      objectPair: ObjectPair
    },
    data() {
      return {
        isEditorMode: false,
        newKey: "",
        newValue: ""
      }
    },
    computed: {
      itemKeys() {
        return Object.keys(this.itemObject);
      }
    },
    methods: {
      addNewPair() {
        if (this.newKey) {
          this.$emit('itemObjectUpdated',  { obj: this.itemObject, key: this.newKey, value: this.newValue } );
          this.isEditorMode = !this.isEditorMode;
        } else {
          alert("Please set key");
        }
      },
      itemObjectUpdated(event) {
        this.$emit('itemObjectUpdated',  { obj: this.itemObject, key: event.key, value: event.value } );
      }
    }
  }
</script>

<style scoped>
  .item-obj-w {
    width: 49.5%;
    @media (max-width: 650px) {
      width: 100%;
    }
  }
</style>

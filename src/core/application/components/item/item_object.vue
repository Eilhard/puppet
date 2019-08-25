<template>
  <div  class="bg-secondary p-2 my-2 rounded">
    <div class="btn-group w-100">
      <button
        v-show="!isEditorMode"
        v-on:click="deleteItemObject"
        class="btn btn-dark btn-sm text-danger font-weight-bold my-2 w-50">Delete object</button>
      <button
        v-show="!isEditorMode"
        v-on:click="isEditorMode = !isEditorMode"
        class="btn btn-dark btn-sm font-weight-bold my-2 w-50">New pair</button>
    </div>


    <div v-show="isEditorMode">
      <div class="input-group my-2">
        <div class="input-group-prepend">
          <span class="input-group-text font-weight-bold">Value type</span>
        </div>
        <select class="custom-select" v-model="valueType">
          <option value="string">String</option>
          <option value="number">Number</option>
          <option value="boolean">Boolean</option>
        </select>
      </div>
      <form class="form-inline">
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
              <button v-on:click="newPairCancel" class="btn btn-dark" type="button">Cancel</button>
            </div>
          </div>
        </div>
      </form>
    </div>

    <object-pair
      v-for="(key, index) in itemKeys"
      v-bind:key="`${key}_${index}`"
      v-bind:itemObjKey="key"
      v-bind:itemObjValue="itemObject[key]"
      v-on:objectPairUpdated="itemObjectUpdated($event)"
      v-on:deletePair="itemObjectDeletePair($event)">
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
        newValue: "",
        valueType: 'string'
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
          if (this.valueType == 'boolean' && (this.newValue == "true" || this.newValue == "false")) {
            this.newValue = JSON.parse(this.newValue);
          }
          if (this.valueType == 'number' && isFinite(this.newValue)) {
            this.newValue = parseInt(this.newValue);
          }
          this.$emit('itemObjectUpdated',  { obj: this.itemObject, key: this.newKey, value: this.newValue } );
          this.isEditorMode = !this.isEditorMode;
        } else {
          alert("Please set key");
        }
      },
      itemObjectUpdated(event) {
        this.$emit('itemObjectUpdated',  { obj: this.itemObject, key: event.key, value: event.value } );
      },
      itemObjectDeletePair(event) {
        this.$emit('itemObjectDeletePair',  { obj: this.itemObject, key: event.key } );
      },
      newPairCancel() {
        this.newKey = "";
        this.newValue = "";
        this.isEditorMode = !this.isEditorMode
      },
      deleteItemObject() {
        this.$emit('itemObjectDelete');
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

<template>
  <div class="bg-secondary p-2 my-2 rounded">
    <button
      v-show="!isEditorMode"
      v-on:click="isEditorMode = !isEditorMode"
      class="btn btn-dark btn-sm btn-block font-weight-bold my-2">New pair</button>

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
      <form  class="form-inline">
        <div class="w-100 d-flex flex-wrap justify-content-between">
          <div class="input-group my-2 item-obj-w">
            <div class="input-group-prepend">
              <span class="input-group-text font-weight-bold">Key</span>
            </div>
            <input v-model="newObjKey" type="text" class="form-control">
          </div>
          <div class="input-group my-2 item-obj-w">
            <div class="input-group-prepend">
              <span class="input-group-text font-weight-bold">Value</span>
            </div>
            <input v-model="newObjValue" type="text" class="form-control">
            <div class="input-group-append">
              <button v-on:click="addNewPair" class="btn btn-info" type="button">Save</button>
              <button v-on:click="newPairCancel" class="btn btn-dark" type="button">Cancel</button>
            </div>
          </div>
        </div>
      </form>
    </div>

    <object-pair
      v-for="(key, index) in newObjectKeys"
      v-bind:key="`${key}_${index}`"
      v-bind:itemObjKey="key"
      v-bind:itemObjValue="newObject[key]"
      v-on:objectPairUpdated="newObjectUpdated($event)">
    </object-pair>

    <button
      v-show="!isEditorMode"
      v-on:click="addNewObject"
      class="btn btn-dark btn-sm btn-block font-weight-bold my-2">Save object</button>
  </div>
</template>

<script>
  import ObjectPair from './object_pair.vue';

  export default {
    components: {
      objectPair: ObjectPair
    },
    data() {
      return {
        isEditorMode: false,
        newObject: {},
        newObjKey: "",
        newObjValue: "",
        valueType: 'string'
      }
    },
    methods: {
      addNewPair() {
        if (this.newObjKey) {
          if (this.valueType == 'boolean' && (this.newObjValue == "true" || this.newObjValue == "false")) {
            this.newObjValue = JSON.parse(this.newObjValue);
          }
          if (this.valueType == 'number' && isFinite(this.newObjValue)) {
            this.newObjValue = parseInt(this.newObjValue);
          }
          this.$set(this.newObject, this.newObjKey, this.newObjValue);
          this.newObjKey = "";
          this.newObjValue = "";
          this.isEditorMode = !this.isEditorMode
        } else {
          alert("Please set key");
        }
      },
      addNewObject() {
        this.$emit('addNewObject', this.newObject);
        this.newObject = {};
        this.newObjKey = "";
        this.newObjValue = "";
      },
      newObjectUpdated(event) {
        this.newObject[event.key] = event.value;
      },
      newPairCancel() {
        this.newObjKey = "";
        this.newObjValue = "";
        this.isEditorMode = !this.isEditorMode
      }
    },
    computed: {
      newObjectKeys() {
        return Object.keys(this.newObject);
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

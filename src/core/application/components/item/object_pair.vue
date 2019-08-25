<template>
  <div>
    <form v-show="!isEditorMode" class="form-inline">
      <div class="w-100 d-flex flex-wrap justify-content-between">
        <div class="input-group my-2 item-obj-w">
          <div class="input-group-prepend">
            <span class="input-group-text font-weight-bold">Key</span>
          </div>
          <div class="form-control">{{itemObjKey}}</div>
        </div>
        <div class="input-group my-2 item-obj-w">
          <div class="input-group-prepend">
            <span class="input-group-text font-weight-bold">Value</span>
          </div>
          <div class="form-control">{{itemObjValue}}</div>
          <div class="input-group-append">
            <button v-on:click="isEditorMode = !isEditorMode" class="btn btn-info" type="button">Edit</button>
            <button v-on:click="deleteObjectPair" class="btn btn-danger" type="button">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </div>
    </form>

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
            <div class="form-control">{{itemObjKey}}</div>
          </div>
          <div class="input-group my-2 item-obj-w">
            <div class="input-group-prepend">
              <span class="input-group-text font-weight-bold">Value</span>
            </div>
            <input v-model="newValue" type="text" class="form-control">
            <div class="input-group-append">
              <button v-on:click="updateItemObject" class="btn btn-info" type="button">Save</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import '../../../ads/fontawesome.js';

  export default {
    props: [ 'itemObjKey', 'itemObjValue' ],
    data() {
      return {
        isEditorMode: false,
        newValue: this.itemObjValue,
        valueType: 'string'
      }
    },
    methods: {
      updateItemObject() {
        if (this.valueType == 'boolean' && (this.newValue == "true" || this.newValue == "false")) {
          this.newValue = JSON.parse(this.newValue);
        }
        if (this.valueType == 'number' && isFinite(this.newValue)) {
          this.newValue = parseInt(this.newValue);
        }
        if (this.valueType == 'string' && isFinite(this.newValue)) {
          this.newValue = `${this.newValue}`;
        }
        this.$emit('objectPairUpdated', { key: this.itemObjKey, value: this.newValue });
        this.isEditorMode = !this.isEditorMode;
      },
      deleteObjectPair() {
        this.$emit('deletePair', { key: this.itemObjKey });
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

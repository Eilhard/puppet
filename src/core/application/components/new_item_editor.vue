<template>
  <div>
    <button
      v-show="!isEditorMode"
      v-on:click="isEditorMode = !isEditorMode"
      class="btn btn-info btn-sm btn-block font-weight-bold my-2"
      type="submit">
      New item
    </button>
    <div v-show="isEditorMode">
      <div class="input-group my-2">
        <div class="input-group-prepend">
          <span class="input-group-text font-weight-bold">Type</span>
        </div>
        <select class="custom-select" v-model="itemType">
          <option value="string">String</option>
          <option value="number">Number</option>
          <option value="boolean">Boolean</option>
          <option value="object">Object</option>
        </select>
      </div>

      <div v-show="itemType != 'object'" class="input-group my-2">
        <input
          v-model="item"
          class="form-control list-group-item-action">
        <div class="input-group-append">
          <button v-on:click="addNewItem" class="btn btn-outline-info" type="button">Save</button>
          <button v-on:click="isEditorMode = !isEditorMode" class="btn btn-outline-dark" type="button">Cancel</button>
        </div>
      </div>

      <form v-show="itemType == 'object'" class="form-inline">
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
              <button v-on:click="addNewItem" class="btn btn-outline-info" type="button">Save</button>
              <button v-on:click="isEditorMode = !isEditorMode" class="btn btn-outline-dark" type="button">Cancel</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isEditorMode: false,
        item: "",
        itemType: "string",
        newObjKey: "",
        newObjValue: ""
      }
    },
    methods: {
      addNewItem() {
        if (this.itemType == 'object') {
          this.item = {};
          this.item[this.newObjKey] = this.newObjValue;
        }
        this.$emit('addNewItem', this.item);
        this.isEditorMode = !this.isEditorMode;
        this.item = "";
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

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

      <object-constructor
        v-on:addNewObject="addNewObject($event)"
        v-show="itemType == 'object'"></object-constructor>
    </div>
  </div>
</template>

<script>
  import ObjectConstructor from './item/object_constructor.vue';

  export default {
    components: {
      objectConstructor: ObjectConstructor
    },
    data() {
      return {
        isEditorMode: false,
        item: "",
        itemType: "string",
      }
    },
    methods: {
      addNewObject(event) {
        this.item = event;
        this.$emit('addNewItem', this.item);
        this.isEditorMode = !this.isEditorMode;
        this.item = "";
      },
      addNewItem() {
        if (this.itemType == 'boolean' && (this.item == "true" || this.item == "false")) {
          this.item = JSON.parse(this.item);
        }
        if (this.itemType == 'number' && isFinite(this.item)) {
          this.item = parseInt(this.item);
        }
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

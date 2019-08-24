<template>
  <div>
    <button
      v-show="!isEditorMode"
      v-on:click="isEditorMode = !isEditorMode"
      class="btn btn-info btn-sm btn-block font-weight-bold my-2"
      type="submit">
      New item
    </button>
    <div v-show="isEditorMode" class="input-group my-2">
      <input
        v-model="item"
        class="form-control list-group-item-action">
      <div class="input-group-append">
        <button v-on:click="addNewItem" class="btn btn-outline-secondary" type="button">Save</button>
        <button v-on:click="isEditorMode = !isEditorMode" class="btn btn-outline-secondary" type="button">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isEditorMode: false,
        item: "",
      }
    },
    methods: {
      addNewItem() {
        this.$emit('addNewItem', this.item);
        this.isEditorMode = !this.isEditorMode;
        this.item = "";
      }
    }
  }
</script>

<style scoped>
</style>

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
          </div>
        </div>
      </div>
    </form>

    <form v-show="isEditorMode" class="form-inline">
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
</template>

<script>
  export default {
    props: [ 'itemObjKey', 'itemObjValue' ],
    data() {
      return {
        isEditorMode: false,
        newValue: this.itemObjValue
      }
    },
    methods: {
      updateItemObject() {
        this.$emit('objectPairUpdated', { key: this.itemObjKey, value: this.newValue });
        this.isEditorMode = !this.isEditorMode;
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

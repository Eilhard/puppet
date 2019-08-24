<template>
  <div  class="bg-secondary p-2 my-2 rounded">
    <button class="btn btn-dark btn-sm btn-block font-weight-bold my-2">New pair</button>
    <div>

    </div>
    <div v-for="key in itemKeys">
      <div class="input-group my-2">
        <div class="input-group-prepend">
          <span class="input-group-text font-weight-bold">Key</span>
        </div>
        <input :value="key" type="text" class="form-control">
        <input :value="itemObject[key]" type="text" class="form-control">
        <div class="input-group-append">
          <span class="input-group-text font-weight-bold">Value</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemObject: Object
  },
  data() {
    return {
      isEditorMode: false
    }
  },
  computed: {
    itemKeys() {
      return Object.keys(this.itemObject);
    }
  }
}
</script>

<style scoped>
</style>

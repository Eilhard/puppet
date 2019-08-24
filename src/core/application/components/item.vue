<template>
  <div>
    <div v-show="!this.isObject">
      <div v-show="!isEditorMode" class="input-group my-2">
        <div class="form-control">{{this.dataItem}}</div>
        <div class="input-group-append">
          <button v-on:click="isEditorMode = !isEditorMode" class="btn btn-outline-secondary" type="button">Edit</button>
        </div>
      </div>
      <div v-show="isEditorMode" class="input-group my-2">
        <input v-model="newValue" class="form-control" type="text">
        <div class="input-group-append">
          <button v-on:click="updateItem" class="btn btn-outline-secondary" type="button">Save</button>
        </div>
      </div>
    </div>
    <item-object
      v-if="this.isObject"
      v-on:updateItemObject=""
      v-bind:itemObject="this.dataItem">
    </item-object>
  </div>
</template>

<script>
  import ItemObject from './item/item_object.vue';

  export default {
    props: {
      dataItem: {
        default: "item",
      }
    },
    components: {
      itemObject: ItemObject
    },
    data() {
      return {
        newValue: this.dataItem,
        isEditorMode: false,
        itemKeys: null
      }
    },
    computed: {
      isObject() {
        if (typeof this.dataItem === 'object' && this.dataItem.constructor === Object) {
          return true;
        }
        return false;
      }
    },
    methods: {
      updateItem() {
        this.$emit('itemUpdated', {
          basic: this.dataItem,
          updated: this.newValue,
        });
        this.isEditorMode = !this.isEditorMode;
      }
    }
  }
</script>

<style scoped>
</style>

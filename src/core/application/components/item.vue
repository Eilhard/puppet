<template>
  <div>
    <div v-show="!this.isObject">
      <div v-show="!isEditorMode" class="input-group my-2">
        <div class="input-group-prepend">
          <span class="input-group-text text-capitalize">{{typeof this.dataItem}}</span>
        </div>
        <div class="form-control">{{this.dataItem}}</div>
        <div class="input-group-append">
          <button v-on:click="isEditorMode = !isEditorMode" class="btn btn-outline-info" type="button">Edit</button>
          <button v-on:click="deleteItem" class="btn btn-outline-danger" type="button">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
      <div v-show="isEditorMode" class="input-group my-2">
        <div class="input-group-prepend">
          <span class="input-group-text text-capitalize">{{typeof this.dataItem}}</span>
        </div>
        <input v-model="newValue" class="form-control" type="text">
        <div class="input-group-append">
          <button v-on:click="updateItem" class="btn btn-outline-info" type="button">Save</button>
        </div>
      </div>
    </div>
    <item-object
      v-if="this.isObject"
      v-on:itemObjectUpdated="updateItem($event)"
      v-on:itemObjectDeletePair="itemDeletePair($event)"
      v-on:itemObjectDelete="deleteItem()"
      v-bind:itemObject="this.dataItem">
    </item-object>
  </div>
</template>

<script>
  import '../../ads/fontawesome.js';
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
      }
    },
    computed: {
      isNumber() {
        if (typeof this.dataItem === 'number' && isFinite(this.dataItem)) {
          return true;
        }
        return false;
      },
      isBoolean() {
        if (typeof this.dataItem === 'boolean') {
          return true;
        }
        return false;
      },
      isObject() {
        if (typeof this.dataItem === 'object' && this.dataItem.constructor === Object) {
          return true;
        }
        return false;
      }
    },
    methods: {
      updateItem(event = null) {
        /* Additional checks for this.newValue to exclude combined values like "12wed" or "true hero". */
        if (this.isBoolean && (this.newValue == "true" || this.newValue == "false") ) {
          this.newValue = JSON.parse(this.newValue);
        }
        if (this.isNumber && isFinite(this.newValue)) {
          this.newValue = parseInt(this.newValue);
        }
        if (this.isObject && event) {
          this.newValue = event.obj;
          this.newValue[event.key] = event.value;
        }
        this.$emit('itemUpdated', {
          basic: this.dataItem,
          updated: this.newValue,
        });
        this.isEditorMode = !this.isEditorMode;
      },
      deleteItem() {
        this.$emit('itemDeleted', this.dataItem);
      },
      itemDeletePair(event) {
        if (this.isObject && event) {
          this.newValue = event.obj;
          delete this.newValue[event.key];
          let lastKeys = Object.keys(this.newValue);
          if (lastKeys.length > 0) {
            this.$emit('itemUpdated', {
              basic: this.dataItem,
              updated: this.newValue,
            });
          } else {
            this.deleteItem();
          }

        }

      }
    }
  }
</script>

<style scoped>
</style>

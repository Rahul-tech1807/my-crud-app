<template>
  <div class="fixed top-0 left-0 w-full h-full flex justify-center items-center">
    <div class="bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-2xl mb-4">{{ mode === 'add' ? 'Add Item' : 'Edit Item' }}</h2>
      <form @submit.prevent="saveItem">
        <div class="mb-4">
          <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input v-model="item.name" type="text" id="name" name="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div class="mb-4">
          <label for="description" class="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <input v-model="item.description" type="text" id="description" name="description" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div class="flex justify-end">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">{{ mode === 'add' ? 'Add' : 'Update' }}</button>
          <button @click="cancel" class="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">{{ mode === 'add' ? 'Cancel' : 'Cancel Update' }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

import { db } from '../firebase';

export default {
  props: {
    mode: String,
    editItemData: Object,
    editItemKey: String,
  },
  setup(props, { emit }) {
    const item = ref({
      name: '',
      description: '',
    });

    const saveItem = () => {
      if (props.mode === 'add') {
        db.ref('items').push(item.value);
        emit('close');
      } else if (props.mode === 'edit') {
        db.ref('items')
          .child(props.editItemKey)
          .update(item.value)
          .then(() => {
            emit('close');
          })
          .catch((error) => {
            console.error('Error updating item:', error);
          });
      }
    };

    const cancel = () => {
      emit('close');
    };

    onMounted(() => {
        if (props.mode === 'edit' && props.editItemData) {
        item.value = { ...props.editItemData };
        }
    });
    return {
      item,
      saveItem,
      cancel,
    };
  },
};
</script>

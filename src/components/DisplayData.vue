<template>
  <div class="text-center">
    <h2 class="my-4 text-2xl">Data Table</h2>
    <button @click="showAddForm" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
      Add Item
    </button>
    <div>
      <input type="text" v-model="searchQuery" placeholder="Search..." class="p-2 border rounded mt-4 mb-4" />
    </div>
    <div class="mx-auto w-4/5">
      <table class="table-auto w-full border">
        <thead>
          <tr>
            <th class="px-4 py-2 border">Name</th>
            <th class="px-4 py-2 border">Description</th>
            <th class="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, key) in filteredItems" :key="key">
            <td class="border px-4 py-2">{{ item.name }}</td>
            <td class="border px-4 py-2">{{ item.description }}</td>
            <td class="border px-4 py-2">
              <button @click="editItem(item, key)" class="text-blue-500 hover:underline">Edit</button>
              <button @click="confirmDelete(key)" class="text-red-500 hover:underline mx-2">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <AddEditItem :mode="'add'" v-if="showAddFormFlag" @close="hideAddForm" />
    <AddEditItem :mode="'edit'" :editItemData="editItemData" :editItemKey="editItemKey" v-if="showEditFormFlag" @close="hideEditForm" />
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';

import { db } from '../firebase';
import AddEditItem from './AddEditItem.vue';

export default {
  components: {
    AddEditItem,
  },
  props: {
    msg: String,
  },
  setup(props) {
    const showAddFormFlag = ref(false);
    const showEditFormFlag = ref(false);
    const editItemData = ref(null);
    const editItemKey = ref('');
    const searchQuery = ref('');

    const items = ref({});

    const filteredItems = computed(() => {
      if (!searchQuery.value) {
        return items.value;
      }
      const query = searchQuery.value.toLowerCase();
      return Object.fromEntries(
        Object.entries(items.value).filter(([key, item]) =>
          item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query)
        )
      );
    });

    const showAddForm = () => {
      showAddFormFlag.value = true;
    };

    const hideAddForm = () => {
      showAddFormFlag.value = false;
    };

    const hideEditForm = () => {
      showEditFormFlag.value = false;
    };

    const editItem = (item, key) => {
      editItemData.value = item;
      editItemKey.value = key;
      showEditFormFlag.value = true;
    };

    const confirmDelete = (key) => {
      const confirmation = window.confirm('Are you sure you want to delete this item?');
      if (confirmation) {
        db.ref('items')
          .child(key)
          .remove();
      }
    };

    onMounted(() => {
      const itemsRef = db.ref('items');
      itemsRef.on('value', (snapshot) => {
        items.value = snapshot.val();
      });
    });

    return {
      showAddFormFlag,
      showEditFormFlag,
      editItemData,
      editItemKey,
      searchQuery,
      filteredItems,
      showAddForm,
      hideAddForm,
      hideEditForm,
      editItem,
      confirmDelete,
    };
  },
};
</script>

<template>
  <div id="app">
    <DisplayData msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import DisplayData from './components/DisplayData.vue';

export default {
  name: 'App',
  components: {
    DisplayData
  }
};
</script>

<style scoped></style>

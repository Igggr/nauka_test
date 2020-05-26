<template>
  <div id="app">
    {{ this.$store.state }}
    <button @click="upd">update</button>
   <router-view></router-view>
  </div>
</template>

<script>

import EmployeeList from './components/employeeList.vue';

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    upd() {
      console.log("loading...");
      this.$store.dispatch('checkUpdate');
    }

  },
  components: {EmployeeList}
}
</script>

<style scoped>
</style>

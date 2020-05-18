<template>
  <div>
    <Navbar />
    <div class='container'>
      <router-view />
    </div>
  </div>
</template>

<script>

import Navbar from './components/Navbar/Navbar.vue';

import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/materialize-css/dist/js/materialize';

export default {
  name: 'App',
  components: {
    Navbar,
  },
};
</script>

<style lang="scss">

</style>

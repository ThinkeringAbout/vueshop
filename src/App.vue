<template>
  <Navbar />
  <RouterView />
</template>

<script>
import Menu from './components/Menu.vue'
import Navbar from './components/Navbar.vue'
export default {
  components: {
    Menu,
    Navbar
  }
}
</script>

<style></style>

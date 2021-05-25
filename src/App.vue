<template>
  <Tetris  />
</template>

<script>
import Tetris from './components/Tetris.vue'

export default {
  name: 'App',
  components: {
    Tetris
  }
}
</script>

<style>
html {
  background: url("../public/background.jpg") no-repeat;
  background-size: grow;
  background-repeat: repeat;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

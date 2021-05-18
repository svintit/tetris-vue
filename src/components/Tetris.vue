<template>
  <div class="main">
    <div class="title"/>
    <Board />
  </div>
</template>

<script>
import Board from './Board.vue'

export default {
  name: 'Tetris',
  components: { Board },
}
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  overflow: hidden;
}

.title {
  margin-bottom: 30px;
  background: url("../../public/logo.jpg") no-repeat center;
  -webkit-background-size: contain;
  -moz-background-size: contain;
  -o-background-size: contain;
  background-size: contain;

  height: 200px;
  width: 600px;
}
</style>

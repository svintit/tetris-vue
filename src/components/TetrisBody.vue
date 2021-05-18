<template>
  <div class="tetrisBody"></div>
</template>

<script>
export default {
  name: 'TetrisBody',
  props: {
    cellNumber: Number,
    tetrisPosition: Array
  }
}
</script>

<style scoped>
.tetrisBody {
  display: flex;
  min-width: 20px;
  min-height: 20px;
  color: green;
}
</style>

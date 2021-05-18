<template>
  <div
    :class="{
      cell: true,
      emptyCell: cell === 'empty',
      straightShapeCell: cell === 'straightShape',
    }"
  />
</template>

<script>
export default {
  name: 'Cell',
  props: {
    cell: String,
  },
  setup() {
    return {
    }
  }
}
</script>

<style scoped>
.cell {
  width: 25px;
  height: 25px;
  border: 1px solid rgba(39, 113, 197, 0.3);
}

.emptyCell {
  background-color: #000612;
}

.straightShapeCell {
  background-color: #5cf2ed;
}
</style>

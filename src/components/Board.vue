<template>
  <div>
    <div class="container">
      <div class="stats">
        <div class="holdArea">
          <div class="title">HOLD</div>
        </div>
        <div class="levelArea">
          <div class="title">LEVEL</div>
        </div>
      </div>
      <div class="gridBox">
        <div
          v-for="(row, rowIdx) in grid"
          :key="[row, rowIdx]"
          class="row"
        >
          <div
            v-for="(cell, cellIdx) in row"
            :key="[cell, cellIdx]"
          >
            <Cell :cell="cell" />
          </div>
        </div>
      </div>
      <div class="stats">
        <div class="nextArea">
          <div class="title">NEXT</div>
        </div>
        <div class="scoreArea">
          <div class="title">SCORE</div>
        </div>
      </div>
    </div>
    <div
      v-if="true"
      class="gameOver"
    >
      &#128128; Game Over &#128128;
      <button
        @click="restart"
        class="restartButton"
      >
        Restart
      </button>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue'
import Cell from './Cell'

export default {
  name: 'Board',
  components: { Cell },
  setup() {
    const gridHeight = 20
    const gridWidth = 10
    const speed = 200
    const tetrisHead = 0
    const gameOver = ref(false)

    const highScore = ref(0)
    const currentScore = ref(0)

    const grid = ref()
    const setGrid = () => {
      grid.value = [...Array(gridHeight)].map(() => [...Array(gridWidth)].map(() => "empty"))
    }
    setGrid()

    const tetrisShapePosition = ref()
    const setTetrisShapePosition = () => {
      tetrisShapePosition.value = [[0, 5]]
    }
    setTetrisShapePosition()

    watch(tetrisShapePosition, () => {
      for (let i = 0; i < grid.value.length; i++) {
        for (let k = 0; k < grid.value.length; k++) {
          if (grid.value[i][k].includes("Shape")) {
            grid.value[i][k] = "empty"
          }
        }
      }

      tetrisShapePosition.value.forEach(([x, y]) => {
        grid.value[x][y] = "tetris"
      })
    })

    const getRandomShape = () => {
      return ["straightShape", "straightShape", "straightShape", "straightShape"]
    }

    const direction = ref([1, 0])

    const restart = () => {
      setGrid()
      setTetrisShapePosition()
      gameOver.value = false
      currentScore.value = 0
      run(speed)
    }

    const run = (speed) => {
      setTimeout(() => {
        grid[tetrisShapePosition.value] = getRandomShape()
        const [x, y] = tetrisShapePosition.value[tetrisHead]
        const [dx, dy] = direction.value

        const newPosition = [dx + x, y + dy]

        const hitTop = false
        if (hitTop) {
          gameOver.value = true
          return
        }

        const tetrisBody = ref(tetrisShapePosition.value.slice(0, tetrisShapePosition.value.length))
        tetrisShapePosition.value = [newPosition, ...tetrisBody.value]

        run(speed - (tetrisShapePosition.value.length + 1))
      }, speed)
    }

    onMounted(() => {
      run(speed)
    })

    window.addEventListener('keydown', (e) => {
      switch(e.key) {
        case 'ArrowDown':
          direction.value = [1, 0]
          break
        case 'ArrowLeft':
          direction.value = [0, -1]
          break
        case 'ArrowRight':
          direction.value = [0, 1]
          break
        case 'ArrowUp':
          direction.value = [-1, 0]
          break
      }
    })

    return {
      grid,
      restart,
      gameOver,
      highScore,
      currentScore,
    }
  }
}
</script>

<style lang="scss" scoped>
.row {
  display: flex;
}

.container {
  display: flex;
  flex-direction: row;
  min-width: 200px;
}

.holdArea, .nextArea {
  width: 150px;
  height: 120px;
  border-bottom: 2px solid #156ab2;
  background-color: rgba(2,50,126, 0.4);
  margin: 0 20px;
}

.levelArea, .scoreArea {
  @extend .holdArea;
  margin-top: auto;
}

.title {
  height: 20px;
  border-bottom: 2px solid #156ab2;
  color: white;
  font-weight: 900;
  letter-spacing: 3px;
  font-size: 15px;
  line-height: 20px;
  padding-left: 5px;
  background-color: rgba(4,69,136, 0.4);
}

.gridBox {
  width: 270px;
  margin-left: auto;
  margin-right: auto;
  border: 4px solid rgba(39, 113, 197, 0.3);
}

.gameOver {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 40px;
  margin-top: 35px;
  background-color: rgba(2,50,126, 0.2);
  width: 340px;
  padding: 10px;
  border-radius: 20px;
  margin-left: auto;
  margin-right: auto;
}

.restartButton {
  width: 100px;
  height: 50px;
  font-size: 20px;
  background-color: rgba(2,50,126, 0.4);
  border: unset;
  border-radius: 10px;
  color: white;
  box-shadow: none;
  border-bottom: 5px solid #156ab2;
  margin-top: 10px;

  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: rgba(2,50,126, 0.5);
  }
}

.stats {
  display: flex;
  flex-direction: column;
}

</style>

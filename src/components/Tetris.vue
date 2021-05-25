<template>
  <div class="main">
    <div class="logo"/>
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
              <div class="shapeCell" />
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
      <div v-if="!gameOver && !gameStarted" class="startControls">
        <div class="control">
          Press <div class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18 9v4H6V9H4v6h16V9z"/></svg></div> to start &#127918;
        </div>
      </div>
      <div v-if="!gameOver && gameStarted" class="inGameControls">
        <div class="controlTitle">CONTROLS</div>
        <div class="rowContainer">
          <div class="control">
            Rotate shape: <div class="icon"> <svg class="w-6 h-6" data-darkreader-inline-fill="" data-darkreader-inline-stroke="" fill="none" stroke="currentColor" style="--darkreader-inline-fill:none; --darkreader-inline-stroke:currentColor;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg></div>
          </div>
          <div class="control">
            Move shape right: <div class="icon"><svg class="w-6 h-6" data-darkreader-inline-fill="" data-darkreader-inline-stroke="" fill="none" stroke="currentColor" style="--darkreader-inline-fill:none; --darkreader-inline-stroke:currentColor;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></div>
          </div>
        </div>
        <div class="rowContainer">
          <div class="control">
            Place shape faster: <div class="icon"><svg class="w-6 h-6" data-darkreader-inline-fill="" data-darkreader-inline-stroke="" fill="none" stroke="currentColor" style="--darkreader-inline-fill:none; --darkreader-inline-stroke:currentColor;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg></div>
          </div>
          <div class="control">
            Move shape left: <div class="icon"><svg class="w-6 h-6" data-darkreader-inline-fill="" data-darkreader-inline-stroke="" fill="none" stroke="currentColor" style="--darkreader-inline-fill:none; --darkreader-inline-stroke:currentColor;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg></div>
          </div>
        </div>
        <div class="rowContainer">
          <div class="control">
            Place shape: <div class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18 9v4H6V9H4v6h16V9z"/></svg></div>
          </div>
        </div>
      </div>
      <div
        v-if="gameOver"
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
import { ref } from 'vue'
import Cell from './Cell'
import { tetrisShapes } from '../common/shapes.ts'
import _cloneDeep from 'lodash/cloneDeep'

export default {
  name: 'Tetris',
  components: { Cell },
  setup() {
    const gridHeight = 20
    const gridWidth = 10
    const scorePerRow = 10

    const gameOver = ref(false)
    const gameStarted = ref(false)
    const highScore = ref(0)
    const currentScore = ref(0)
    const newShape = ref()
    const newShapePosition = ref(0)
    const gameInterval = ref()
    const animating = ref(false)
    const shapeBeforeRotation = ref()

    const grid = ref()
    const setGrid = () => {
      grid.value = [...Array(gridHeight)].map(() => [...Array(gridWidth)].map(() => "empty"))
    }
    setGrid()

    const getRandomShape = () => {
      return tetrisShapes[Math.floor(Math.random() * 7)];
    }

    const startGame = (fresh = false) => {
      if (!fresh) {
        addNewShape()
      }

      gameInterval.value = setInterval(gameFlowInterval, 1000)
      gameStarted.value = true
    }

    const gameFlowInterval = () => {
      const rowsCount = newShape.value.rowsCount - 1

      if (stopGame(grid.value, newShapePosition.value, rowsCount)) return
    }

    const gameFlow = () => {
      const cGrid = [ ...grid.value ]
      const position = newShapePosition.value
      const rowsCount = newShape.value.rowsCount - 1
      if (stopGame(grid.value, position, rowsCount)) return

      setGrid()

      const grid = [ ...cGrid ]

      for (
        let arRow = position, tRow = rowsCount;
        arRow >= 0 && tRow >= 0;
        arRow--, tRow--
      ) {
        grid[arRow] = mergeRows(
          grid[arRow],
          newShape.value.value[tRow]
        )
      }

      if (!gridCollides(grid)) {
        newShape.value.rotated = false
        shapeBeforeRotation.value = null
        grid.value = grid
        newShapePosition.value++
      }
      else if (newShape.value.rotated) {
        newShape.value = { ...shapeBeforeRotation.value }
        gameFlow()
      }
      else {
        removeActiveShape()
        checkForScore([ ...grid.value ])
        addNewShape()
      }
    }

    const stopGame = (grid, position, rowsCount) => {
      const { starts, expands, value } = newShape.value
      const lastRow = value[value.length - 1]

      let nextRowCollides = false
      for (let cell = starts; cell < starts + expands; cell++) {
        if (position < 3 && grid[position][cell] === 1 && lastRow[cell]) {
          nextRowCollides = true
          break
        }
      }

      if (nextRowCollides && position < rowsCount) {
        gameOver.value = true
        clearInterval(gameInterval.value)
        return true
      }

      if (newShape.value > 8) {
        checkForScore([...grid.value])
        removeActiveShape()
        addNewShape()
        return true
      }
    }

    const removeActiveShape = () => {
      grid.value = grid.value.map(row => {
        return row.map(col => (col === 2 ? 1 : col))
      })
    }

    const mergeRows = (row1, row2) => {
      return row1.map((item, idx) => {
        return (item += row2[idx])
      })
    }

    const addNewShape = () => {
      newShape.value = { ...getRandomShape() }
      newShapePosition.value = 0
    }

    const rowCollides = (row) => {
      return row.some(item => item > 2)
    }

    const restart = () => {
      setGrid()
      gameOver.value = false
      currentScore.value = 0
      startGame()
    }

    const rotateMatrix = (matrix) => {
      if (!newShape.value.isRotatable) return matrix

      const revMatrix = matrix.reverse()
      const newMatrix = []
      const rows = matrix.length

      revMatrix[0].forEach((_, colIdx) => {
        const matrixRow = []
        for (let idx = 0; idx < rows; idx++) {
          matrixRow.push(revMatrix[idx][colIdx])
        }

        newMatrix.push(matrixRow)
      })

      return newMatrix
    }

    const clearMatrix = (matrix) => {
      matrix = clearMatrixHorizontally([ ...matrix ])
      matrix = clearMatrixVertically([ ...matrix ])
      return matrix
    }

    const clearMatrixVertically = (matrix) => {
      if (matrix.every(row => !row[0])) {
        matrix = matrix.map(row => row.slice(1))
      }

      if (matrix.every(row => !row[matrix[0].length - 1])) {
        matrix = matrix.map(row => row.slice(0, -1))
      }

      return matrix
    }

    const clearMatrixHorizontally = (matrix) => {
      if (matrix[0].every(item => !item)) matrix.splice(0, 1)

      if (matrix[matrix.length - 1].every(item => !item))
        matrix.splice(matrix.length - 1, 1)

      return matrix
    }

    const rotateShape = (matrix) => {
      if (!newShape.value.isRotatable) return
      if (shapeBeforeRotation.value) {
        shapeBeforeRotation.value = null
        return
      }
      let starts = newShape.value.starts
      let cMatrix = [ ...matrix ]
      const expands = cMatrix[0].length

      const rotatedShape = []
      if (starts + expands > 9) {
        starts -= starts + expands - 9
      }

      cMatrix = clearMatrix([ ...cMatrix ])

      for (let row = 0; row < cMatrix.length; row++) {
        let newRow = []

        for (let idx = 0; idx <= 6; idx++) {
          if (idx === starts) {
            newRow.push(...cMatrix[row])

            if (cMatrix[row].length < 3) {
              const times = 3 - cMatrix[row].length

              for (let idx = 0; idx < times; idx++) {
                newRow.push(0)
              }
            }
          }
          else {
            newRow.push(0)
          }
        }
        rotatedShape.push(newRow)
      }

      shapeBeforeRotation.value = { ...newShape }
      newShape.value.matrix = matrix
      newShape.value.rotated = true
      newShape.value.starts = starts
      newShape.value.expands = cMatrix[0].length
      newShape.value.value = rotatedShape
      newShape.value.rowsCount = rotatedShape.length
      newShapePosition.value--
      gameFlowInterval()
    }

    window.addEventListener('keydown', (e) => {
      const gameStartedConditions = !gameOver.value && gameStarted.value && animating.value && newShapePosition.value

      switch(e.key) {
        case 'ArrowDown':
          if (gameStartedConditions) gameFlow()
          break
        case 'ArrowLeft':
          if (gameStartedConditions) changeShapePosition(-1)
          break
        case 'ArrowRight':
          if (gameStartedConditions) changeShapePosition(1)
          break
        case 'ArrowUp':
          if (gameStartedConditions) rotateShape(rotateMatrix([
            ...newShape.value.matrix
          ]))
          break
        case ' ':
          if (!gameStartedConditions) startGame()
          break
      }
    })

    const changeShapePosition = (position) => {
      if (!canMoveShape(position)) return

      const newPosition = newShape.value.starts + position
      const shape = [ ...newShape.value.value ]

      const _shape = shape.map(row => {
        if (position < 0) {
          const newRow = row.slice(1)
          newRow.push(0)

          return newRow
        }
        else {
          const newRow = row.slice(0, -1)
          newRow.unshift(0)

          return newRow
        }
      })

      newShape.value.starts = newPosition
      newShape.value.value = _shape
      newShapePosition.value--
      gameFlowInterval()
    }

    const getGridRows = (cursor, tRows) => {
      const rows = []
      for (let i = cursor, j = tRows.length - 1; j >= 0 && i >= 0; i--, j--) {
        rows.push([ ...grid.value[i] ])
      }
      return rows.reverse()
    }

    const shapeHitTop = (rows, direction) => {
      if (direction > 0) return rows.some(row => row[rows[0].length - 1] !== 0)

      return rows.some(row => row[0] !== 0)
    }

    const gridCollides = (grid) => {
      let collides = false
      for (let idx = 0; idx < grid.length; idx++) {
        if (rowCollides(grid[idx])) {
          collides = true
          break
        }
      }

      return collides
    }

    const checkBoundsAndPosition = (direction) => {
      if (shapeHitTop(newShape.value.value, direction)) return false

      return newShapePosition.value !== 0
    }

    const canMoveShape = (direction) => {
      if (!checkBoundsAndPosition(direction)) return false

      const cursor = newShapePosition.value - 1
      const tRows = _cloneDeep(newShape.value.value)
      const aRows = getGridRows(cursor, tRows)

      if (direction > 0) {
        return aRows.every((row, idx) => {
          const ends =
            tRows[idx].length -
            1 -
            tRows[idx]
              .slice()
              .reverse()
              .findidx(row => row !== 0)
          return row[ends + 1] === 0
        })
      }

      return aRows.every((row, idx) => {
        const starts = tRows[idx].findidx(row => row !== 0)
        return row[starts - 1] === 0
      })
    }

    const checkForScore = async (grid) => {
      const idxs = []
      const revGrid = [ ...grid ].reverse()

      revGrid.forEach((row, idx) => {
        if (row.every(item => item >= 1)) {
          currentScore.value += scorePerRow * (idx + 1)
        }
      })

      grid.forEach((row, idx) => {
        if (row.every(item => item >= 1)) idxs.push(idx)
      })

      if (idxs.length) {
        animating.value = true
        await calculateRowAnimation(idxs)
        animating.value = false
      }
    }

    const calculateRowAnimation = (idxs) => {
      return new Promise(resolve => {
        idxs.forEach(async (item, idx) => {
          const rows = document.querySelectorAll('.tetrisRow')
          rows[item].classList.add('toClear')

          await animateRow(rows, item)
          if (idx + 1 >= idxs.length) resolve(true)
        })
      })
    }

    const animateRow = (rows, idx) => {
      return new Promise(resolve => {
        setTimeout(() => {
          rows[idx].classList.remove('toClear')
          grid.value.splice(idx, 1)
          grid.value.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0])

          resolve(true)
        }, 400)
      })
    }

    return {
      grid,
      restart,
      gameOver,
      highScore,
      currentScore,
      gameStarted,
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  overflow: hidden;
}

.logo {
  margin-bottom: 30px;
  background: url("../../public/logo.jpg") no-repeat center;
  -webkit-background-size: contain;
  -moz-background-size: contain;
  -o-background-size: contain;
  background-size: contain;

  height: 200px;
  width: 600px;
}

.row {
  display: flex;
}

.control {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  width: 200px;
}

.icon {
  width: 20px;
  height: 20px;
  margin: 0 10px;

  path {
    fill: white;
  }
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

.controlTitle {
  @extend .title;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 10px;
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
  background-color: rgba(2,50,126, 0.1);
  width: 340px;
  padding: 10px;
  border-radius: 10px;
  margin-left: auto;
  margin-right: auto;
}

.startControls {
  @extend .gameOver;
  font-size: 20px;
  width: 230px;
  font-weight: bold;
}

.rowContainer {
  display: flex;
  flex-direction: row;
}

.inGameControls {
  @extend .startControls;
  font-size: 15px;
  width: 400px;
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

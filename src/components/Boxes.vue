<template>
  <div class="boxes">
    <div v-for="(row, rowIndex) in grid" :key="rowIndex">
      <div v-for="(cell, cellIndex) in row" :key="cellIndex">
        <button
          :disabled="isDisable"
          class="cells"
          :class="{
            disable: isDisable,
          }"
          v-if="!cell.visible"
          @click="revealCell(rowIndex, cellIndex)"
        >
          ?
        </button>
        <span :class="cell.isMatch ? 'numbers' : 'cells'" v-else
          >{{ cell.value }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

interface Cell {
  value: number;
  visible: boolean;
  isMatch: boolean;
}

@Component
export default class MindGameBoard extends Vue {
  private readonly ROW_COUNT = 3;
  private readonly COLUMN_COUNT = 2;

  public grid: Cell[][] = [];
  public isDisable = false;

  public selectedCells: Cell[] = [];

  public created (): void {
    // Create the game grid with random values
    const values = [1, 1, 2, 2, 3, 3]
    for (let i = 0; i < this.ROW_COUNT; i++) {
      const row: Cell[] = []
      for (let j = 0; j < this.COLUMN_COUNT; j++) {
        const randomIndex = Math.floor(Math.random() * values.length)
        row.push({
          value: values.splice(randomIndex, 1)[0],
          visible: false,
          isMatch: false
        })
      }
      this.grid.push(row)
    }
  }

  public revealCell (rowIndex: number, cellIndex: number): void {
    // Ignore clicks on already visible cells or cells that have already been selected
    const cell = this.grid[rowIndex][cellIndex]
    if (cell.visible || this.selectedCells.includes(cell)) {
      return
    }

    // Reveal the selected cell
    cell.visible = true

    // Add the cell to the list of selected cells
    this.selectedCells.push(cell)

    // Check if the selected cells match
    if (this.selectedCells.length === 2) {
      this.isDisable = true
      if (this.selectedCells[0].value === this.selectedCells[1].value) {
        // The selected cells match, reset the list of selected cells
        this.selectedCells.forEach((c) => (c.isMatch = true))
        this.$toast.success('Match!')
        this.isDisable = false
        this.selectedCells = []
      } else {
        // The selected cells do not match, hide the cells and reset the list of selected cells
        setTimeout(() => {
          this.selectedCells.forEach((c) => (c.visible = false))
          this.selectedCells = []
          this.isDisable = false
        }, 1000)
      }
    }
    if (this.grid.every((row) => row.every((cell) => cell.visible))) {
      this.$toast.success('You win!')
      this.resetGame()
    }
  }

  public resetGame (): void {
    setTimeout(() => {
      this.grid.forEach((row) => row.forEach((cell) => (cell.visible = false)))
      this.grid.forEach((row) => row.forEach((cell) => (cell.isMatch = false)))
    }, 1000)
  }
}
</script>
<style>
.boxes {
  display: flex;
  column-gap: 4%;
  justify-content: center;
  align-items: center;
  height: 100vh;
  backface-visibility: hidden;
  width: 100vw;
}
.cells {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 4rem;
  width: 5rem;
  height: 5rem;
  background-color:  #f1f1f1;
  border-radius: 25px;
}
.numbers {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 4rem;
  width: 5rem;
  height: 5rem;
  border-radius: 25px;
  background-color: greenyellow;
}
.disable {
  background-color: red;
  color: white;
}
</style>

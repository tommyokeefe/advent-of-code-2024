import { getInput, getAdjacents } from '../utils'

const data = getInput(__dirname)

const formatInput = input =>
  input
    .trim()
    .split('\n')
    .map(line => line.trim().split('').map(Number))

const getTrailheadScore = (grid, position, unique) => {
  let positions = [position]
  const steps = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  steps.forEach(step => {
    const validSteps = getValidSteps(positions, step, grid)
    if (unique) {
      positions = Array.from(new Set(validSteps.map(JSON.stringify))).map(
        JSON.parse
      )
    } else {
      positions = validSteps
    }
  })
  return positions.length
}

const getValidSteps = (positions, step, grid) => {
  const maxY = grid.length - 1
  const maxX = grid[maxY].length - 1
  let nextPositions = []
  positions.forEach(position => {
    const adjacents = getAdjacents(position)
    const validAdjacents = adjacents.filter(({ x, y }) => {
      if (y >= 0 && x >= 0 && y <= maxY && x <= maxX) {
        return grid[y][x] === step
      }
      return false
    })
    nextPositions = [...new Set([...nextPositions, ...validAdjacents])]
  })
  return nextPositions
}

export function solution1(input) {
  const grid = formatInput(input)
  return grid.reduce((total, line, y) => {
    return line.reduce((workingTotal, block, x) => {
      if (block !== 0) {
        return workingTotal
      }
      return workingTotal + getTrailheadScore(grid, { x, y }, true)
    }, total)
  }, 0)
}

export function solution2(input) {
  const grid = formatInput(input)
  return grid.reduce((total, line, y) => {
    return line.reduce((workingTotal, block, x) => {
      if (block !== 0) {
        return workingTotal
      }
      return workingTotal + getTrailheadScore(grid, { x, y }, false)
    }, total)
  }, 0)
}

// console.log(solution1(data)) // 461
// console.log(solution2(data)) // 875

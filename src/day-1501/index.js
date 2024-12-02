import { getInput } from '../utils/index.js'

const data = getInput(__dirname)

export function solution1(input) {
  const directions = input.trim().split('')
  return directions.reduce((floor, step) => {
    if (step === '(') {
      return floor + 1
    }

    if (step === ')') {
      return floor - 1
    }

    return floor
  },0)
}

export function solution2(input) {
  const directions = input.trim().split('')
  const { position } = directions.reduce((floor, step, index) => {
    if (step === '(') {
      const total = floor.total + 1
      return { ...floor, total }
    }

    if (step === ')') {
      const total = floor.total - 1
      const position = total < 0 && !floor.position ? index + 1 : floor.position
      return { position, total }
    }

    return floor
  }, { total: 0, position: false })

  return position
}

// console.log(solution1(data)) // 232
// console.log(solution2(data)) // 1783

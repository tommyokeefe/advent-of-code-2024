import { getInput } from '../utils'

const data = getInput(__dirname)

const regex = /(turn off|toggle|turn on)\s(\d+),(\d+) through (\d+),(\d+)/

const formatInput = input =>
  input
    .trim()
    .split('\n')
    .map(line => {
      const [_, instruction, y1, x1, y2, x2] = line.match(regex)
      return { instruction, y1, x1, y2, x2 }
    })

const TURN_OFF = 'turn off'
const TURN_ON = 'turn on'
const TOGGLE = 'toggle'

const checkLocation = ({ y1, x1, y2, x2 }, y, x) => {
  return y >= y1 && y <= y2 && x >= x1 && x <= x2
}

const runStep = (step, grid) => {
  const { instruction } = step
  return grid.map((line, y) => {
    return line.map((light, x) => {
      if (!checkLocation(step, y, x)) {
        return light
      }

      switch (instruction) {
        case TURN_OFF:
          return false
        case TURN_ON:
          return true
        case TOGGLE:
          return !light
        default:
          return light
      }
    })
  })
}

const runStep2 = (step, grid) => {
  const { instruction } = step
  return grid.map((line, y) => {
    return line.map((light, x) => {
      if (!checkLocation(step, y, x)) {
        return light
      }

      switch (instruction) {
        case TURN_OFF:
          return light >= 1 ? light - 1 : light
        case TURN_ON:
          return light + 1
        case TOGGLE:
          return light + 2
        default:
          return light
      }
    })
  })
}

export function solution1(input) {
  const lightRow = Array(1000).fill(false)
  const lightGrid = Array(1000).fill(lightRow)
  const steps = formatInput(input)
  const finalGrid = steps.reduce((grid, step) => {
    return runStep(step, grid)
  }, lightGrid)

  return finalGrid.reduce((total, lightRow) => {
    return lightRow.reduce(
      (workingTotal, light) => (light ? workingTotal + 1 : workingTotal),
      total
    )
  }, 0)
}

export function solution2(input) {
  const lightRow = Array(1000).fill(0)
  const lightGrid = Array(1000).fill(lightRow)
  const steps = formatInput(input)
  const finalGrid = steps.reduce((grid, step) => {
    return runStep2(step, grid)
  }, lightGrid)

  return finalGrid.reduce((total, lightRow) => {
    return lightRow.reduce((workingTotal, light) => workingTotal + light, total)
  }, 0)
}

// console.log(solution1(data)) // 400410
// console.log(solution2(data)) //15343601

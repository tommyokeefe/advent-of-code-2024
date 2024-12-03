import { getInput, splitOnWhiteSpace } from '../utils/index.js'

const data = getInput(__dirname)

export function solution1(input) {
  return splitOnWhiteSpace(input).reduce((total, line) => {
    const [length, width, height] = line.split('x').map(Number)
    const top = length * width
    const side = length * height
    const end = width * height
    const smallest = [top, side, end].sort((a, b) => a - b)[0]
    return total + 2 * top + 2 * side + 2 * end + smallest
  }, 0)
}

export function solution2(input) {
  return splitOnWhiteSpace(input).reduce((total, line) => {
    const [length, width, height] = line
      .split('x')
      .map(Number)
      .sort((a, b) => a - b)
    const ribbonToWrap = length * 2 + width * 2
    const ribbonForBow = length * width * height
    return total + ribbonForBow + ribbonToWrap
  }, 0)
}

// console.log(solution1(data)) // 1598415
// console.log(solution2(data)) // 3812909

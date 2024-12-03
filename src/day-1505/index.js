import { getInput } from '../utils'

const data = getInput(__dirname)

const formatInput = input => input.trim().split('\n')

export function solution1(input) {
  const lines = formatInput(input)
  return lines.reduce((total, line) => {
    const vowels = Array.from(line.matchAll(/[aeiou]/g)).length >= 3
    const repeats = !!line.match(/([^])\1+/)
    const noBadStrings = !line.match(/ab|cd|pq|xy/)

    if (vowels && repeats && noBadStrings) {
      return total + 1
    }
    return total
  }, 0)
}

export function solution2(input) {
  const lines = formatInput(input)
  return lines.reduce((total, line) => {
    const repeatingDouble =
      Array.from(line.matchAll(/([^][^]).*\1/g)).length >= 1
    const skipOneDouble = Array.from(line.matchAll(/([^]).\1+/g)).length >= 1

    if (repeatingDouble && skipOneDouble) {
      return total + 1
    }
    return total
  }, 0)
}

// console.log(solution1(data)) // 238
// console.log(solution2(data)) // 69

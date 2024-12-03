import md5 from 'md5'
import { getInput } from '../utils'

const data = 'ckczppom'

const formatInput = input => input.trim().split('\n')

const getLowestHash = (validator, input) => {
  let done = false
  let guess = 1

  while (!done) {
    const result = md5(input + guess)
    if (result.startsWith(validator)) {
      done = true
      break
    }
    guess++
  }
  return guess
}

export function solution1(input) {
  const validator = '00000'
  return getLowestHash(validator, input)
}

export function solution2(input) {
  const validator = '000000'
  return getLowestHash(validator, input)
}

// console.log(solution1(data)) // 117946
// console.log(solution2(data))

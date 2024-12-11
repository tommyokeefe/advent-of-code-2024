import { getInput } from '../utils'

const data = getInput(__dirname)

const formatInput = input => input.trim().split(' ')

const blink = state => {
  const newState = {}
  for (const [key, value] of Object.entries(state)) {
    if (key === '0') {
      newState['1'] = (newState['1'] || 0) + value
      continue
    }

    if (key.length % 2 === 0) {
      const key1 = parseInt(key.slice(0, key.length / 2))
      newState[key1.toString()] = (newState[key1.toString()] || 0) + value
      const key2 = parseInt(key.slice(key.length / 2, key.length))
      newState[key2.toString()] = (newState[key2.toString()] || 0) + value
      continue
    }

    const newKey = parseInt(key) * 2024
    newState[newKey.toString()] = (newState[newKey.toString()] || 0) + value
  }
  return newState
}

const runSimulation = (stones, count, blink) => {
  const initialState = stones.reduce((stoneMap, stone) => {
    return { ...stoneMap, [stone]: 1 }
  }, {})

  let state = initialState

  for (let i = 0; i < count; i++) {
    state = blink(state)
  }

  return Object.values(state).reduce((total, item) => total + item, 0)
}

export function solution1(input) {
  const count = 25
  const stones = formatInput(input)
  return runSimulation(stones, count, blink)
}

export function solution2(input) {
  const count = 75
  const stones = formatInput(input)
  return runSimulation(stones, count, blink)
}

// console.log(solution1(data)) // 199986
// console.log(solution2(data)) // 236804088748754

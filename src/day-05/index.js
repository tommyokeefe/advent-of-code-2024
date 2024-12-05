import { getInput } from '../utils'

const data = getInput(__dirname)

const formatInput = input => {
  const [rawInstructions, rawUpdates] = input.trim().split('\n\n')
  const instructions = rawInstructions
    .trim()
    .split('\n')
    .map(instruction => {
      const [left, right] = instruction.split('|')
      return { left: parseInt(left), right: parseInt(right) }
    })
  const updates = rawUpdates
    .trim()
    .split('\n')
    .map(update => update.split(',').map(Number))
  return [instructions, updates]
}

const createUpdateFilter = (instructions, isGood) => update => {
  let good = isGood
  update.forEach((item, index) => {
    const validInstructions = instructions.filter(
      instruction => instruction.left === item
    )
    validInstructions.forEach(instruction => {
      const rightIndex = update.findIndex(value => value === instruction.right)
      if (rightIndex !== -1 && rightIndex < index) {
        good = !isGood
      }
    })
  })
  return good
}

const sortUpdate = (update, instructions) => {
  return update.toSorted((a, b) => {
    const aRules = instructions
      .filter(instruction => a === instruction.left)
      .map(instruction => instruction.right)
    const bRules = instructions
      .filter(instruction => b === instruction.left)
      .map(instruction => instruction.right)

    if (aRules.includes(b)) {
      return -1
    }

    if (bRules.includes(a)) {
      return 1
    }

    return 0
  })
}

const calculateMiddleReducer = (total, update) => {
  const middleIndex = Math.floor(update.length / 2)
  return update[middleIndex] + total
}

export function solution1(input) {
  const [instructions, updates] = formatInput(input)
  const goodUpdates = updates.filter(createUpdateFilter(instructions, true))
  return goodUpdates.reduce(calculateMiddleReducer, 0)
}

export function solution2(input) {
  const [instructions, updates] = formatInput(input)
  const badUpdates = updates.filter(createUpdateFilter(instructions, false))
  const sortedUpdates = badUpdates.map(update => {
    return sortUpdate(update, instructions)
  })
  return sortedUpdates.reduce(calculateMiddleReducer, 0)
}

// console.log(solution1(data)) // 7074
// console.log(solution2(data)) // 4828

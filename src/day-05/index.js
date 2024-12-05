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
  let changes = false
  let tempUpdate = update
  update.forEach(item => {
    const leftIndex = tempUpdate.findIndex(value => value === item)
    const indexes = instructions
      .filter(instruction => instruction.left === item)
      .map(instruction =>
        tempUpdate.findIndex(value => value === instruction.right)
      )
      .filter(instruction => instruction >= 0)
      .sort()
    const lowestIndex = indexes[0]
    if (leftIndex > lowestIndex) {
      changes = true
      const leftValue = tempUpdate[leftIndex]
      tempUpdate = tempUpdate
        .toSpliced(leftIndex, 1)
        .toSpliced(lowestIndex, 0, leftValue)
    }
  })

  if (changes) {
    return sortUpdate(tempUpdate, instructions)
  }

  return tempUpdate
}

const calculateMiddleReducer = (total, update) => {
  const middleIndex = (update.length - 1) / 2
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
console.log(solution2(data))

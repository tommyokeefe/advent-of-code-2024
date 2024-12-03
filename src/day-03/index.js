import { getInput } from '../utils'

const data = getInput(__dirname)

export function solution1(input) {
  let total = 0
  const validInstructions = input.matchAll(/mul\((\d+),(\d+)\)/g)
  for (const step of validInstructions) {
    const [_, value1, value2] = step
    total = total + value1 * value2
  }
  return total
}

export function solution2(input) {
  const instructions = []
  let shouldDo = true

  const validInstructions = input.matchAll(/mul\((\d+),(\d+)\)/g)
  for (const step of validInstructions) {
    const [_, value1, value2] = step
    instructions.push({ type: 'mul', index: step.index, value1, value2 })
  }

  const doInstructions = input.matchAll(/do\(\)/g)
  for (const step of doInstructions) {
    instructions.push({ type: 'do', index: step.index })
  }

  const doNotInstructions = input.matchAll(/don't\(\)/g)
  for (const step of doNotInstructions) {
    instructions.push({ type: 'dont', index: step.index })
  }

  const sortedInstructions = instructions.toSorted((a, b) => a.index - b.index)
  return sortedInstructions.reduce((total, step) => {
    const { type, value1, value2 } = step
    switch (type) {
      case 'mul':
        if (shouldDo) {
          return total + value1 * value2
        }
        return total
      case 'do':
        shouldDo = true
        return total
      case 'dont':
        shouldDo = false
        return total
    }
  }, 0)
}

// console.log(solution1(data)) // 188116424
// console.log(solution2(data)) // 104245808

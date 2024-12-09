import { getInput } from '../utils'

const data = getInput(__dirname)

const formatInput = input =>
  input
    .trim()
    .split('\n')
    .map(line => {
      const [target, valueString] = line.split(':')
      const ints = valueString.trim().split(' ').map(Number)
      return [parseInt(target), ints]
    })

const getPossibleSolutions = (ints, ops) => {
  const [first, ...rest] = ints
  return rest.reduce(
    (possibleSolutions, int) =>
      possibleSolutions.flatMap(solution =>
        ops.map(op => [...solution, op, int])
      ),
    [[first]]
  )
}

const runSolution = ([int1, operator, int2, ...rest]) => {
  let total

  if (!operator) {
    return int1
  }

  switch (operator) {
    case '+':
      total = int1 + int2
      break
    case '*':
      total = int1 * int2
      break
    case '||':
      total = parseInt(`${int1}${int2}`)
      break
    default:
      throw new Error(`unknown operator! ${operator}`)
  }

  if (rest.length === 0) {
    return total
  }

  return runSolution([total, ...rest])
}

const testCandidate = (candidate, operations) => {
  let result = false
  const [target, ints] = candidate
  const possibleSolutions = getPossibleSolutions(ints, operations, [])

  for (const solution of possibleSolutions) {
    const total = runSolution(solution)

    if (target === total) {
      result = true
      break
    }
  }

  return result
}

export function solution1(input) {
  const operations = ['+', '*']
  const candidates = formatInput(input)
  return candidates.reduce((total, candidate) => {
    const [target] = candidate

    if (testCandidate(candidate, operations)) {
      return total + target
    }

    return total
  }, 0)
}

export function solution2(input) {
  const operations = ['+', '*', '||']
  const candidates = formatInput(input)
  return candidates.reduce((total, candidate) => {
    const [target] = candidate

    if (testCandidate(candidate, operations)) {
      return total + target
    }

    return total
  }, 0)
}

// console.log(solution1(data)) // 1298300076754
// console.log(solution2(data)) // 248427118972289

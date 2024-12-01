import { getInput, sum } from '../utils'

const data = getInput(__dirname)

function formatInput(input) {
  const tuples = input
    .trim()
    .split('\n')
    .map(line => line.split(/\s+/).map(Number))

  const left = []
  const right = []

  for (const [a, b] of tuples) {
    left.push(a)
    right.push(b)
  }

  return [left, right]
}

export function solution1(input) {
  const [left, right] = formatInput(input)

  const sortedLeft = left.toSorted()
  const sortedRight = right.toSorted()

  const distances = []
  for (let i = 0; i < sortedLeft.length; i++) {
    distances.push(Math.abs(sortedLeft[i] - sortedRight[i]))
  }

  return sum(distances)
}

export function solution2(input) {
  const [left, right] = formatInput(input)

  const rightCounts = {}

  for (const num of right) {
    if (rightCounts[num] === undefined) {
      rightCounts[num] = 0
    }

    rightCounts[num]++
  }

  let total = 0
  for (const num of left) {
    const count = rightCounts[num] ?? 0
    total += num * count
  }

  return total
}

// console.log(solution1(data)) // 2164381
// console.log(solution2(data)) // 20719933

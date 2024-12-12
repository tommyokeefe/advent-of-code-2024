import { getInput, getAdjacents } from '../utils'

const data = getInput(__dirname)

const formatInput = input =>
  input
    .trim()
    .split('\n')
    .map(line => line.trim().split(''))

const isSafe = (position, grid) => {
  const maxY = grid.length - 1
  const maxX = grid[maxY].length - 1
  const { x, y } = position
  return y >= 0 && y <= maxY && x >= 0 && x <= maxX
}

const decodeKey = key => {
  const matches = key.match(/x(\d+)y(\d+)/)
  const x = parseInt(matches[1])
  const y = parseInt(matches[2])
  return { x, y }
}

const getRegion = (start, seen, grid) => {
  const plots = []
  const region = [start.key]
  let unchecked = [start.key]
  grid.forEach((line, y) => {
    line.forEach((plot, x) => {
      if (plot === start.plot) {
        plots.push(`x${x}y${y}`)
      }
    })
  })

  while (unchecked.length > 0) {
    const [key, ...rest] = unchecked
    unchecked = rest
    const { x, y } = decodeKey(key)
    const adjacents = getAdjacents({ x, y })
    adjacents.forEach(({ x, y }) => {
      const adjacentKey = `x${x}y${y}`
      if (plots.includes(adjacentKey)) {
        if (!region.includes(adjacentKey)) {
          unchecked.push(adjacentKey)
          region.push(adjacentKey)
        }
      }
    })
  }

  region.forEach(item => seen.add(item))
  return region
}

const getPerimeter = (region, grid) => {
  return region.reduce((total, key) => {
    const { x, y } = decodeKey(key)
    const plot = grid[y][x]
    const positions = getAdjacents({ x, y })
    return positions.reduce((workingTotal, position) => {
      if (isSafe(position, grid)) {
        const newPlot = grid[position.y][position.x]
        return newPlot === plot ? workingTotal : workingTotal + 1
      }
      return workingTotal + 1
    }, total)
  }, 0)
}

const getSides = (region, grid) => {
  const sides = region.reduce((sides, key) => {
    let workingKey
    const { x, y } = decodeKey(key)
    const plot = grid[y][x]
    const positions = getAdjacents({ x, y })
    return positions.reduce((workingSides, position) => {
      const difX = x - position.x
      const difY = y - position.y

      if (isSafe(position, grid)) {
        const newPlot = grid[position.y][position.x]
        if (newPlot === plot) {
          return workingSides
        }
      }

      if (difX === 0) {
        workingKey = `y${difY === -1 ? 'Down' : 'Up'}${position.y}`
        return {
          ...workingSides,
          [workingKey]: workingSides[workingKey]
            ? [...workingSides[workingKey], position.x]
            : [position.x],
        }
      }

      if (difY === 0) {
        workingKey = `x${difX === -1 ? 'Down' : 'Up'}${position.x}`
        return {
          ...workingSides,
          [workingKey]: workingSides[workingKey]
            ? [...workingSides[workingKey], position.y]
            : [position.y],
        }
      }

      return workingSides
    }, sides)
  }, {})

  return Object.values(sides).reduce((count, side) => {
    let workingSides = side.sort((a, b) => parseInt(a) - parseInt(b))
    let currentCount = 1
    while (workingSides.length > 0) {
      const [first, ...rest] = workingSides
      workingSides = rest
      if (!rest[0]) {
        continue
      }

      if (rest[0] > first + 1) {
        currentCount++
      }
    }
    return count + currentCount
  }, 0)
}

const runPlots = (input, getBoundaries) => {
  const seen = new Set()
  const grid = formatInput(input)
  return grid.reduce((total, line, y) => {
    return line.reduce((workingTotal, plot, x) => {
      const key = `x${x}y${y}`

      if (seen.has(key)) {
        return workingTotal
      }

      const start = { key, plot, x, y }
      const region = getRegion(start, seen, grid)
      const area = region.length
      const perimeter = getBoundaries(region, grid)
      return workingTotal + area * perimeter
    }, total)
  }, 0)
}

export function solution1(input) {
  return runPlots(input, getPerimeter)
}

export function solution2(input) {
  return runPlots(input, getSides)
}

// console.log(solution1(data)) // 1431316
// console.log(solution2(data)) // 821428

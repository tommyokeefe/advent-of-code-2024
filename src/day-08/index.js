import { getInput } from '../utils'

const data = getInput(__dirname)

const formatInput = input =>
  input
    .trim()
    .split('\n')
    .map(line => line.trim().split(''))

const createAntennaMap = grid =>
  grid.reduce((map, antennaRow, y) => {
    return antennaRow.reduce((workingMap, antenna, x) => {
      if (antenna === '.') {
        return workingMap
      }

      const position = { y, x }

      if (!workingMap[antenna]) {
        workingMap[antenna] = [position]
        return workingMap
      }

      const antennaArray = workingMap[antenna]
      workingMap[antenna] = [...antennaArray, position]

      return workingMap
    }, map)
  }, {})

const collectAntinodes = (antennaMap, boundaries, repeat = false) =>
  Object.keys(antennaMap).reduce((nodes, antennaType) => {
    let comparisons = []
    let nodeList = []
    const antennaList = antennaMap[antennaType]
    antennaList.forEach(antenna1 => {
      const antenna1Key = `x${antenna1.x}y${antenna1.y}`
      const newNodes = antennaList.reduce((workingNodes, antenna2) => {
        const antenna2Key = `x${antenna2.x}y${antenna2.y}`
        if (antenna1Key === antenna2Key) {
          return workingNodes
        }
        const comparisonKey1 = `${antenna1Key}${antenna2Key}`
        const alreadyTested = comparisons.includes(comparisonKey1)

        if (alreadyTested) {
          return workingNodes
        }

        comparisons = [...comparisons, comparisonKey1]
        const newWorkingNodes = repeat
          ? [...workingNodes, antenna1Key, antenna2Key]
          : workingNodes
        const distance = {
          x: antenna1.x - antenna2.x,
          y: antenna1.y - antenna2.y,
        }
        return evaluatePotentialAntinodes(
          antenna1,
          distance,
          boundaries,
          newWorkingNodes,
          repeat
        )
      }, nodes)

      nodeList = [...new Set([...nodeList, ...newNodes])]
    })

    return nodeList
  }, [])

const evaluatePotentialAntinodes = (
  antenna,
  distance,
  boundary,
  workingNodes,
  repeat = false
) => {
  const { minX, minY, maxX, maxY } = boundary
  const potentialNode = { x: antenna.x + distance.x, y: antenna.y + distance.y }

  if (
    potentialNode.x >= minX &&
    potentialNode.x <= maxX &&
    potentialNode.y >= minY &&
    potentialNode.y <= maxY
  ) {
    const potentialNodeString = `x${potentialNode.x}y${potentialNode.y}`
    const alreadyFound = workingNodes.includes(
      `x${potentialNode.x}y${potentialNode.y}`
    )

    if (alreadyFound) {
      if (repeat) {
        return evaluatePotentialAntinodes(
          potentialNode,
          distance,
          boundary,
          workingNodes,
          true
        )
      }

      return workingNodes
    }

    const newWorkingNodes = [...workingNodes, potentialNodeString]

    if (repeat) {
      return evaluatePotentialAntinodes(
        potentialNode,
        distance,
        boundary,
        newWorkingNodes,
        true
      )
    }

    return newWorkingNodes
  }

  return workingNodes
}

export function solution1(input) {
  const grid = formatInput(input)
  const boundaries = {
    minY: 0,
    minX: 0,
    maxY: grid.length - 1,
    maxX: grid[0].length - 1,
  }
  const antennaMap = createAntennaMap(grid)
  const antinodes = collectAntinodes(antennaMap, boundaries)
  return antinodes.length
}

export function solution2(input) {
  const grid = formatInput(input)
  const boundaries = {
    minY: 0,
    minX: 0,
    maxY: grid.length - 1,
    maxX: grid[0].length - 1,
  }
  const antennaMap = createAntennaMap(grid)
  const antinodes = collectAntinodes(antennaMap, boundaries, true)
  return antinodes.length
}

// console.log(solution1(data)) // 367
// console.log(solution2(data)) // 1285

import { getInput } from '../utils'

const data = getInput(__dirname)

const formatInput = input => input.trim().split('\n')

const isChar = char => input => char === input
const isX = isChar('X')
const isM = isChar('M')
const isA = isChar('A')
const isS = isChar('S')

const left = { x: -1, y: 0 }
const leftUp = { x: -1, y: -1 }
const up = { x: 0, y: -1 }
const rightUp = { x: 1, y: -1 }
const right = { x: 1, y: 0 }
const rightDown = { x: 1, y: 1 }
const down = { x: 0, y: 1 }
const leftDown = { x: -1, y: 1 }

const createGameBoard = lines => {
  const gameBoard = []
  lines.forEach((line, lineIndex) => {
    line
      .trim()
      .split('')
      .forEach((character, charIndex) => {
        gameBoard.push({
          value: character,
          position: { x: charIndex, y: lineIndex },
          key: `x${charIndex}y${lineIndex}`,
        })
      })
  })
  return gameBoard
}

const getNewPosition = (position, direction) => ({
  x: position.x + direction.x,
  y: position.y + direction.y,
})

const createNavigateAndCheckValue =
  gameBoard => (position, direction, valid) => {
    const newPosition = getNewPosition(position, direction)
    const key = `x${newPosition.x}y${newPosition.y}`
    const char = gameBoard.find(character => character.key === key)
    if (!char || !valid(char.value)) {
      return undefined
    }
    return newPosition
  }

const invertDirection = direction => {
  const { x, y } = direction
  return { x: x * -1, y: y * -1 }
}

export function solution1(input) {
  const lines = formatInput(input)
  const gameBoard = createGameBoard(lines)
  const navigateAndCheckValue = createNavigateAndCheckValue(gameBoard)

  const directionList = [
    left,
    leftUp,
    up,
    rightUp,
    right,
    rightDown,
    down,
    leftDown,
  ]

  const result = gameBoard.reduce((total, character) => {
    const { value, position } = character
    if (!isX(value)) {
      return total
    }

    return directionList.reduce((currentTotal, direction) => {
      // check m
      let newPosition = navigateAndCheckValue(position, direction, isM)
      if (!newPosition) {
        return currentTotal
      }

      // check a
      newPosition = navigateAndCheckValue(newPosition, direction, isA)
      if (!newPosition) {
        return currentTotal
      }

      // check s
      newPosition = navigateAndCheckValue(newPosition, direction, isS)
      if (!newPosition) {
        return currentTotal
      }

      return currentTotal + 1
    }, total)
  }, 0)
  return result
}

export function solution2(input) {
  const lines = formatInput(input)
  const gameBoard = createGameBoard(lines)
  const navigateAndCheckValue = createNavigateAndCheckValue(gameBoard)
  const directionList = [leftUp, rightUp, rightDown, leftDown]

  const result = gameBoard.reduce((total, character) => {
    const { value, position } = character
    if (!isA(value)) {
      return total
    }

    const { updatedTotal } = directionList.reduce(
      (result, direction) => {
        let { xMasCount } = result
        const { updatedTotal } = result
        // check m
        let newPosition = navigateAndCheckValue(position, direction, isM)
        if (!newPosition) {
          return result
        }

        const newDirection = invertDirection(direction)

        // check s
        newPosition = navigateAndCheckValue(position, newDirection, isS)
        if (!newPosition) {
          return result
        }

        xMasCount = xMasCount + 1

        if (xMasCount === 2) {
          return { updatedTotal: updatedTotal + 1, xMasCount }
        }

        return { updatedTotal, xMasCount }
      },
      { updatedTotal: total, xMasCount: 0 }
    )

    return updatedTotal
  }, 0)
  return result
}

// console.log(solution1(data)) // 2344
// console.log(solution2(data)) // 1815

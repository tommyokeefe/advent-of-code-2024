import { getInput } from '../utils'

const data = getInput(__dirname)

const UP = '^'
const RIGHT = '>'
const DOWN = 'v'
const LEFT = '<'

const buildGameBoard = input => {
  const board = {}
  input
    .trim()
    .split('\n')
    .forEach((line, y) => {
      line
        .trim()
        .split('')
        .forEach((item, x) => {
          const square = new Map()
          square.set('x', x)
          square.set('y', y)
          square.set('value', item)
          square.set('key', `x${x}y${y}`)
          board[`x${x}y${y}`] = square
        })
    })
  return board
}

const getNextKey = (x, y, currentDirection) => {
  switch (currentDirection) {
    case UP:
      return `x${x}y${y - 1}`
    case RIGHT:
      return `x${x + 1}y${y}`
    case DOWN:
      return `x${x}y${y + 1}`
    case LEFT:
      return `x${x - 1}y${y}`
    default:
      throw Error(
        `Bad Direction! - x: ${x}, y: ${y}, currentDirection: ${currentDirection}`
      )
  }
}

const getNextKeys = (x, y, currentDirection, highIndex) => {
  const keys = []
  switch (currentDirection) {
    case UP:
      for (let i = y; i >= 0; i--) {
        keys.push(`x${x}y${i}`)
      }
      return [keys, currentDirection]
    case RIGHT:
      for (let i = x; i <= highIndex; i++) {
        keys.push(`x${i}y${y}`)
      }
      return [keys, currentDirection]
    case DOWN:
      for (let i = y; i <= highIndex; i++) {
        keys.push(`x${x}y${i}`)
      }
      return [keys, currentDirection]
    case LEFT:
      for (let i = x; i >= 0; i--) {
        keys.push(`x${i}y${y}`)
      }
      return [keys, currentDirection]
    default:
      throw Error(
        `Bad Direction! - x: ${x}, y: ${y}, currentDirection: ${currentDirection}`
      )
  }
}

const turn = guard => {
  switch (guard.get('value')) {
    case UP:
      guard.set('value', RIGHT)
      break
    case RIGHT:
      guard.set('value', DOWN)
      break
    case DOWN:
      guard.set('value', LEFT)
      break
    case LEFT:
      guard.set('value', UP)
      break
    default:
      throw Error('Bad Direction!', guard)
  }
}

const move = (guard, boardMap, status) => {
  let nextKey = getNextKey(guard.get('x'), guard.get('y'), guard.get('value'))
  let newSquare = boardMap[nextKey]

  if (!newSquare) {
    guard.set('value', 'x')
    return { ...status, done: true }
  }

  let newSquareValue = newSquare.get('value')

  while (newSquareValue in ['x', '.']) {
    guard.set('value', 'x')
    nextKey = getNextKey(
      newSquare.get('x'),
      newSquare.get('y'),
      guard.get('value')
    )
    newSquare = boardMap[nextKey]
    if (!newSquare) {
      return { ...status, done: true }
    }
    newSquareValue = newSquare.get('value')
  }

  if (newSquare.get('value') === '#') {
    turn(guard)
    return { ...status, guard }
  }

  newSquare.set('value', guard.get('value'))
  guard.set('value', 'x')
  return { ...status, guard: newSquare }
}

const getNewPosition = (direction, obstacle) => {
  const newPosition = new Map(obstacle)
  newPosition.set('value', direction)
  switch (direction) {
    case UP:
      return newPosition.set('y', obstacle.get('y') + 1)
    case RIGHT:
      return newPosition.set('x', obstacle.get('x') - 1)
    case DOWN:
      return newPosition.set('y', obstacle.get('y') - 1)
    case LEFT:
      return newPosition.set('x', obstacle.get('x') + 1)
  }
}

const findLoops = (guard, board, status, highIndex) => {
  const [keys, direction] = getNextKeys(
    guard.get('x'),
    guard.get('y'),
    guard.get('value'),
    highIndex
  )
  const nextObstacle = keys.find(key => {
    const square = board[key]
    return square.get('value') === '#'
  })

  if (!nextObstacle) {
    return { ...status, done: true }
  }

  guard.set('value', '.')

  const newPosition = getNewPosition(direction, board[nextObstacle])
  const potentialLoops = status.potentialLoops
  const loopKey = `${newPosition.get('key')}${newPosition.get('value')}`
  const loop = potentialLoops.find(item => loopKey === item)

  if (loop) {
    return { ...status, loop: true, done: true }
  }

  turn(newPosition)

  return {
    ...status,
    guard: newPosition,
    potentialLoops: [...potentialLoops, loopKey],
  }
}

export function solution1(input) {
  const board = buildGameBoard(input)
  const boardMap = Object.keys(board).map(key => board[key])
  const guard = boardMap.find(position => position.get('value') === UP)
  let status = { done: false, guard }

  while (!status.done) {
    status = move(status.guard, board, status)
  }

  return boardMap.reduce((total, square) => {
    if (square.get('value') === 'x') {
      return total + 1
    }
    return total
  }, 0)
}

export function solution2(input) {
  let loops = 0
  const board = buildGameBoard(input)
  const boardMap = Object.keys(board).map(key => board[key])
  const highIndex = Math.sqrt(boardMap.length) - 1
  let guard = boardMap.find(position => position.get('value') === UP)
  let status = { done: false, guard }

  while (!status.done) {
    status = move(status.guard, board, status)
  }

  const candidates = boardMap.filter(square => square.get('value') === 'x')
  for (let i = 0; i < candidates.length; i++) {
    const freshBoard = buildGameBoard(input)
    const freshBoardMap = Object.keys(freshBoard).map(key => freshBoard[key])
    const squareCandidateKey = candidates[i].get('key')
    const square = freshBoard[squareCandidateKey]
    guard = freshBoardMap.find(position => position.get('value') === UP)
    let status = {
      done: false,
      loop: false,
      detectLoops: true,
      potentialLoops: [],
      guard,
    }

    if (square.get('value') !== '.') {
      continue
    }

    square.set('value', '#')

    while (!status.done) {
      status = findLoops(status.guard, freshBoard, status, highIndex)
    }

    if (status.loop) {
      loops++
    }
  }
  return loops
}

// console.log(solution1(data)) // 5086
// console.log(solution2(data)) // 1770

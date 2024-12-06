import { getInput } from '../utils'

const data = getInput(__dirname)

const UP = '^'
const RIGHT = '>'
const DOWN = 'v'
const LEFT = '<'

const buildGameBoard = input =>
  input
    .trim()
    .split('\n')
    .reduce((board, line, y) => {
      line
        .trim()
        .split('')
        .forEach((item, x) => {
            const square = new Map()
            square.set('x', x)
            square.set('y', y)
            square.set('value', item)
            square.set('key', `x${x}y${y}`)
            board.push(square)
        })
      return board
    }, [])

const getNextKey = (x, y, currentDirection) => {
    switch (currentDirection) {
        case UP:
            return `x${x}y${y-1}`
        case RIGHT:
            return `x${x+1}y${y}`
        case DOWN:
            return `x${x}y${y+1}`
        case LEFT:
            return `x${x-1}y${y}`
        default:
            throw Error(`Bad Direction! - x: ${x}, y: ${y}, currentDirection: ${currentDirection}`)
    }
}

const turn = (guard) => {
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

const detectLoop = (key, steps) => {
    return steps.filter(step => step === key).length >= 10
}

const move = (guard, board, steps) => {
    if (steps) {
        steps.push(guard.get('key'))
        if (detectLoop(guard.get('key'), steps)) {
            console.log(steps)
            return true
        }
    }

    const nextKey = getNextKey(guard.get('x'), guard.get('y'), guard.get('value'))
    const newSquare = board.find(spot => spot.get('key') === nextKey)

    if (!newSquare) {
        guard.set('value', 'x')
        return
    }

    if (newSquare.get('value') === '#') {
        turn(guard)
        return move(guard, board, steps)
    }

    newSquare.set('value', guard.get('value'))
    guard.set('value', 'x')
    return move(newSquare, board, steps)
}

export function solution1(input) {
  const board = buildGameBoard(input)
  const guard = board.find(position => position.get('value') === UP)
  move(guard, board)
  return board.reduce((total, square) => {
    if (square.get('value') === 'x') {
        return total +1
    }
    return total
  }, 0)
}

export function solution2(input) {
    const startTime = Date.now() / 1000
    console.log('starting run', startTime)
    let loops = 0
    let board = buildGameBoard(input)
    console.log(`total runs needed: ${board.length}`);
    for (let i = 0; i < board.length; i++) {
        console.log('in for loop')
        const freshBoard = buildGameBoard(input)
        const square = freshBoard[i];
        let guard = freshBoard.find(position => position.get('value') === UP)
        let steps = []

        if (square.get('value') !== '.') {
            console.log(`no run for: ${i} - ${Date.now() / 1000 - startTime} seconds elapsed`)
            continue
        }

        console.log(`run for: ${i} - ${Date.now() / 1000 - startTime} seconds elapsed`)
        square.set('value', '#')
        const loop = move(guard, freshBoard, steps)

        if (loop) {
            loops++
        }
    }
    return loops
}

// console.log(solution1(data)) // 5086
console.log(solution2(data))

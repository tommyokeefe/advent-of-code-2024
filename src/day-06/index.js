import { getInput, elapsed } from '../utils'

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
    const repeats = []
    steps.forEach((step, index) => {
        if (step === key) {
            repeats.push(index)
        }
    })

    if (repeats.length >= 3) {
        const startOfLoop1 = repeats[repeats.length -3]
        const endOfLoop1 = repeats[repeats.length -2] - 1
        const loop1 = steps.slice(startOfLoop1, endOfLoop1)
        const startOfLoop2 = repeats[repeats.length -2]
        const endOfLoop2 = repeats[repeats.length -1] - 1
        const loop2 = steps.slice(startOfLoop2, endOfLoop2)

        if (loop1.length <= 0 || loop2.length <= 0) {
            return false
        }

        return JSON.stringify(loop1) === JSON.stringify(loop2)
    }
    return false
}

const move = (guard, board, status, steps) => {
    const stuck = {}
    const key = guard.get('key')

    if (steps && steps[steps.length -1] !== key) {
        stuck[key] = undefined
        steps.push(key)
        if (detectLoop(key, steps)) {
            return { ...status, loop: true, done: true }
        }
    }

    const nextKey = getNextKey(guard.get('x'), guard.get('y'), guard.get('value'))
    const newSquare = board.find(spot => spot.get('key') === nextKey)

    if (!newSquare) {
        guard.set('value', 'x')
        return { ...status, done: true }
    }

    if (newSquare.get('value') === '#') {
        turn(guard)
        return { ...status, guard }
    }

    newSquare.set('value', guard.get('value'))
    guard.set('value', 'x')
    return { ...status, guard: newSquare }
}

export function solution1(input) {
  const board = buildGameBoard(input)
  const guard = board.find(position => position.get('value') === UP)
  let status = { done: false, guard }

  while (!status.done) {
    status = move(status.guard, board, status)
  }

  return board.reduce((total, square) => {
    if (square.get('value') === 'x') {
        return total +1
    }
    return total
  }, 0)
}



export function solution2(input) {
    let loops = 0
    let board = buildGameBoard(input)
    let guard = board.find(position => position.get('value') === UP)
    let status = { done: false, guard }

    while (!status.done) {
      status = move(status.guard, board, status)
    }
    const candidates = board.filter(square => square.get('value') === 'x')
    const timeSeconds = Date.now() / 1000
    console.log(`runs needed: ${candidates.length}`)
    for (let i = 0; i < candidates.length; i++) {
        console.log(`run ${i} - elapsed: ${elapsed(timeSeconds)} seconds`)
        const freshBoard = buildGameBoard(input)
        const squareCandidateKey = candidates[i].get('key');
        const square = freshBoard.find(square => squareCandidateKey === square.get('key'))
        guard = freshBoard.find(position => position.get('value') === UP)
        let steps = []
        let status = { done: false, loop: false, guard }

        if (square.get('value') !== '.') {
            continue
        }
        square.set('value', '#')
        while (!status.done) {
            status = move(status.guard, freshBoard, status, steps)
        }

        if (status.loop) {
            loops++
        }
    }
    return loops
}

// console.log(solution1(data)) // 5086
console.log(solution2(data))

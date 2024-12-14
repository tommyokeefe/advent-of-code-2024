import { getInput } from '../utils'

const data = getInput(__dirname)

const coordsRegex = /X(\+|\=)(\d+).*Y(\+|\=)(\d+)/

const SEED_VALUE = 10000000000000

const formatInput = (input) => input.trim().split('\n\n').map(game => {
    const [buttonA, buttonB, prize] = game.split('\n').map(line => {
        const result = line.match(coordsRegex)
        return { x: parseInt(result[2]), y: parseInt(result[4]) }
    })
    return { buttonA, buttonB, prize }
})

// linear algebra for the win
const doMaths = (a, b) => (a.x * b.y) - (a.y * b.x)

const playGame = (game, seedValue = 0) => {
    const { buttonA, buttonB, prize } = game
    const adjustedPrize = { x: prize.x + seedValue, y: prize.y + seedValue }
    const buttonDiff = doMaths(buttonA, buttonB)
    const prizeDiffA = doMaths(buttonA, adjustedPrize)
    const prizeDiffB = doMaths(buttonB, adjustedPrize)

    if (prizeDiffA % buttonDiff === 0 && prizeDiffB % buttonDiff === 0) {
        const aPresses = Math.abs(prizeDiffB / buttonDiff)
        const bPresses = Math.abs(prizeDiffA / buttonDiff)
        return aPresses * 3 + bPresses
    }

    return 0
}

export function solution1(input) {
    const games = formatInput(input)
    return games.reduce((cost, game) => {
        return cost + playGame(game, 0)
    }, 0)
}

export function solution2(input) {
    const games = formatInput(input)
    return games.reduce((cost, game) => {
        return cost + playGame(game, SEED_VALUE)
    }, 0)
}

// console.log(solution1(data)) // 40069
// console.log(solution2(data)) // 71493195288102

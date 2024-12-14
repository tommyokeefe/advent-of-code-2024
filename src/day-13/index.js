import { getInput } from '../utils'

const data = getInput(__dirname)

const coordsRegex = /X(\+|\=)(\d+).*Y(\+|\=)(\d+)/

const seedValue = 10000000000000

const START = { x: 0, y: 0 }

const formatInput = (input) => input.trim().split('\n\n').map(game => {
    const [buttonA, buttonB, prize] = game.split('\n').map(line => {
        const result = line.match(coordsRegex)
        return { x: parseInt(result[2]), y: parseInt(result[4]) }
    })
    return { buttonA, buttonB, prize }
})

const getMaxForButton = (button, prize) => {
    let current = START
    let max = 0

    while (current.x <= prize.x && current.y <= prize.y) {
        current = { x: current.x + button.x, y: current.y + button.y }
        max++
    }

    return max -1
}

const getMaxes = (game) => {
    const { buttonA, buttonB, prize } = game
    const maxA = getMaxForButton(buttonA, prize)
    let maxB = getMaxForButton(buttonB, prize)
    return { maxA, maxB }
}

const calculateScore = (matches) => {
    if (matches.length < 1) {
        return 0
    }

    return matches.map(({ a, b }) => a * 3 + b).sort()[0]
}

const playGame = (game) => {
    let matches = []
    const { buttonA, buttonB, prize } = game
    const { maxA, maxB } = getMaxes(game)

    for (let a = maxA; a >= 0; a--) {
        let b = 0
        let currentGuess = START
        while (currentGuess.x <= prize.x && currentGuess.y <= prize.y) {
            currentGuess = { x: buttonA.x * a + buttonB.x * b, y: buttonA.y * a + buttonB.y * b }
            if (currentGuess.x === prize.x && currentGuess.y === prize.y) {
                matches.push({ a, b })
            }
            b++
        }
    }

    return calculateScore(matches)
}

export function solution1(input) {
    const games = formatInput(input)
    return games.reduce((cost, game) => {
        return cost + playGame(game)
    }, 0)
}

export function solution2(input) {

}

// console.log(solution1(data)) // 40069

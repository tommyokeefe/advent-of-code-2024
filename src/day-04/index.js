import { getInput } from '../utils'

const data = getInput(__dirname)

const formatInput = input => input.trim().split('\n')

const isChar = (char) => (input) => char === input
const isX = isChar('X')
const isM = isChar('M')
const isA = isChar('A')
const isS = isChar('S')

const directionList = [
    { x: -1, y: 0 },
    { x: -1, y: -1 },
    { x: 0, y: -1 },
    { x: 1, y: -1 },
    { x: 1, y: 0 },
    { x:1, y: 1 },
    { x: 0, y: 1 },
    { x: -1, y: 1 }
]

const createGameBoard = (lines) => {
    const gameBoard = []
    lines.forEach((line, lineIndex) => {
        line.trim().split('').forEach((character, charIndex) => {
            gameBoard.push({
                value: character,
                position: { x: charIndex, y: lineIndex },
                key: `${charIndex}${lineIndex}`
            })
        })
    })
    return gameBoard
}

const getNewPosition = (position, direction) => ({
    x: position.x + direction.x,
    y: position.y + direction.y,
})

const createNavigateAndCheckValue = (gameBoard) => (position, direction, valid) => {
    const newPosition = getNewPosition(position, direction)
    const key = `${newPosition.x}${newPosition.y}`
    const char = gameBoard.find(character => character.key === key)

    if (!char || !valid(char.value)) {
        return undefined
    }
    return newPosition
}

export function solution1(input) {
    const lines = formatInput(input)
    const gameBoard = createGameBoard(lines)
    const navigateAndCheckValue = createNavigateAndCheckValue(gameBoard)

    const result = gameBoard.reduce((total, character) => {
        const { value, position } = character
        if (!isX(value)) {
            return total
        }

        return directionList.reduce((currentTotal, direction) => {
            // check m
            let newPosition = navigateAndCheckValue(position, direction, isM);
            if (!newPosition) {
                return currentTotal
            }

            // check a
            newPosition = navigateAndCheckValue(newPosition, direction, isA);
            if (!newPosition) {
                return currentTotal
            }

            // check s
            newPosition = navigateAndCheckValue(newPosition, direction, isS);
            if (!newPosition) {
                return currentTotal
            }

            return currentTotal + 1
        }, total)
    }, 0)
    return result
}

export function solution2(input) {}

console.log(solution3(data)) // 2196 (wrong)

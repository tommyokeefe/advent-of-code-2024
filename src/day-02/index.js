import { getInput, splitOnWhiteSpace } from '../utils'

const data = getInput(__dirname)

const formatInput = input => input.trim().split('\n')

const ASCENDING = 'asc'
const DESCENDING = 'desc'

export function solution1(input) {
    const reports = formatInput(input)
    const total = reports.reduce((safeReports, currentReport) => {
        let direction
        const levels = splitOnWhiteSpace(currentReport).map(item => parseInt(item))
        const first = levels[0]
        const second = levels[1]

        if (first === second) {
            return safeReports
        }

        direction = first < second ? ASCENDING : DESCENDING

        const isSafe = levels.reduce((safe, currentLevel, index, levelsArray) => {
            if (!safe) {
                levelsArray.splice(1); // break out of the reducer
                return safe
            }

            if (index + 1 === levelsArray.length) {
                return safe
            }

            const nextLevel = levelsArray[index + 1]

            if (direction === ASCENDING) {
                return (currentLevel < nextLevel && currentLevel >= nextLevel - 3)
            }

            return (currentLevel > nextLevel && currentLevel <= nextLevel + 3)
        }, true)

        if (isSafe) {
            return safeReports + 1
        }

        return safeReports
    }, 0)

    return total
}

export function solution2(input) {}

// console.log(solution1(data)); // 631
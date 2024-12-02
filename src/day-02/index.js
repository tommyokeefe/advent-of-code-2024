import { getInput, splitOnWhiteSpace } from '../utils'

const data = getInput(__dirname)

const formatInput = input => input.trim().split('\n')

const ASCENDING = 'asc'
const DESCENDING = 'desc'

const getSafetyReducer =
  direction => (safe, currentLevel, index, levelsArray) => {
    // once a report is deemed unsafe we can skip processing in the reducer
    if (!safe) {
      return safe
    }

    // once we reach the end of the array we can return the value of safe
    if (index + 1 === levelsArray.length) {
      return safe
    }

    const nextLevel = levelsArray[index + 1]

    // validate the rules
    if (direction === ASCENDING) {
      return currentLevel < nextLevel && currentLevel >= nextLevel - 3
    }

    return currentLevel > nextLevel && currentLevel <= nextLevel + 3
  }

export function solution1(input) {
  const reports = formatInput(input)

  // use a reducer to count up the total amount of valid reports
  const total = reports.reduce((safeReports, currentReport) => {
    const levels = splitOnWhiteSpace(currentReport).map(item => parseInt(item))
    const first = levels[0]
    const second = levels[1]

    // catch the equality condition at the beginning
    if (first === second) {
      return safeReports
    }

    const direction = first < second ? ASCENDING : DESCENDING

    // use the safety reducer to check report safety
    const isSafe = levels.reduce(getSafetyReducer(direction), true)

    if (isSafe) {
      return safeReports + 1
    }

    return safeReports
  }, 0)

  return total
}

export function solution2(input) {
  const reports = formatInput(input)

  // use a reducer to count up the safe reports
  const total = reports.reduce((safeReports, currentReport) => {
    const levels = splitOnWhiteSpace(currentReport).map(item => parseInt(item))
    let currentLevels = levels
    let currentIndex = 0
    let first
    let second
    let isSafe = false

    // while loop to control removing one bad level at a time
    while (currentIndex <= levels.length && !isSafe) {
      first = currentLevels[0]
      second = currentLevels[1]

      if (first !== second) {
        const direction = first < second ? ASCENDING : DESCENDING

        // use the safetyReducer to check report safety
        isSafe = currentLevels.reduce(getSafetyReducer(direction), true)

        // if we get a safe report we break
        if (isSafe) {
          break
        }
      }

      if (currentIndex === 0) {
        currentLevels = levels.slice(currentIndex + 1)
      } else {
        currentLevels = levels
          .slice(0, currentIndex)
          .concat(levels.slice(currentIndex + 1))
      }
      currentIndex++
    }

    if (isSafe) {
      return safeReports + 1
    }
    return safeReports
  }, 0)

  return total
}

// console.log(solution1(data)); // 631
// console.log(solution2(data)); // 665

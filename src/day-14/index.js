import { getInput, getAdjacents } from '../utils'

const data = getInput(__dirname)

const minY = 0
const minX = 0
const maxY = 102
const maxX = 100

const isQuadrantOne = ({ position }) => {
    if (
        position.x >= minX &&
        position.x <= maxX / 2 - 1 &&
        position.y >= minY &&
        position.y <= maxY / 2 - 1
    ) {
        return true
    }
    return false
}

const isQuadrantTwo = ({ position }) => {
    if (
        position.x >= maxX / 2 + 1 &&
        position.x <= maxX &&
        position.y >= minY &&
        position.y <= maxY / 2 - 1
    ) {
        return true
    }
    return false
}

const isQuadrantThree = ({ position }) => {
    if (
        position.x >= minX &&
        position.x <= maxX / 2 - 1 &&
        position.y >= maxY / 2 + 1 &&
        position.y <= maxY
    ) {
        return true
    }
    return false
}

const isQuadrantFour = ({ position }) => {
    if (
        position.x >= maxX / 2 + 1 &&
        position.x <= maxX &&
        position.y >= maxY / 2 + 1 &&
        position.y <= maxY
    ) {
        return true
    }
    return false
}

const formatInput = input => input.trim().split('\n').map(line => {
    const result = line.match(/p=(\-?\d+),(\-?\d+) v=(\-?\d+),(\-?\d+)/)
    return {
        position: { x: parseInt(result[1]), y: parseInt(result[2]) },
        velocity: { x: parseInt(result[3]), y: parseInt(result[4]) }
    }
})

const moveRobot = ({ position, velocity }) => {
     let newX = position.x + velocity.x
     let newY = position.y + velocity.y

     if (newX > maxX) {
        newX = minX + (newX - maxX - 1)
     }

     if (newX < minX) {
        newX = maxX + newX + 1
     }

     if (newY > maxY) {
        newY = minY + (newY - maxY - 1)
     }

     if (newY < minY) {
        newY = maxY + newY + 1
     }

     return {
        position: { x: newX, y: newY },
        velocity,
    }
}

const drawGridWithRobots = (robots) => {
    const grid = []
    for (let i = 0; i <= maxY; i++) {
        grid.push(Array(maxX + 1).fill('.'))
    }

    robots.forEach(({ position }) => {
        const { x, y } = position
        const currentValue = grid[y][x]
        if (currentValue !== '.') {
            grid[y][x] = currentValue + 1
        } else {
            grid[y][x] = 1
        }
    })

    grid.forEach((line) => {
        console.log(line.join(''))
    })
}

export function solution1(input) {
    let robots = formatInput(input)

    for (let i = 0; i < 500; i++) {
        robots = robots.map(robot => {
            return moveRobot(robot)
        })
        console.log(`\n
drawing grid for run #${i + 1}
\n`)
        drawGridWithRobots(robots)
    }

    const quadrants = robots.reduce((quadrants, robot) => {
        if (isQuadrantOne(robot)) {
            return { ...quadrants, one: quadrants.one + 1}
        }

        if (isQuadrantTwo(robot)) {
            return { ...quadrants, two: quadrants.two + 1}
        }

        if (isQuadrantThree(robot)) {
            return { ...quadrants, three: quadrants.three + 1}
        }

        if (isQuadrantFour(robot)) {
            return { ...quadrants, four: quadrants.four + 1}
        }
        return quadrants
    }, { one: 0, two: 0, three: 0, four: 0 })

    drawGridWithRobots(robots)

    return quadrants.one * quadrants.two * quadrants.three * quadrants.four
}

const checkRobotsForPattern = (robots) => {
    let longestConsecutive = 0

    robots.forEach(({ position }) => {
        const consecutiveRobots = [position]
        let newPosition = { ...position, y: position.y + 1 }
        let matches = robots.filter((robot) => robot.position.x === newPosition.x && robot.position.y === newPosition.y)

        while (matches.length > 0) {
            consecutiveRobots.push(newPosition)
            newPosition = { ...position, y: newPosition.y + 1 }
            matches = robots.filter(({ position }) => position.x === newPosition.x && position.y === newPosition.y)
        }

        if (consecutiveRobots.length > longestConsecutive) {
            longestConsecutive = consecutiveRobots.length
        }
    })

    return longestConsecutive > 10
}

export function solution2(input) {
    let runs = 0
    let robots = formatInput(input)
    let patternFound = false
    while (!patternFound) {
        robots = robots.map(robot => {
            return moveRobot(robot)
        })
        patternFound = checkRobotsForPattern(robots)
        runs++
        console.log(`runs: ${runs}`)
    }
    drawGridWithRobots(robots)
}

// console.log(solution1(data)) // 224357412
// console.log(solution2(data)) // 7083

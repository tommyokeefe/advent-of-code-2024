import { getInput } from '../utils'

const data = getInput(__dirname)

const formatInput = input => input.trim().split('\n')

export function solution1(input) {
    let total = 0;
    const validInstructions = input.matchAll(/mul\((\d+),(\d+)\)/g)
    for (const step of validInstructions) {
        const [_, value1, value2] = step
        total = total + value1 * value2
    }
    return total
}

export function solution2(input) {}

// console.log(solution1(data)) // 188116424

import { solution1, solution2 } from './'

const input = `turn on 0,0 through 999,999
toggle 0,0 through 999,0
turn off 499,499 through 500,500`

test('solution1', () => {
  expect(solution1(input)).toEqual(998996)
})

test('solution2', () => {
  expect(solution2(input)).toEqual(1001996)
})

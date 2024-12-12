import { solution1, solution2 } from './'

const input = `125 17`

test('solution1', () => {
  expect(solution1(input)).toEqual(55312)
})

test('solution2', () => {
  expect(solution2(input)).toEqual(65601038650482)
})

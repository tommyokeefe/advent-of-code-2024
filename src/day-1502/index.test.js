import { solution1, solution2 } from './'

const input = `2x3x4
1x1x10`

test('solution1', () => {
  const solution = solution1(input)
  expect(solution).toEqual(101)
})

test('solution2', () => {
  const solution = solution2(input)
  expect(solution).toEqual(48)
})

import { solution1, solution2 } from './'

const input = `()())`

test('solution1', () => {
  const solution = solution1(input)
  expect(solution).toEqual(-1)
})

test('solution2', () => {
  const solution = solution2(input)
  expect(solution).toEqual(5)
})

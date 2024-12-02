import { solution1, solution2 } from './'

const input = `^v^v^v^v^v`

test('solution1', () => {
  expect(solution1(input)).toEqual(2)
})

test('solution2', () => {
  expect(solution2(input)).toEqual(11)
})

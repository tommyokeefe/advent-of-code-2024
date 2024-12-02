import { solution1, solution2 } from './'

const input = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`

test('solution1', () => {
  expect(solution1(input)).toEqual(2)
})

test('solution2', () => {
  expect(solution2(input)).toEqual()
})

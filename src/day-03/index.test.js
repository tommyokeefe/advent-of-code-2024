import { solution1, solution2 } from './'

const input = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`

test('solution1', () => {
  expect(solution1(input)).toEqual(161)
})

test('solution2', () => {
  expect(solution2(input)).toEqual(48)
})

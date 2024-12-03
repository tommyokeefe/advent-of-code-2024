import { solution1, solution2 } from './'

const input = `abcdef`

test('solution1', () => {
  expect(solution1(input)).toEqual(609043)
})

test('solution2', () => {
  expect(solution2(input)).toEqual(6742839)
})

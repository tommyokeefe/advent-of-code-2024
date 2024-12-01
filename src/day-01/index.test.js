import { solution1, solution2 } from './'

const input = `
3   4
4   3
2   5
1   3
3   9
3   3
`

test('solution1', () => {
  const solution = solution1(input)
  expect(solution).toEqual(11)
  console.log(`The solution is: ${solution}`)
})


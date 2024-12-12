import { solution1, solution2 } from './'

const input = `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`

test('solution1', () => {
  expect(solution1(input)).toEqual(1930)
})

test('solution2', () => {
  expect(solution2(input)).toEqual(1206)
})

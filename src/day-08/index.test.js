import { solution1, solution2 } from './'

const input = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`

test('solution1', () => {
  expect(solution1(input)).toEqual(14)
})

test('solution2', () => {
  expect(solution2(input)).toEqual(34)
})

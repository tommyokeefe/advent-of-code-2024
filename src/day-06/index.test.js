import { solution1, solution2 } from './'

const input = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`

test('solution1', () => {
  expect(solution1(input)).toEqual(41)
})

test('solution2', () => {
  expect(solution2(input)).toEqual(6)
})

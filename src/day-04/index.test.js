import { expect } from 'vitest'
import { solution1, solution2 } from './'

const input = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`

const inputAlt = `MMMMMMMMMM
MSMMSMMSMM
MMAMAMAMMM
MMMMMMMMMM
MSAMXMASMM
MMMMMMMMMM
MMAMAMAMMM
MSMMSMMSMM
MMMMMMSAMX`

test('solution1', () => {
  expect(solution1(input)).toEqual(18) //2344

  expect(solution1(inputAlt)).toEqual(9)
})

test('solution2', () => {
  expect(solution2(input)).toEqual()
})

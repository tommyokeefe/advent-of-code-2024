import { solution1, solution2 } from './'

const input = `ugknbfddgicrmopn
aaa
jchzalrnumimnmhp
haegwjzuvuyypxyu
dvszwmarrgswjxmb`

const input2 = `qjhvhtzxzqqjkmpb
xxyxx
uurcxstgmygtbstg
ieodomkazucvgmuy`

test('solution1', () => {
  expect(solution1(input)).toEqual(2)
})

test('solution2', () => {
  expect(solution2(input2)).toEqual(2)
})

import { getInput, splitOnNewLine, splitOnWhiteSpace } from '../utils/index.js'

const data = getInput(__dirname);

const formatData = (data) => {
  const listOne = []
  const listTwo = []
  const dataArray = splitOnNewLine(data)
  dataArray.forEach(item => {
    const [itemOne, itemTwo] = splitOnWhiteSpace(item)
    listOne.push(itemOne)
    listTwo.push(itemTwo)
  });
  return [listOne, listTwo]
};

export function solution1(input) {
  const [listOne, listTwo] = formatData(input)

  // sort lists ascending
  const sortedOne = listOne.sort()
  const sortedTwo = listTwo.sort()

  return sortedOne.reduce((total, firstItem, index) => {
    const secondItem = sortedTwo[index];
    if (firstItem === secondItem) {
      return total
    }

    if (firstItem > secondItem) {
      return total + (firstItem - secondItem)
    }

    return total + (secondItem - firstItem)
  }, 0)
}

export function solution2() {}

const solution = solution1(data);
console.log(solution);
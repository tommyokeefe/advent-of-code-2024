import { getInput, splitOnNewLine, splitOnWhiteSpace } from '../utils/index.js'

const data = getInput(__dirname)

const formatData = data => {
  const listOne = []
  const listTwo = []
  const dataArray = splitOnNewLine(data)
  dataArray.forEach(item => {
    const [itemOne, itemTwo] = splitOnWhiteSpace(item)
    listOne.push(itemOne)
    listTwo.push(itemTwo)
  })
  return [listOne, listTwo]
}

export function solution1(input) {
  const [listOne, listTwo] = formatData(input)

  // sort lists ascending
  const sortedOne = listOne.sort()
  const sortedTwo = listTwo.sort()

  // reduce to get the total
  return sortedOne.reduce((total, firstItem, index) => {
    const secondItem = sortedTwo[index]

    // equality means no change
    if (firstItem === secondItem) {
      return total
    }

    // subtract the second if first is bigger
    if (firstItem > secondItem) {
      return total + (firstItem - secondItem)
    }

    // subtract the first if second is bigger
    return total + (secondItem - firstItem)
  }, 0)
}

export function solution2(input) {
  const [listOne, listTwo] = formatData(input)

  // reduce to get the total
  return listOne.reduce((total, firstItem) => {
    const multiplier = listTwo.filter(item => item === firstItem).length

    // only change the total if the multiplier is greater than 0
    if (multiplier > 0) {
      return total + firstItem * multiplier
    }

    return total
  }, 0)
}

// console.log(solution1(data)); // 1941353
// console.log(solution2(data)); // 22539317

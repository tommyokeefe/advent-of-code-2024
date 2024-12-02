import { getInput } from '../utils'

const data = getInput(__dirname)

const formatInput = input => input.trim().split('')

const NORTH = '^'
const SOUTH = 'v'
const EAST = '>'
const WEST = '<'

const travelToNextLocation = (currentLocation, nextStep) => {
  switch (nextStep) {
    case NORTH:
      return { ...currentLocation, x: currentLocation.x + 1 }
    case SOUTH:
      return { ...currentLocation, x: currentLocation.x - 1 }
    case EAST:
      return { ...currentLocation, y: currentLocation.y + 1 }
    case WEST:
      return { ...currentLocation, y: currentLocation.y - 1 }
  }
}

const addLocationIfNew = (locations, newLocation) => {
  const locationKnown = locations.find(location => {
    if (location.y === newLocation.y && location.x === newLocation.x) {
      return true
    }
    return false
  })

  if (!locationKnown) {
    return [...locations, newLocation]
  }

  return locations
}

export function solution1(input) {
  const startingLocation = { x: 0, y: 0 }
  let currentLocation = startingLocation
  const steps = formatInput(input)
  const locations = steps.reduce(
    (locations, step) => {
      currentLocation = travelToNextLocation(currentLocation, step)
      return addLocationIfNew(locations, currentLocation)
    },
    [startingLocation]
  )
  return locations.length
}

export function solution2(input) {
  const startingLocation = { x: 0, y: 0 }
  let realSantaLocation = startingLocation
  let roboSantaLocation = startingLocation
  let isRealSantaTurn = true
  const steps = formatInput(input)
  const locations = steps.reduce(
    (locations, step) => {
      if (isRealSantaTurn) {
        isRealSantaTurn = !isRealSantaTurn
        realSantaLocation = travelToNextLocation(realSantaLocation, step)
        return addLocationIfNew(locations, realSantaLocation)
      }
      isRealSantaTurn = !isRealSantaTurn
      roboSantaLocation = travelToNextLocation(roboSantaLocation, step)
      return addLocationIfNew(locations, roboSantaLocation)
    },
    [startingLocation]
  )
  return locations.length
}

// console.log(solution1(data)) // 2565
// console.log(solution2(data)) // 2639

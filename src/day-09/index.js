import { getInput } from '../utils'

const data = getInput(__dirname)

const SPACE = 'space'
const FILE = 'file'

const formatInput = input => input.trim().split('').map((entry, index) => {
    if (index % 2 > 0) {
        return { type: SPACE, count: parseInt(entry) }
    }
    return { type: FILE, count: parseInt(entry), index: index / 2 }
})

const getDiskBlocks = (map) => {
    return map.reduce((blocks, entry) => {
        switch (entry.type) {
            case FILE:
                return [ ...blocks, ...Array(entry.count).fill(entry.index)]
            case SPACE:
                return [ ...blocks, ...Array(entry.count).fill('.')]
            default:
                return blocks
        }
    }, [])
}

const defrag = (diskBlocks) => {
    let test = false
    const totalFreeSpace = diskBlocks.filter(block => block === '.').length

    while (!test) {
        diskBlocks.reverse()
        const firstUsedSpace = diskBlocks.findIndex(block => block !== '.')
        const newValue = diskBlocks[firstUsedSpace]
        diskBlocks[firstUsedSpace] = '.'
        diskBlocks.reverse()
        const firstUnusedSpace = diskBlocks.findIndex(block => block === '.')
        diskBlocks[firstUnusedSpace] = newValue
        const currentEndFreeSpace = getCurrentEndFreeSpace(diskBlocks)
        test = currentEndFreeSpace > totalFreeSpace - 1
    }

    return diskBlocks
}

const getCurrentEndFreeSpace = (blocks) => {
    const { count } = [ ...blocks ].reverse().reduce((acc, block) => {
        if (acc.foundUsed) {
            return acc
        }

        if (block === '.') {
            return { ...acc, count: acc.count + 1 }
        }

        return { ...acc, foundUsed: true }
    }, { count: 0, foundUsed: false })
    return count
}

export function solution1(input) {
    const diskMap = formatInput(input);
    const diskBlocks = getDiskBlocks(diskMap)
    const defraggedBlocks = defrag(diskBlocks)
    const usedBlocks = defraggedBlocks.filter(block => block !== '.')
    return usedBlocks.reduce((total, block, index) => total + (index * block), 0)
}

const defragFiles = map => {
    let workingMap = map
    const startingIndex = [...workingMap].reverse().find(item => item.type === FILE).index

    for (let x = startingIndex; x > 0; x--) {
        const fileIndex = workingMap.findIndex(item => item.type === FILE && item.index === x)
        const file = workingMap[fileIndex]
        const spaceIndex = workingMap.findIndex(item => item.type === SPACE && item.count >= file.count)
        if (spaceIndex < 0 || spaceIndex > fileIndex) {
            continue;
        }
        const space = workingMap[spaceIndex]
        const firstPart = workingMap.slice(0, spaceIndex)
        const secondPart = workingMap.slice(spaceIndex + 1, fileIndex)
        const lastPart = workingMap.slice(fileIndex + 1, workingMap.length)
        const leftoverSpace = space.count - file.count
        const FileAndLeftover = leftoverSpace > 0 ? [ file, { type: SPACE, count: leftoverSpace } ] : [file]
        const adjustedSpace = { type: SPACE, count: file.count }
        workingMap = [ ...firstPart, ...FileAndLeftover, ...secondPart, adjustedSpace, ...lastPart ]
    }

    return workingMap
}

export function solution2(input) {
    const diskMap = formatInput(input);
    const defraggedFiles = defragFiles(diskMap)
    const blocks = getDiskBlocks(defraggedFiles)
    return blocks.reduce((total, block, index) => block === '.' ? total : total + (block * index), 0)
}

// console.log(solution1(data)) // 6607511583593
// console.log(solution2(data)) // 6636608781232

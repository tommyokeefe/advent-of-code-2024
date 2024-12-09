import fs from 'fs'
import path from 'path'
import os from 'os'

export function getInput(dir) {
  return fs.readFileSync(path.resolve(dir, './input.txt'), {
    encoding: 'utf-8',
  })
}

export const splitOnNewLine = data => data.trim().split(os.EOL)

export const splitOnWhiteSpace = data => data.split(/\s+/)

export const elapsed = timeInSeconds => Date.now() / 1000 - timeInSeconds

export const range = (start, stop, step) =>
  Array.from(
    { length: Math.ceil((stop - start) / step) },
    (_, i) => start + i * step
  )

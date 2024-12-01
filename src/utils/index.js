import fs from 'fs'
import path from 'path'
import os from 'os'

export function getInput(dir) {
  return fs.readFileSync(path.resolve(dir, './input.txt'), {
    encoding: 'utf-8',
  })
}

export const splitOnNewLine = (data) => data.trim().split(os.EOL)

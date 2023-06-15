import fs from 'fs'
import {join} from 'path'

export const findFile = (path: string, filename: string): string => {
  return fs.readFileSync(join(path, filename)).toString()
}

export const getVersion = (
  path = './',
  filename = 'package.json',
  field = 'version'
): string => {
  const fileContent = findFile(path, filename)

  return JSON.parse(fileContent)[field]
}

import fs from 'fs'
import {join} from 'path'

export const findFile = (path: string, fileName: string): string => {
  return fs.readFileSync(join(path, fileName)).toString()
}

export const getVersion = (
  path: string,
  fileName = 'package.json',
  field = 'version'
): string => {
  const fileContent = findFile(path, fileName)

  return JSON.parse(fileContent)[field]
}

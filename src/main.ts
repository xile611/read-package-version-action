import * as core from '@actions/core'
import {getVersion} from './getVersion'

async function run(): Promise<void> {
  try {
    const path: string = core.getInput('path')
    const filename: string = core.getInput('filename')
    const field: string = core.getInput('field')
    const result = getVersion(path, filename, field)

    core.debug(`read path: ${path}`)
    core.debug(`read filename: ${filename}`)
    core.debug(`read field: ${field}`)

    core.setOutput('version', result)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()

import * as core from '@actions/core'
import {getVersion} from './getVersion'

async function run(): Promise<void> {
  try {
    const path: string = core.getInput('path')
    const fileName: string = core.getInput('fileName')
    const field: string = core.getInput('field')
    const result = getVersion(path, fileName, field)

    core.debug(`read path: ${path}`)
    core.debug(`read fileName: ${fileName}`)
    core.debug(`read field: ${field}`)

    core.setOutput('version', result)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()

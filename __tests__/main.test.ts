import {getVersion} from './../src/getVersion'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {expect, test} from '@jest/globals'

test('getVersion when input "path"', async () => {
  await expect(getVersion('./')).toBe('0.0.0')
})

test('getVersion when input "path" and "fileName"', async () => {
  await expect(getVersion('./__tests__', 'test.json')).toBe('0.1.0')
})

test('getVersion input "path" and "fileName" and "field"', async () => {
  await expect(getVersion('./__tests__', 'test.json', 'another')).toBe('1.0.0')
})

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['INPUT_PATH'] = './'
  const np = process.execPath
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }

  console.log(cp.execFileSync(np, [ip], options).toString())
})

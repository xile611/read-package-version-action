import {parsePrelease} from '../src/parsePrelease'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {expect, test} from '@jest/globals'

test("parsePrelease('1.0.0')", async () => {
  const res = parsePrelease('1.0.0')
  expect(res.pre_release_name).toBe('alpha.0')
  expect(res.pre_release_type).toBe('alpha')
})

test("parsePrelease('1.0.0-alpha.1')", async () => {
  const res = parsePrelease('1.0.0-alpha.1')
  expect(res.pre_release_name).toBe('alpha.1')
  expect(res.pre_release_type).toBe('alpha')
})

test("parsePrelease('1.0.0-beta.22')", async () => {
  const res = parsePrelease('1.0.0-beta.22')
  expect(res.pre_release_name).toBe('beta.22')
  expect(res.pre_release_type).toBe('beta')
})

test("parsePrelease('1.0.0-rc')", async () => {
  const res = parsePrelease('1.0.0-rc')
  expect(res.pre_release_name).toBe('rc.0')
  expect(res.pre_release_type).toBe('rc')
})

test("parsePrelease(null, '1.0.0-alpha.1')", async () => {
  const res = parsePrelease(null, '1.0.0-alpha.1')
  expect(res.pre_release_name).toBe('alpha.2')
  expect(res.pre_release_type).toBe('alpha')
})

test("parsePrelease(null, '1.0.0-beta.22')", async () => {
  const res = parsePrelease(null, '1.0.0-beta.22')
  expect(res.pre_release_name).toBe('beta.23')
  expect(res.pre_release_type).toBe('beta')
})

test("parsePrelease(null, '1.0.0-rc')", async () => {
  const res = parsePrelease(null, '1.0.0-rc')
  expect(res.pre_release_name).toBe('rc.0')
  expect(res.pre_release_type).toBe('rc')
})

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['INPUT_PATH'] = '__tests__'
  process.env['INPUT_FILENAME'] = 'test.json'
  process.env['INPUT_SEMVER_STRING'] = 'pre-release/1.0.0-alpha.0'
  process.env['INPUT_SEMVER_PATTERN'] = '^pre-release/(.*)$'
  const np = process.execPath
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }

  console.log(cp.execFileSync(np, [ip], options).toString())
})

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs when use_current_version = false', () => {
  process.env['INPUT_USE_CURRENT_VERSION'] = 'false'
  process.env['INPUT_SEMVER_STRING'] = 'pre-release/1.0.0-alpha.0'
  process.env['INPUT_SEMVER_PATTERN'] = '^pre-release/(.*)$'
  const np = process.execPath
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }

  console.log(cp.execFileSync(np, [ip], options).toString())
})

import { execa } from 'execa'
import ora from 'ora'
import { resolve } from 'path'

const CWD = process.cwd()
const PKG_TOOLS = resolve(CWD, './packages/story-tools')

const testTools = () => execa('pnpm', ['test'], { cwd: PKG_TOOLS })

async function runTest(taskName, task) {
  const loading = ora().start(`Testing ${taskName}`)
  try {
    await task()
    loading.succeed(`Testing ${taskName} completed`)
  } catch (err) {
    loading.fail(`Test ${taskName} failed!`)
    console.error(err.toString())
  }
}

runTest('story-tools', testTools)

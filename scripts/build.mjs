import { execa } from 'execa'
import ora from 'ora'
import { resolve } from 'path'

const CWD = process.cwd()
const PKG_BEAUTY = resolve(CWD, './packages/story-beauty')
const PKG_TOOLS = resolve(CWD, './packages/story-tools')

export const buildBeauty = () => execa('pnpm', ['build'], { cwd: PKG_BEAUTY })

export const buildTools = () => execa('pnpm', ['build'], { cwd: PKG_TOOLS })

export async function runTask(taskName, task) {
  const loading = ora().start(`Building ${taskName}`)
  try {
    await task()
    loading.succeed(`Building ${taskName} completed`)
  } catch (err) {
    loading.fail(`Build ${taskName} failed!`)
    console.error(err.toString())
  }
}

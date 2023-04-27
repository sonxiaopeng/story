import { buildBeauty, buildTools, runTask } from './build.mjs'

;(async () => {
  await Promise.all([
    runTask('story-beauty', buildBeauty),
    runTask('story-tools', buildTools),
  ])
})()

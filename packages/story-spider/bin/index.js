#!/usr/bin/env node

const { readFileSync, pathExistsSync } = require('fs-extra')
const { resolve, basename } = require('path')
const download = require('download')
const Markdown = require('markdown-it')

const CWD = process.cwd()

const configName = 'spider.config.js'

const configPath = resolve(CWD + '/' + configName)

async function extractImages(tokens, images) {
  if (!Array.isArray(tokens)) {
    return
  }

  tokens.forEach((token) => {
    if (token.type === 'image') {
      const url = token.attrs.find((attr) => attr[0] === 'src')
      images.push(url[1])
    }

    if (token.children && token.children.length) {
      extractImages(token.children, images)
    }
  })
}

async function downloadImage(url, path, name) {
  try {
    await download(url, path, { filename: name })
    return true
  } catch (error) {
    return false
  }
}

async function fileCheck() {
  if (!pathExistsSync(configPath)) {
    console.log('请准备好配置文件spider.config.js！')
    return
  }

  const { output, input, name } = require(configPath)

  if (!output || !input) {
    return
  }

  const outputPath = resolve(CWD, output)
  const inputPath = resolve(CWD, input)

  const fileName = name || basename(inputPath, '.md')

  return {
    outputPath,
    inputPath,
    fileName,
  }
}

function getUrl(index, fileName) {
  const suffix = index + 1 + ''
  return `${fileName}_${suffix.padStart(2, '0')}.jpg`
}

async function run() {
  const { outputPath, inputPath, fileName } = await fileCheck()
  const text = readFileSync(inputPath)
  const markdownContent = text.toString()
  const md = new Markdown()
  const tokens = md.parse(markdownContent)
  const images = []
  extractImages(tokens, images)
  images.forEach((url, i) =>
    downloadImage(url, outputPath, getUrl(i, fileName))
  )
}

// run(
//   '/Users/songxiaopeng/Desktop/story/packages/story-spider/test.md',
//   '/Users/songxiaopeng/Desktop/story/packages/story-spider/test',
//   './assets/',
//   'test'
// )

run()

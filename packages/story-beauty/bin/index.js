#!/usr/bin/env node

const fs = require('fs-extra')
const path = require('path')

const CWD = process.cwd()

const createList = [
  {
    content: `
      const beauty = require('story-beauty')
    
      module.exports = {
        ...beauty.eslint,
        rules:{
          // your rules
        }
      }
    `,
    path: path.resolve(CWD, '.eslintrc.js'),
  },
  {
    content: `
      const beauty = require('story-beauty')
      module.exports = {
        ...beauty.prettier,
      }
    `,
    path: path.resolve(CWD, '.prettierrc.js'),
  },
]

createList.forEach((create) => {
  const { path, content } = create
  if (fs.pathExistsSync(path)) {
    console.warn(`${path} already exist and cannot be recreated...`)
    return
  }
  fs.outputFileSync(path, content)
})

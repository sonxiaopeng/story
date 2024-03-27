/* eslint-disable prefer-arrow-callback */
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import babel from '@rollup/plugin-babel'
// import dts from 'rollup-plugin-dts'
import postcss from 'rollup-plugin-postcss'
import sass from 'sass'
import path from 'path'

// 入口文件
const input = 'src/index.ts'

// babel配置
const babelOptions = {
  presets: ['@babel/preset-env'],
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  exclude: '**/node_modules/**',
}
// 忽略的文件
const externalConfig = ['react', 'react-dom']

const processScss = function (context) {
  return new Promise((resolve, reject) => {
    sass.compile(
      {
        file: context,
      },
      function (err, result) {
        if (!err) {
          resolve(result)
        } else {
          reject(result)
        }
      }
    )
    sass.compile(context, {}).then(
      function (output) {
        if (output && output.css) {
          resolve(output.css)
        } else {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({})
        }
      },
      function (err) {
        reject(err)
      }
    )
  })
}

const esmOutput = {
  preserveModules: true,
  // preserveModulesRoot: 'src',
  // exports: 'named',
  assetFileNames: ({ name }) => {
    const { ext, dir, base } = path.parse(name)
    if (ext !== '.css') return '[name].[ext]'
    // 规范 style 的输出格式
    return path.join(dir, 'style', base)
  },
}

export default {
  input,
  output: [{ filname: 'index.esm.js', dir: 'es', format: 'esm' }],
  external: externalConfig,
  plugins: [
    postcss({ extract: true, plugins: [] }),
    resolve(),
    commonjs(),
    typescript(),
    babel(babelOptions),
    // dts(),
  ],
}

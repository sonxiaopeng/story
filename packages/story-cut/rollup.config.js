import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import babel from '@rollup/plugin-babel'

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

export default {
  input,
  output: [{ filname: 'index.esm.js', dir: 'es', format: 'esm' }],
  external: externalConfig,
  plugins: [resolve(), commonjs(), typescript(), babel(babelOptions)],
}

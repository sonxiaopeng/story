import { isEmpty } from './is'
import { Callback } from './type'

// 这是一个针对dom环境的函数库，主要用户web应用的

export function download(url: string, fileName = 'download', suffix = '.xlsx') {
  var link = document.createElement('a')
  link.href = url
  link.download = fileName + suffix
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const setTitle = (title: string) => {
  document.title = title
}

export function traverse(root: HTMLElement, callback: Callback) {
  root = root || document.body
  function quark(element: HTMLElement) {
    if (isEmpty(element)) return
    callback(element)
    for (let index = 0; index < element.childNodes.length; index++) {
      const node = element.childNodes[index] as HTMLElement
      quark(node)
    }
  }
  quark(root)
}

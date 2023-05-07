import { isExternal } from '../is/index'
import {
  Callback,
  CSSProperties,
  WritableHTMLLinkElement,
  WritableHTMLScriptElement,
  InjectOptions,
} from '../type'

// 这是一个针对dom环境的函数库，主要用户web应用的

export function downloadByUrl(
  url: string,
  fileName = 'download',
  suffix = '.xlsx'
) {
  var link = document.createElement('a')
  link.href = url
  link.download = fileName + suffix
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function downloadByBolb(
  blob: Blob,
  fileName = 'download',
  suffix = '.xlsx'
) {
  const link = document.createElement('a')
  document.body.appendChild(link)
  link.download = fileName + suffix
  link.href = window.URL.createObjectURL(blob)
  link.click()
  document.body.removeChild(link)
}

export function setTitle(title: string) {
  document.title = title
}

export function setLocal(key: string, value: string) {
  return localStorage.setItem(key, value)
}

export function getLocal(key: string) {
  return localStorage.getItem(key)
}

export function traverse(root: HTMLElement, callback: Callback) {
  root = root || document.body
  function quark(element: HTMLElement) {
    if (!element) return
    callback(element)
    for (let index = 0; index < element.childNodes.length; index++) {
      const node = element.childNodes[index] as HTMLElement
      quark(node)
    }
  }
  quark(root)
}

export const scrollTop = (
  el: HTMLElement | Window,
  from = 0,
  to: number,
  duration = 500,
  endCallback: Callback<void>
) => {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame =
      (window as any).webkitRequestAnimationFrame ||
      (window as any).mozRequestAnimationFrame ||
      (window as any).msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60)
      }
  }
  const difference = Math.abs(from - to)
  const step = Math.ceil((difference / duration) * 50)

  const scroll = (start: number, end: number, step: number) => {
    if (start === end) {
      endCallback && endCallback()
      return
    }

    let d = start + step > end ? end : start + step
    if (start > end) {
      d = start - step < end ? end : start - step
    }

    if (el === window) {
      window.scrollTo(d, d)
    } else {
      ;(el as HTMLElement).scrollTop = d
    }
    window.requestAnimationFrame(() => scroll(d, end, step))
  }
  scroll(from, to, step)
}

// 对于一个元素的处理

export function hasClass(element: HTMLElement, className: string) {
  return !!element.className.match(
    new RegExp('(\\s|^)' + className + '(\\s|$)')
  )
}

export function addClass(element: HTMLElement, className: string) {
  if (!hasClass(element, className)) {
    element.classList.add(className)
  }
}

export function removeClass(element: HTMLElement, className: string) {
  if (hasClass(element, className)) {
    const reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    element.className = element.className.replace(reg, ' ')
  }
}

export function toogleClass(element: HTMLElement, className: string) {
  if (!hasClass(element, className)) {
    addClass(element, className)
  } else {
    removeClass(element, className)
  }
}

// 关于style
export function addStyle(element: HTMLElement, style: CSSProperties) {
  const keys = Object.keys(style) as (keyof typeof style)[]
  for (let key of keys) {
    element.style[key] = style[key]
  }
  return true
}

// 获取一个字符的宽度
export function getTextWidth(text: string, px: number = 14) {
  const span = document.createElement('span')
  span.innerText = text
  span.style.fontSize = px + 'px'
  document.body.appendChild(span)
  const width = span.offsetWidth
  document.body.removeChild(span)
  return width
}

export function getByteLength(str: string) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xdc00 && code <= 0xdfff) i--
  }
  return s
}

// 关于文件

export function urlToBase64(url: string, callback: Callback<string>) {
  // 创建图片元素
  const img = document.createElement('img')
  // 设置图片加载完成后的回调
  img.onload = function () {
    // 创建canvas元素
    var canvas = document.createElement('canvas')
    // 设置canvas的宽高
    canvas.width = img.width
    canvas.height = img.height
    // 获取上下文
    var ctx = canvas.getContext('2d')
    // 在canvas上绘制图片
    if (ctx) {
      ctx.drawImage(img, 0, 0, img.width, img.height)
      // 将canvas转为base64
      var base64 = canvas.toDataURL()
      // 回调，将base64传给回调函数
      callback(base64)
    }
  }

  img.onerror = function () {
    callback('')
  }
  // 设置图片src为传入的imageUrl
  img.src = url
}

export function base64ToUrl(base64: string, fileName = 'demo.png') {
  const batr = atob(base64)
  let n = batr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = batr.charCodeAt(n)
  }
  const file = new File([u8arr], fileName, { type: 'mine' })
  return window.URL.createObjectURL(file)
}

export function fileToUrl(file: File) {
  return window.URL.createObjectURL(file)
}

// 动态注入一段js代码

export function injectScript(url: string, options: InjectOptions) {
  function loadScript() {
    const script = document.querySelector(`script[src="${url}"]`)
    if (!script) {
      const newScript = document.createElement('script')
      newScript.src = url
      newScript.onload = (status) => {
        console.log(status)
        newScript.setAttribute('data-status', 'ready')
      }
      newScript.onerror = () => {
        newScript.setAttribute('data-status', 'error')
      }
      if (options.props) {
        const props = Object.keys(
          options.props
        ) as (keyof WritableHTMLScriptElement)[]
        props.forEach((prop) => {
          ;(newScript as any)[prop] = (
            options.props as WritableHTMLScriptElement
          )[prop]
        })
      }
      newScript.setAttribute('data-status', 'loading')
      document.body.appendChild(newScript)
    }
  }

  function loadLink() {
    const link = document.querySelector(`link[href="${url}"]`)
    if (!link) {
      const newlink = document.createElement('link')
      newlink.href = url
      newlink.onload = () => {
        newlink.setAttribute('data-status', 'ready')
      }
      newlink.onerror = () => {
        newlink.setAttribute('data-status', 'error')
      }

      if (options.props) {
        const props = Object.keys(
          options.props
        ) as (keyof WritableHTMLLinkElement)[]
        props.forEach((prop) => {
          ;(newlink as any)[prop] = (options.props as WritableHTMLLinkElement)[
            prop
          ]
        })
      }
      newlink.setAttribute('data-status', 'loading')
      document.head.appendChild(newlink)
    }
  }

  if (isExternal(url)) {
    const { type } = options
    type === 'link' ? loadLink() : loadScript()
  }
}

// 获取一个元素在页面的绝对位置
export function getElementPosition(element: HTMLElement) {
  let actualLeft = element.offsetLeft
  let current = element.offsetParent as HTMLElement

  while (current !== null) {
    actualLeft += current.offsetLeft
    current = current.offsetParent as HTMLElement
  }

  let actualTop = element.offsetTop
  current = element.offsetParent as HTMLElement

  while (current !== null) {
    actualTop += current.offsetTop
    current = current.offsetParent as HTMLElement
  }

  return {
    top: actualTop,
    left: actualLeft,
  }
}

export function getScrollOffset() {
  if (window.pageXOffset) {
    return {
      x: window.pageXOffset,
      y: window.pageYOffset,
    }
  } else {
    return {
      x: document.body.scrollLeft + document.documentElement.scrollLeft,
      y: document.body.scrollTop + document.documentElement.scrollTop,
    }
  }
}

// 15、获得视口的尺寸
export function getViewportOffset() {
  if (window.innerWidth) {
    return {
      w: window.innerWidth,
      h: window.innerHeight,
    }
  } else {
    // ie8及其以下
    if (document.compatMode === 'BackCompat') {
      // 怪异模式
      return {
        w: document.body.clientWidth,
        h: document.body.clientHeight,
      }
    } else {
      // 标准模式
      return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight,
      }
    }
  }
}

export function getStyle(element: HTMLElement, prop: keyof CSSProperties) {
  return window.getComputedStyle
    ? window.getComputedStyle(element, null)[prop]
    : element.style[prop]
}

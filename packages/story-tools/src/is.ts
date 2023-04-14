// 这个模块主要的功能是输出若干个布尔类型的值，可用来判断各种各样的逻辑

const URL =
  /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
const EMAIL =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PHONE =
  /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/

const IDCARD = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/

const IPV4 =
  /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/

export const _toString = Object.prototype.toString

/* 对于值的判断 */
export function isTrue(value: any): boolean {
  return value === true
}

export function isFalse(value: any): boolean {
  return value === false
}

export function isNotExist(value: any): boolean {
  return value === null || value === undefined || value === '' || value === 0
}

export function isExist(value: any): boolean {
  return !isNotExist(value)
}

export function isExternal(path: any): boolean {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function isPrimitive(value: any): boolean {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

export function isString(value: any) {
  if (typeof value === 'string' || value instanceof String) {
    return true
  }
  return false
}

export function isNumber(value: any) {
  if (
    typeof value === 'number' ||
    value instanceof Number ||
    !Number.isNaN(Number(value))
  ) {
    return true
  }
  return false
}

export function isBoolean(value: any) {
  if (typeof value === 'boolean' || value instanceof Boolean) {
    return true
  }
  return false
}

export function isSymbol(value: any) {
  if (typeof value === 'symbol' || value instanceof Symbol) {
    return true
  }
  return false
}

export function isArray(value: any): boolean {
  if (typeof Array.isArray === 'undefined') {
    return _toString.call(value) === '[object Array]'
  }
  return Array.isArray(value)
}

export function isObject(value: any): boolean {
  // 可能是array
  return value !== null && typeof value === 'object'
}

export function isPlainObject(value: any): boolean {
  return _toString.call(value) === '[object Object]'
}

export function isEmpty(value: any) {
  return (
    value === null ||
    value === undefined ||
    value === '' ||
    (isArray(value) && value.length === 0) ||
    (isPlainObject(value) && JSON.stringify(value) === '{}')
  )
}

export function isRegExp(value: any): boolean {
  return _toString.call(value) === '[object RegExp]'
}

export function isPromise(value: any): boolean {
  return (
    isExist(value) &&
    typeof value.then === 'function' &&
    typeof value.catch === 'function'
  )
}

// 正则表达式

export function isURL(url: string) {
  if (!isString(url)) {
    return false
  }
  return URL.test(url)
}

export function isEmail(email: string) {
  if (!isString(email)) {
    return false
  }
  return EMAIL.test(email)
}

export function isPhone(phone: string | number): boolean {
  phone = `${phone}`
  return PHONE.test(phone)
}

export function isIDCard(id: string): boolean {
  return IDCARD.test(id)
}

export function isIPV4(ip: string) {
  return IPV4.test(ip)
}

import {
  isFalse,
  isTrue,
  isNumber,
  isArray,
  isString,
  isBoolean,
  isExist,
  isFunction,
  isEmpty,
  isPromise,
  isBlob,
  isDate,
  isComplex,
  isEmail,
  isExternal,
  isPlainObject,
  isPhone,
  isIDCard,
  isPrimitive,
  isIPV4,
  isFile,
  isFormData,
  isRegExp,
  isSymbol,
} from '../index'

test('false is false?', () => {
  expect(isFalse(false)).toBe(true)
})

test('true is false?', () => {
  expect(isFalse(true)).toBe(false)
})

test('false is true?', () => {
  expect(isTrue(false)).toBe(false)
})

test('true is true?', () => {
  expect(isTrue(true)).toBe(true)
})

test('true is boolean', () => {
  expect(isBoolean(true)).toBe(true)
})

test('a is boolean', () => {
  expect(isBoolean('')).toBe(false)
})

test('1 is Number?', () => {
  expect(isNumber(1)).toBe(true)
})

test('a is Number?', () => {
  expect(isNumber('a')).toBe(false)
})

test('[] is Array', () => {
  expect(isArray([])).toBe(true)
})

test('{} is Array', () => {
  expect(isArray({})).toBe(false)
})

test('1 is String', () => {
  expect(isString(1)).toBe(false)
})

test('a is String', () => {
  expect(isString('a')).toBe(true)
})

test('undefined is exist', () => {
  expect(isExist(undefined)).toBe(false)
})

test('null is exist', () => {
  expect(isExist(null)).toBe(false)
})

test('black is exist', () => {
  expect(isExist('')).toBe(false)
})

test('0 is exist', () => {
  expect(isExist(0)).toBe(false)
})

test('[] is exist', () => {
  expect(isExist([])).toBe(true)
})

test('()=>{} is function', () => {
  expect(isFunction(() => {})).toBe(true)
})

test('a is function', () => {
  expect(isFunction('a')).toBe(false)
})

test('blank is empty', () => {
  expect(isEmpty('')).toBe(true)
})

test('[] is empty', () => {
  expect(isEmpty([])).toBe(true)
})

test('{} is empty', () => {
  expect(isEmpty({})).toBe(true)
})

test('a is empty', () => {
  expect(isEmpty('a')).toBe(false)
})

test('new Promise() is Promise', () => {
  expect(isPromise(new Promise(() => {}))).toBe(true)
})

test('[] is Promise', () => {
  expect(isPromise([])).toBe(false)
})

test('[] is Blob', () => {
  expect(isBlob([])).toBe(false)
})

test('blob is Blob', () => {
  const blob = new Blob()
  expect(isBlob(blob)).toBe(true)
})

test('[] is Date', () => {
  expect(isDate([])).toBe(false)
})

test('date is Date', () => {
  const date = new Date()
  expect(isDate(date)).toBe(true)
})

test('{} is Complex', () => {
  expect(isComplex({})).toBe(true)
})

test('{} is Complex', () => {
  expect(isComplex({})).toBe(true)
})

test('1 is Complex', () => {
  expect(isComplex(1)).toBe(false)
})

test('[] is plainObject', () => {
  expect(isPlainObject([])).toBe(false)
})

test('{a:1} is plainObject', () => {
  expect(isPlainObject({ a: 1 })).toBe(true)
})

test('aaa@qq.com is email', () => {
  expect(isEmail('aaa@qq.com')).toBe(true)
})

test('http://baidu.com', () => {
  expect(isExternal('http://baidu.com')).toBe(true)
})

test('18378765653 is Phone', () => {
  expect(isPhone(18378765653)).toBe(true)
})

test('a is Phone', () => {
  expect(isPhone('a')).toBe(false)
})

test('612425199708086785 is IDCard', () => {
  const IDCard = '612425199708086785'
  expect(isIDCard(IDCard)).toBe(true)
})

test('a is IDCard', () => {
  expect(isIDCard('a')).toBe(false)
})

test('[] is primitive', () => {
  expect(isPrimitive([])).toBe(false)
})

test('0 is primitive', () => {
  expect(isPrimitive(0)).toBe(true)
})

test('10.0.33.129 is IPV4', () => {
  expect(isIPV4('10.0.33.129')).toBe(true)
})

test('123 is IPV4', () => {
  expect(isIPV4('123')).toBe(false)
})

test('', () => {
  expect({ a: 1 }).toEqual({ a: 1 })
})

// jest --updateSnapshot 通过这个来重新生成快照；

// it('it', () => {
//   const tree = '<div>1</div>'
//   expect(tree).toMatchSnapshot()
// })

test('file is File', () => {
  var file = new File(['foo'], 'foo.txt', {
    type: 'text/plain',
  })

  expect(isFile(file)).toBe(true)
})

test('0 is File', () => {
  expect(isFile(0)).toBe(false)
})

test('formDate is FormData', () => {
  const formData = new FormData()
  expect(isFormData(formData)).toBe(true)
})

test('0 is FormData', () => {
  expect(isFormData(0)).toBe(false)
})

test('reg is RegExp', () => {
  expect(isRegExp(/123/)).toBe(true)
})

test('0 is RegExp', () => {
  expect(isRegExp(0)).toBe(false)
})

test('symbol is Symbol', () => {
  const symbol = Symbol('foo')
  expect(isSymbol(symbol)).toBe(true)
})

test('0 is Symbol', () => {
  expect(isSymbol(0)).toBe(false)
})

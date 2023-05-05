import {
  isFalse,
  isTrue,
  isNumber,
  isArray,
  isString,
  isBoolean,
  isExist,
  isFunction,
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
  expect(isExist([])).toBe(false)
})

test('()=>{} is function', () => {
  expect(isFunction(() => {})).toBe(true)
})

test('a is function', () => {
  expect(isFunction('a')).toBe(false)
})

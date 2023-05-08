import { setTitle, setLocal, getLocal } from '../index'

test('setTitle', () => {
  const title = `${Math.floor(Math.random() * 10000)}`
  setTitle(title)
  expect(document.title).toBe(title)
})

test('setLocal', () => {
  const value = `${Math.floor(Math.random() * 10000)}`

  setLocal('value', value)

  expect(localStorage.getItem(value)).toBe(value)
})

test('getLocal', () => {
  const value = `${Math.floor(Math.random() * 10000)}`

  localStorage.setItem('value', value)

  expect(getLocal('value')).toBe(value)
})

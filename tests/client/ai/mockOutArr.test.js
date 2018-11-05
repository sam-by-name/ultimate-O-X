const {mockOutArr} = require('../../../lib/medAiV2/lib/mockOutArr')
const {deepClone} = require('../../../lib/medAiV2/lib/deepClone')
const {
  arr, alteredArr1, alteredArr2, alteredArr3,
  alteredArr4, alteredArr5, alteredArr6, alteredArr7
} = require('./lib/mockOutArrData')

test('edit arr single move, not sent2Same/dead and set next move boundaries', () => {
  const expected = alteredArr1
  let newArr = deepClone(arr)
  mockOutArr(newArr, 3, 2, 'Player2', false)
  const actual = newArr
  expect(actual).toEqual(expected)
})

test('edit arr single move, sent2Same and set next move boundaries', () => {
  const expected = alteredArr2
  let newArr = deepClone(arr)
  mockOutArr(newArr, 3, 3, 'Player2', false)
  const actual = newArr
  expect(actual).toEqual(expected)
})

test('edit arr single move, sentDead and set next move boundaries', () => {
  const expected = alteredArr3
  let newArr = deepClone(arr)
  mockOutArr(newArr, 3, 0, 'Player1', false)
  const actual = newArr
  expect(actual).toEqual(expected)
})

test('edit arr with win move, not send2Same/dead and set next move boundaries', () => {
  const expected = alteredArr4
  let newArr = deepClone(arr)
  mockOutArr(newArr, 5, 6, 'Player2', true)
  const actual = newArr
  expect(actual).toEqual(expected)
})

test('edit arr with win move, send2dead and set next move boundaries', () => {
  const expected = alteredArr5
  let newArr = deepClone(arr)
  mockOutArr(newArr, 5, 0, 'Player2', true)
  const actual = newArr
  expect(actual).toEqual(expected)
})

test('edit arr with draw move, send2dead and set next move boundaries', () => {
  const expected = alteredArr6
  let newArr = deepClone(arr)
  mockOutArr(newArr, 8, 8, 'Player1', false)
  const actual = newArr
  expect(actual).toEqual(expected)
})

test('edit arr with draw move, not send2Same/dead and set next move boundaries', () => {
  const expected = alteredArr7
  let newArr = deepClone(arr)
  mockOutArr(newArr, 7, 4, 'Player1', false)
  const actual = newArr
  expect(actual).toEqual(expected)
})

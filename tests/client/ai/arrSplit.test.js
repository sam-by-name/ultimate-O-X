const {arrSplit} = require('../../../lib/medAiV2/lib/getInfoV2')

test('takes array of strings of numbers, turns into array of seperated numbers', () => {
  const expected = [3, 4, 4, 7, 0, 2, 2, 8]
  const actual = arrSplit(['34', '47', '02', '28'])
  expect(actual).toEqual(expected)
})

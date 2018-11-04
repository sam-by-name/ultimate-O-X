const {hasGameEnded} = require('../../../lib/medAiV2/lib/hasGameEnded')

test('checks to see if game has finished', () => {
  const expected = true
  const actual = hasGameEnded(arr)
  expect(actual).toEqual(expected)
})

const arr = [
  [{wonBy: 'me'}],
  [{wonBy: 'me'}],
  [{wonBy: 'me'}],
  [{wonBy: 'me'}],
  [{wonBy: 'me'}],
  [{wonBy: 'me'}],
  [{wonBy: 'me'}],
  [{wonBy: 'me'}],
  [{wonBy: 'me'}]
]

const editArr = (arr) => {
  arr[7][0].wonBy = ''
}

test('checks to see if game has finished', () => {
  editArr(arr)
  const expected = false
  const actual = hasGameEnded(arr)
  expect(actual).toEqual(expected)
})


const {continuesAndStartsNew} = require('../../../lib/medAiV2/lib/getInfoV2')

test('finds if move that continues an in progress line also starts a new one', () => {
  const expected = [3, 0, 4, 0, 8, 4, 2, 7, 8]
  const actual = continuesAndStartsNew(playable, counted)
  expect(actual).toEqual(expected)
})

const counted = [
  {value: 4, count: 2},
  {value: 2, count: 2},
  {value: 3, count: 1},
  {value: 7, count: 1},
  {value: 0, count: 1},
  {value: 8, count: 1}
]

const playable = '0234678'

const {findsWillPlay} = require('../../../lib/medAiV2/lib/getInfoV2')

test('finds a move that continues a line', () => {
  const expected = ['34', '47', '02', '28']
  const actual = findsWillPlay('15', '0234678')
  expect(actual).toEqual(expected)
})

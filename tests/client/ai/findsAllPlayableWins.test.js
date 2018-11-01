const {findsAllPlayableWins} = require('../../../lib/medAiV2/lib/getInfoV2')

test('finds all available and untouched lines', () => {
  const expected = ['147', '345']
  const actual = findsAllPlayableWins('13457')
  expect(actual).toEqual(expected)
})

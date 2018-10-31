const {findsWinOrDeny} = require('../../../lib/medAiV2/lib/getInfoV2')

test('finds all wins and denies within given miniGame', () => {
  const expected = [2, 3, 4, 7]
  const actual = findsWinOrDeny('0168', '23457')

  expect(actual).toEqual(expected)
})

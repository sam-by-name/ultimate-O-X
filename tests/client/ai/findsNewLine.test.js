const {findsNewLine} = require('../../../lib/medAiV2/lib/getInfoV2')

test('findsNewLine, sets aiDb newLine flags', () => {
  const expected = alteredAiDb
  findsNewLine('25678', 0, aiDb, true)
  const actual = aiDb
  expect(actual).toEqual(expected)
})

const aiDb = [
  [
    {startsNew: false, startsMostNew: false},
    {startsNew: false, startsMostNew: false},
    {startsNew: false, startsMostNew: false},
    {startsNew: false, startsMostNew: false},
    {startsNew: false, startsMostNew: false},
    {startsNew: false, startsMostNew: false},
    {startsNew: false, startsMostNew: false},
    {startsNew: false, startsMostNew: false},
    {startsNew: false, startsMostNew: false}
  ]
]

const alteredAiDb = [
  [
    {startsNew: false, startsMostNew: false},
    {startsNew: false, startsMostNew: false},
    {startsNew: true, startsMostNew: false},
    {startsNew: false, startsMostNew: false},
    {startsNew: false, startsMostNew: false},
    {startsNew: true, startsMostNew: false},
    {startsNew: true, startsMostNew: false},
    {startsNew: true, startsMostNew: false},
    {startsNew: false, startsMostNew: true}
  ]
]

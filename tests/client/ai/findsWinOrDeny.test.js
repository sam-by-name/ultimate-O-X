const {findsWinOrDeny} = require('../../../lib/medAiV2/lib/getInfoV2')

test('finds all wins and denies within given miniGame', () => {
  const expected = [2, 3, 4, 7]
  const actual = findsWinOrDeny('0168', '23457')
  expect(actual).toEqual(expected)
})

test('finds all wins within given miniGame and marks out aiDb', () => {
  const expected = winAlteredAiDb
  findsWinOrDeny('0168', '23457', winAiDb, 0, true)
  const actual = winAiDb
  expect(actual).toEqual(expected)
})

const winAiDb = [
  [
    {win: false},
    {win: false},
    {win: false},
    {win: false},
    {win: false},
    {win: false},
    {win: false},
    {win: false},
    {win: false}
  ]
]

const winAlteredAiDb = [
  [
    {win: false},
    {win: false},
    {win: true},
    {win: true},
    {win: true},
    {win: false},
    {win: false},
    {win: true},
    {win: false}
  ]
]

test('finds all denies within given miniGame and marks out aiDb', () => {
  const expected = denyAlteredAiDb
  findsWinOrDeny('0167', '23458', denyAiDb, 0, false)
  const actual = denyAiDb
  expect(actual).toEqual(expected)
})

const denyAiDb = [
  [
    {deny: false},
    {deny: false},
    {deny: false},
    {deny: false},
    {deny: false},
    {deny: false},
    {deny: false},
    {deny: false},
    {deny: false}
  ]
]

const denyAlteredAiDb = [
  [
    {deny: false},
    {deny: false},
    {deny: true},
    {deny: true},
    {deny: true},
    {deny: false},
    {deny: false},
    {deny: false},
    {deny: true}
  ]
]

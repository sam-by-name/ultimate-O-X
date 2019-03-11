const {findsMiniGame} = require('../../../lib/medAiV2/lib/getInfoV2')
const {arr} = require('./lib/arrMock')

test('finds and returns an array of playable miniGames', () => {
  const expected = [2, 4]
  const actual = findsMiniGame(arr, [], aiDb)
  expect(actual).toEqual(expected)
})

test('finds playable miniGames and marks out aiDb', () => {
  const expected = alteredAiDb
  findsMiniGame(arr, [], aiDb)
  const actual = aiDb
  expect(actual).toEqual(expected)
})

const aiDb = [
  [{miniPlayable: false}],
  [{miniPlayable: false}],
  [{miniPlayable: false}],
  [{miniPlayable: false}],
  [{miniPlayable: false}],
  [{miniPlayable: false}],
  [{miniPlayable: false}],
  [{miniPlayable: false}],
  [{miniPlayable: false}]
]

const alteredAiDb = [
  [{miniPlayable: false}],
  [{miniPlayable: false}],
  [{miniPlayable: true}],
  [{miniPlayable: false}],
  [{miniPlayable: true}],
  [{miniPlayable: false}],
  [{miniPlayable: false}],
  [{miniPlayable: false}],
  [{miniPlayable: false}]
]

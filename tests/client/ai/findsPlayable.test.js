const {findsPlayable} = require('../../../lib/medAiV2/lib/getInfoV2')
const {aiDb} = require('./lib/aiDbMock')
const {alteredAiDb} = require('./lib/alteredAiDbMock')
const {arr} = require('./lib/arrMock')

test('finds playable and owned moves', () => {
  // if true not added as last argument, aiDb is not marked out
  const expected = {aiOwns: '145', playable: '0278', humanOwns: '36', aiDb: aiDb}
  const actual = findsPlayable(arr, 0, 'Player2', 'Player1', aiDb, false)
  expect(actual).toEqual(expected)
})

test('finds playable and owned moves, then marks out aiDb', () => {
  const expected = {aiOwns: '145', playable: '0278', humanOwns: '36', aiDb: alteredAiDb}
  const actual = findsPlayable(arr, 0, 'Player2', 'Player1', aiDb, true)
  expect(actual).toEqual(expected)
})

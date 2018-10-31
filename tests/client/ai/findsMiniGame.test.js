const {findsMiniGame} = require('../../../lib/medAiV2/lib/getInfoV2')
const {aiDb} = require('./lib/aiDbMock')
const {arr} = require('./lib/arrMock')

test('finds and returns an array of playable miniGames', () => {
  const expected = [2, 4]
  const actual = findsMiniGame(arr, [], aiDb)
  expect(actual).toEqual(expected)
})

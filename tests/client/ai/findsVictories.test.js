const {findsVictories} = require('../../../lib/medAiV2/lib/findsVictories')
const {arr} = require('./lib/arrMock')
const {deepClone} = require('../../../lib/medAiV2/lib/deepClone')
const {aiDb, alteredAiDb1, alteredAiDb2} = require('./lib/findsVictoriesMockAiDb')

test('finds number of all ai victories on the board', () => {
  const expected = 1
  let aiDbClone = deepClone(aiDb)
  const actual = findsVictories(arr, 'Player2', 'Player1', aiDbClone, true)
  expect(actual).toEqual(expected)
})

test('finds all ai victories on the board and marks them in aiDb', () => {
  const expected = alteredAiDb1
  let aiDbClone = deepClone(aiDb)
  findsVictories(arr, 'Player2', 'Player1', aiDbClone, true)
  const actual = aiDbClone
  expect(actual).toEqual(expected)
})

test('finds number of all human victories on the board', () => {
  const expected = 2
  let aiDbClone = deepClone(aiDb)
  const actual = findsVictories(arr, 'Player2', 'Player1', aiDbClone, false)
  expect(actual).toEqual(expected)
})

test('finds all human victories on the board and marks them in aiDb', () => {
  const expected = alteredAiDb2
  let aiDbClone = deepClone(aiDb)
  findsVictories(arr, 'Player2', 'Player1', aiDbClone, false)
  const actual = aiDbClone
  expect(actual).toEqual(expected)
})


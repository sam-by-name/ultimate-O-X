const {findsPlayable} = require('../../../lib/medAiV2/lib/getInfoV2')

test('finds playable and owned moves', () => {
  // if true not added as last argument, aiDb is not marked out
  const expected = {aiOwns: '145', playable: '0268', humanOwns: '37', aiDb: aiDb}
  const actual = findsPlayable(arr, 0, 'Player2', 'Player1', aiDb, false)
  expect(actual).toEqual(expected)
})

test('finds playable and owned moves, then marks out aiDb', () => {
  const expected = {aiOwns: '145', playable: '0268', humanOwns: '37', aiDb: alteredAiDb}
  const actual = findsPlayable(arr, 0, 'Player2', 'Player1', aiDb, true)
  expect(actual).toEqual(expected)
})

const arr = [
  [
    {takenBy: ''},
    {takenBy: 'Player2'},
    {takenBy: ''},
    {takenBy: 'Player1'},
    {takenBy: 'Player2'},
    {takenBy: 'Player2'},
    {takenBy: ''},
    {takenBy: 'Player1'},
    {takenBy: ''}
  ]
]

const aiDb = [
  [
    {aiOwns: false, humanOwns: false, playable: false, sends2Same: false},
    {aiOwns: false, humanOwns: false, playable: false, sends2Same: false},
    {aiOwns: false, humanOwns: false, playable: false, sends2Same: false},
    {aiOwns: false, humanOwns: false, playable: false, sends2Same: false},
    {aiOwns: false, humanOwns: false, playable: false, sends2Same: false},
    {aiOwns: false, humanOwns: false, playable: false, sends2Same: false},
    {aiOwns: false, humanOwns: false, playable: false, sends2Same: false},
    {aiOwns: false, humanOwns: false, playable: false, sends2Same: false},
    {aiOwns: false, humanOwns: false, playable: false, sends2Same: false}
  ]
]

const alteredAiDb = [
  [
    {aiOwns: false, humanOwns: false, playable: true, sends2Same: true},
    {aiOwns: true, humanOwns: false, playable: false, sends2Same: false},
    {aiOwns: false, humanOwns: false, playable: true, sends2Same: false},
    {aiOwns: false, humanOwns: true, playable: false, sends2Same: false},
    {aiOwns: true, humanOwns: false, playable: false, sends2Same: false},
    {aiOwns: true, humanOwns: false, playable: false, sends2Same: false},
    {aiOwns: false, humanOwns: false, playable: true, sends2Same: false},
    {aiOwns: false, humanOwns: true, playable: false, sends2Same: false},
    {aiOwns: false, humanOwns: false, playable: true, sends2Same: false}
  ]
]

const {findsPlayable} = require('../../../lib/medAiV2/lib/getInfoV2')

test('finds playable and owned moves', () => {
  const expected = {aiOwns: '145', playable: '268', humanOwns: '037'}
  const actual = findsPlayable(arr, 0, 'Player2', 'Player1')
  expect(actual).toEqual(expected)
})

const arr = [
  [
    {takenBy: 'Player1'},
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

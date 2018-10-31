const {findsMiniStatus} = require('../../../lib/medAiV2/lib/getInfoV2')
const {arr} = require('./lib/arrMock')

test('finds mini game status and returns array', () => {
  const expected = {aiOwns: '14', playable: '02358', humanOwns: '67'}
  const actual = findsMiniStatus(arr, 'Player2', 'Player1')
  expect(actual).toEqual(expected)
})

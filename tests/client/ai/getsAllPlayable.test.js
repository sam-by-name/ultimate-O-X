const {getsAllPlayable} = require('../../../lib/medAiV2/lib/getsAllPlayable')

test('collects all playable moves', () => {
  const expected = result
  const actual = getsAllPlayable(aiDb)
  expect(actual).toEqual(expected)
})

const result = [
  {playable: true, miniPlayable: false, mini: 1, cell: 5},
  {playable: true, miniPlayable: false, mini: 1, cell: 6},
  {playable: true, miniPlayable: false, mini: 2, cell: 2},
  {playable: true, miniPlayable: false, mini: 2, cell: 3},
  {playable: true, miniPlayable: false, mini: 2, cell: 4},
  {playable: true, miniPlayable: false, mini: 2, cell: 5},
  {playable: true, miniPlayable: false, mini: 2, cell: 6},
  {playable: true, miniPlayable: false, mini: 3, cell: 3},
  {playable: true, miniPlayable: false, mini: 3, cell: 4},
  {playable: true, miniPlayable: false, mini: 3, cell: 5},
  {playable: true, miniPlayable: false, mini: 3, cell: 6},
  {playable: true, miniPlayable: false, mini: 3, cell: 7},
  {playable: true, miniPlayable: false, mini: 4, cell: 2},
  {playable: true, miniPlayable: false, mini: 4, cell: 8},
  {playable: true, miniPlayable: true, mini: 5, cell: 1},
  {playable: true, miniPlayable: false, mini: 5, cell: 5},
  {playable: true, miniPlayable: false, mini: 5, cell: 7},
  {playable: true, miniPlayable: false, mini: 6, cell: 7},
  {playable: true, miniPlayable: false, mini: 6, cell: 8},
  {playable: true, miniPlayable: false, mini: 6, cell: 9},
  {playable: true, miniPlayable: false, mini: 7, cell: 3},
  {playable: true, miniPlayable: false, mini: 7, cell: 5},
  {playable: true, miniPlayable: false, mini: 7, cell: 6},
  {playable: true, miniPlayable: false, mini: 7, cell: 7}

]

const aiDb = [
  [
    {playable: false, miniPlayable: true, mini: 1, cell: 1},
    {playable: false, miniPlayable: false, mini: 1, cell: 2},
    {playable: false, miniPlayable: false, mini: 1, cell: 3},
    {playable: false, miniPlayable: false, mini: 1, cell: 4},
    {playable: true, miniPlayable: false, mini: 1, cell: 5},
    {playable: true, miniPlayable: false, mini: 1, cell: 6},
    {playable: false, miniPlayable: false, mini: 1, cell: 7},
    {playable: false, miniPlayable: false, mini: 1, cell: 8},
    {playable: false, miniPlayable: false, mini: 1, cell: 9}
  ],
  [
    {playable: false, miniPlayable: true, mini: 2, cell: 1},
    {playable: true, miniPlayable: false, mini: 2, cell: 2},
    {playable: true, miniPlayable: false, mini: 2, cell: 3},
    {playable: true, miniPlayable: false, mini: 2, cell: 4},
    {playable: true, miniPlayable: false, mini: 2, cell: 5},
    {playable: true, miniPlayable: false, mini: 2, cell: 6},
    {playable: false, miniPlayable: false, mini: 2, cell: 7},
    {playable: false, miniPlayable: false, mini: 2, cell: 8},
    {playable: false, miniPlayable: false, mini: 2, cell: 9}
  ],
  [
    {playable: false, miniPlayable: true, mini: 3, cell: 1},
    {playable: false, miniPlayable: false, mini: 3, cell: 2},
    {playable: true, miniPlayable: false, mini: 3, cell: 3},
    {playable: true, miniPlayable: false, mini: 3, cell: 4},
    {playable: true, miniPlayable: false, mini: 3, cell: 5},
    {playable: true, miniPlayable: false, mini: 3, cell: 6},
    {playable: true, miniPlayable: false, mini: 3, cell: 7},
    {playable: false, miniPlayable: false, mini: 3, cell: 8},
    {playable: false, miniPlayable: false, mini: 3, cell: 9}
  ],
  [
    {playable: false, miniPlayable: true, mini: 4, cell: 1},
    {playable: true, miniPlayable: false, mini: 4, cell: 2},
    {playable: false, miniPlayable: false, mini: 4, cell: 3},
    {playable: false, miniPlayable: false, mini: 4, cell: 4},
    {playable: false, miniPlayable: false, mini: 4, cell: 5},
    {playable: false, miniPlayable: false, mini: 4, cell: 6},
    {playable: false, miniPlayable: false, mini: 4, cell: 7},
    {playable: true, miniPlayable: false, mini: 4, cell: 8},
    {playable: false, miniPlayable: false, mini: 4, cell: 9}
  ],
  [
    {playable: true, miniPlayable: true, mini: 5, cell: 1},
    {playable: false, miniPlayable: false, mini: 5, cell: 2},
    {playable: false, miniPlayable: false, mini: 5, cell: 3},
    {playable: false, miniPlayable: false, mini: 5, cell: 4},
    {playable: true, miniPlayable: false, mini: 5, cell: 5},
    {playable: false, miniPlayable: false, mini: 5, cell: 6},
    {playable: true, miniPlayable: false, mini: 5, cell: 7},
    {playable: false, miniPlayable: false, mini: 5, cell: 8},
    {playable: false, miniPlayable: false, mini: 5, cell: 9}
  ],
  [
    {playable: false, miniPlayable: true, mini: 6, cell: 1},
    {playable: false, miniPlayable: false, mini: 6, cell: 2},
    {playable: false, miniPlayable: false, mini: 6, cell: 3},
    {playable: false, miniPlayable: false, mini: 6, cell: 4},
    {playable: false, miniPlayable: false, mini: 6, cell: 5},
    {playable: false, miniPlayable: false, mini: 6, cell: 6},
    {playable: true, miniPlayable: false, mini: 6, cell: 7},
    {playable: true, miniPlayable: false, mini: 6, cell: 8},
    {playable: true, miniPlayable: false, mini: 6, cell: 9}
  ],
  [
    {playable: false, miniPlayable: true, mini: 7, cell: 1},
    {playable: false, miniPlayable: false, mini: 7, cell: 2},
    {playable: true, miniPlayable: false, mini: 7, cell: 3},
    {playable: false, miniPlayable: false, mini: 7, cell: 4},
    {playable: true, miniPlayable: false, mini: 7, cell: 5},
    {playable: true, miniPlayable: false, mini: 7, cell: 6},
    {playable: true, miniPlayable: false, mini: 7, cell: 7},
    {playable: false, miniPlayable: false, mini: 7, cell: 8},
    {playable: false, miniPlayable: false, mini: 7, cell: 9}
  ],
  [
    {playable: false, miniPlayable: false, mini: 8, cell: 1},
    {playable: false, miniPlayable: false, mini: 8, cell: 2},
    {playable: false, miniPlayable: false, mini: 8, cell: 3},
    {playable: false, miniPlayable: false, mini: 8, cell: 4},
    {playable: false, miniPlayable: false, mini: 8, cell: 5},
    {playable: false, miniPlayable: false, mini: 8, cell: 6},
    {playable: false, miniPlayable: false, mini: 8, cell: 7},
    {playable: false, miniPlayable: false, mini: 8, cell: 8},
    {playable: false, miniPlayable: false, mini: 8, cell: 9}
  ],
  [
    {playable: false, miniPlayable: false, mini: 9, cell: 1},
    {playable: false, miniPlayable: false, mini: 9, cell: 2},
    {playable: false, miniPlayable: false, mini: 9, cell: 3},
    {playable: false, miniPlayable: false, mini: 9, cell: 4},
    {playable: false, miniPlayable: false, mini: 9, cell: 5},
    {playable: false, miniPlayable: false, mini: 9, cell: 6},
    {playable: false, miniPlayable: false, mini: 9, cell: 7},
    {playable: false, miniPlayable: false, mini: 9, cell: 8},
    {playable: false, miniPlayable: false, mini: 9, cell: 9}
  ]
]

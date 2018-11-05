const {mockOutArr} = require('../../../lib/medAiV2/lib/mockOutArr')
const {deepClone} = require('../../../lib/medAiV2/lib/deepClone')

test('edit arr single move, not sent2Same/dead and set next move boundaries', () => {
  const expected = alteredArr1
  let newArr = deepClone(arr)
  mockOutArr(newArr, 3, 2, 'Player2', false)
  const actual = newArr
  expect(actual).toEqual(expected)
})

test('edit arr single move, sent2Same and set next move boundaries', () => {
  const expected = alteredArr2
  let newArr = deepClone(arr)
  mockOutArr(newArr, 3, 3, 'Player2', false)
  const actual = newArr
  expect(actual).toEqual(expected)
})

test('edit arr single move, sentDead and set next move boundaries', () => {
  const expected = alteredArr3
  let newArr = deepClone(arr)
  mockOutArr(newArr, 3, 0, 'Player1', false)
  const actual = newArr
  expect(actual).toEqual(expected)
})

test('edit arr with win move, not send2Same/dead and set next move boundaries', () => {
  const expected = alteredArr4
  let newArr = deepClone(arr)
  mockOutArr(newArr, 5, 6, 'Player2', false)
  const actual = newArr
  expect(actual).toEqual(expected)
})

export const alteredArr4 = [
  [
    {isPlayable: false, isAlive: false, takenBy: 'Player1', wonBy: 'Player1'},
    {isPlayable: false, isAlive: false, takenBy: '', wonBy: 'Player1'},
    {isPlayable: false, isAlive: false, takenBy: '', wonBy: 'Player1'},
    {isPlayable: false, isAlive: false, takenBy: 'Player1', wonBy: 'Player1'},
    {isPlayable: false, isAlive: false, takenBy: 'Player2', wonBy: 'Player1'},
    {isPlayable: false, isAlive: false, takenBy: 'Player2', wonBy: 'Player1'},
    {isPlayable: false, isAlive: false, takenBy: 'Player1', wonBy: 'Player1'},
    {isPlayable: false, isAlive: false, takenBy: '', wonBy: 'Player1'},
    {isPlayable: false, isAlive: false, takenBy: '', wonBy: 'Player1'}
  ],
  [
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''}
  ],
  [
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''}
  ],
  [
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''}
  ],
  [
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''}
  ],
  [
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: false, takenBy: 'Player2', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: false, takenBy: 'Player2', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: false, takenBy: 'Player2', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''}
  ],
  [
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''}
  ],
  [
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''}
  ],
  [
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''}
  ]
]

export const alteredArr3 = [
  [
    {isPlayable: false, isAlive: false, takenBy: 'Player1', wonBy: 'Player1'},
    {isPlayable: false, isAlive: false, takenBy: '', wonBy: 'Player1'},
    {isPlayable: false, isAlive: false, takenBy: '', wonBy: 'Player1'},
    {isPlayable: false, isAlive: false, takenBy: 'Player1', wonBy: 'Player1'},
    {isPlayable: false, isAlive: false, takenBy: 'Player2', wonBy: 'Player1'},
    {isPlayable: false, isAlive: false, takenBy: 'Player2', wonBy: 'Player1'},
    {isPlayable: false, isAlive: false, takenBy: 'Player1', wonBy: 'Player1'},
    {isPlayable: false, isAlive: false, takenBy: '', wonBy: 'Player1'},
    {isPlayable: false, isAlive: false, takenBy: '', wonBy: 'Player1'}
  ],
  [
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''}
  ],
  [
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''}
  ],
  [
    {isPlayable: true, isAlive: false, takenBy: 'Player1', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''}
  ],
  [
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''}
  ],
  [
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: false, takenBy: 'Player2', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: false, takenBy: 'Player2', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''}
  ],
  [
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''}
  ],
  [
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''}
  ],
  [
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''}
  ]
]

export const alteredArr2 = [
  [
    {isPlayable: false, isAlive: false, takenBy: 'Player1', wonBy: 'Player1'},
    {isPlayable: false, isAlive: false, takenBy: '', wonBy: 'Player1'},
    {isPlayable: false, isAlive: false, takenBy: '', wonBy: 'Player1'},
    {isPlayable: false, isAlive: false, takenBy: 'Player1', wonBy: 'Player1'},
    {isPlayable: false, isAlive: false, takenBy: 'Player2', wonBy: 'Player1'},
    {isPlayable: false, isAlive: false, takenBy: 'Player2', wonBy: 'Player1'},
    {isPlayable: false, isAlive: false, takenBy: 'Player1', wonBy: 'Player1'},
    {isPlayable: false, isAlive: false, takenBy: '', wonBy: 'Player1'},
    {isPlayable: false, isAlive: false, takenBy: '', wonBy: 'Player1'}
  ],
  [
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''}
  ],
  [
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''}
  ],
  [
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: false, takenBy: 'Player2', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''}
  ],
  [
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''}
  ],
  [
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: false, takenBy: 'Player2', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: false, takenBy: 'Player2', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''}
  ],
  [
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''}
  ],
  [
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''}
  ],
  [
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''}
  ]
]



export const alteredArr1 = [
  [
    {isPlayable: false, isAlive: false, takenBy: 'Player1', wonBy: 'Player1'},
    {isPlayable: false, isAlive: false, takenBy: '', wonBy: 'Player1'},
    {isPlayable: false, isAlive: false, takenBy: '', wonBy: 'Player1'},
    {isPlayable: false, isAlive: false, takenBy: 'Player1', wonBy: 'Player1'},
    {isPlayable: false, isAlive: false, takenBy: 'Player2', wonBy: 'Player1'},
    {isPlayable: false, isAlive: false, takenBy: 'Player2', wonBy: 'Player1'},
    {isPlayable: false, isAlive: false, takenBy: 'Player1', wonBy: 'Player1'},
    {isPlayable: false, isAlive: false, takenBy: '', wonBy: 'Player1'},
    {isPlayable: false, isAlive: false, takenBy: '', wonBy: 'Player1'}
  ],
  [
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''}
  ],
  [
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''}
  ],
  [
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: false, takenBy: 'Player2', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''}
  ],
  [
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''}
  ],
  [
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: false, takenBy: 'Player2', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: false, takenBy: 'Player2', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''}
  ],
  [
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''}
  ],
  [
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''}
  ],
  [
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''}
  ]
]

export const arr = [
  [
    {isPlayable: false, isAlive: false, takenBy: 'Player1', wonBy: 'Player1'},
    {isPlayable: false, isAlive: false, takenBy: '', wonBy: 'Player1'},
    {isPlayable: false, isAlive: false, takenBy: '', wonBy: 'Player1'},
    {isPlayable: false, isAlive: false, takenBy: 'Player1', wonBy: 'Player1'},
    {isPlayable: false, isAlive: false, takenBy: 'Player2', wonBy: 'Player1'},
    {isPlayable: false, isAlive: false, takenBy: 'Player2', wonBy: 'Player1'},
    {isPlayable: false, isAlive: false, takenBy: 'Player1', wonBy: 'Player1'},
    {isPlayable: false, isAlive: false, takenBy: '', wonBy: 'Player1'},
    {isPlayable: false, isAlive: false, takenBy: '', wonBy: 'Player1'}
  ],
  [
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''}
  ],
  [
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''}
  ],
  [
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: true, isAlive: true, takenBy: '', wonBy: ''}
  ],
  [
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''}
  ],
  [
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: false, takenBy: 'Player2', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: false, takenBy: 'Player2', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''}
  ],
  [
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''}
  ],
  [
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''}
  ],
  [
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''},
    {isPlayable: false, isAlive: true, takenBy: '', wonBy: ''}
  ]
]


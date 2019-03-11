const {doesMoveSend2Dead} = require('../../../lib/medAiV2/lib/doesMoveSend2Dead')

test('determine if where the opponent is sent is dead', () => {
  const expected = alteredAiDb
  doesMoveSend2Dead(arr, aiDb, 1, 0, aiDb[0][1])
  const actual = aiDb
  expect(actual).toEqual(expected)
})

test('determine if where the opponent is sent is the same and move is win', () => {
  const expected = alteredAiDb2
  doesMoveSend2Dead(arr, aiDb, 0, 0, aiDb[0][0])
  const actual = aiDb
  expect(actual).toEqual(expected)
})

test('determine if where the opponent is sent is same', () => {
  const expected = alteredAiDb3
  doesMoveSend2Dead(arr2, aiDb2, 1, 1, aiDb2[1][1])
  const actual = aiDb2
  expect(actual).toEqual(expected)
})

const arr = [
  [
    {wonBy: ''},
    {wonBy: ''},
    {wonBy: ''},
    {wonBy: ''},
    {wonBy: ''},
    {wonBy: ''},
    {wonBy: ''},
    {wonBy: ''},
    {wonBy: ''}
  ],
  [
    {wonBy: 'oldFart'},
    {wonBy: ''},
    {wonBy: ''},
    {wonBy: ''},
    {wonBy: ''},
    {wonBy: ''},
    {wonBy: ''},
    {wonBy: ''},
    {wonBy: ''}
  ]
]

const arr2 = [
  [
    {wonBy: ''},
    {wonBy: ''},
    {wonBy: ''},
    {wonBy: ''},
    {wonBy: ''},
    {wonBy: ''},
    {wonBy: ''},
    {wonBy: ''},
    {wonBy: ''}
  ],
  [
    {wonBy: ''},
    {wonBy: ''},
    {wonBy: ''},
    {wonBy: ''},
    {wonBy: ''},
    {wonBy: ''},
    {wonBy: ''},
    {wonBy: ''},
    {wonBy: ''}
  ]
]

const aiDb = [
  [
    {deadMini: false, sends2Dead: false, sends2Same: false, win: true},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false}
  ],
  [
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false}
  ]
]

const alteredAiDb = [
  [
    {deadMini: false, sends2Dead: false, sends2Same: false, win: true},
    {deadMini: false, sends2Dead: true, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false}
  ],
  [
    {deadMini: true, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false}
  ]
]

const alteredAiDb2 = [
  [
    {deadMini: false, sends2Dead: true, sends2Same: false, win: true},
    {deadMini: false, sends2Dead: true, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false}
  ],
  [
    {deadMini: true, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false}
  ]
]

const aiDb2 = [
  [
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false}
  ],
  [
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false}
  ]
]

const alteredAiDb3 = [
  [
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false}
  ],
  [
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: true, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false},
    {deadMini: false, sends2Dead: false, sends2Same: false, win: false}
  ]
]

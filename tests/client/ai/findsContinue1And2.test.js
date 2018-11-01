const {findsContinue1And2} = require('../../../lib/medAiV2/lib/getInfoV2')

test('takes counted, assigns boolean to aiDb according to count', () => {
  const expected = alteredAiDb
  findsContinue1And2(counted, 0, aiDb, true)
  const actual = aiDb
  expect(actual).toEqual(expected)
})

test('takes counted, assigns true to continue1 || continue2 accordingly', () => {
  const expected = bigAlteredAiDb
  findsContinue1And2(counted, 0, bigAiDb, false)
  const actual = bigAiDb
  expect(actual).toEqual(expected)
})

const counted = [
  {value: 4, count: 2},
  {value: 2, count: 2},
  {value: 3, count: 1},
  {value: 7, count: 1},
  {value: 0, count: 1},
  {value: 8, count: 1}
]

const aiDb = [
  [
    {continue1: false, continue2: false},
    {continue1: false, continue2: false},
    {continue1: false, continue2: false},
    {continue1: false, continue2: false},
    {continue1: false, continue2: false},
    {continue1: false, continue2: false},
    {continue1: false, continue2: false},
    {continue1: false, continue2: false},
    {continue1: false, continue2: false}
  ]
]

const alteredAiDb = [
  [
    {continue1: true, continue2: false},
    {continue1: false, continue2: false},
    {continue1: false, continue2: true},
    {continue1: true, continue2: false},
    {continue1: false, continue2: true},
    {continue1: false, continue2: false},
    {continue1: false, continue2: false},
    {continue1: true, continue2: false},
    {continue1: true, continue2: false}
  ]
]

const bigAiDb = [
  [
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false}
  ],
  [
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false}
  ],
  [
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false}
  ],
  [
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false}
  ],
  [
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false}
  ],
  [
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false}
  ],
  [
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false}
  ],
  [
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false}
  ],
  [
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false}
  ]
]

const bigAlteredAiDb = [
  [
    {bigContinue1: true, bigContinue2: false},
    {bigContinue1: true, bigContinue2: false},
    {bigContinue1: true, bigContinue2: false},
    {bigContinue1: true, bigContinue2: false},
    {bigContinue1: true, bigContinue2: false},
    {bigContinue1: true, bigContinue2: false},
    {bigContinue1: true, bigContinue2: false},
    {bigContinue1: true, bigContinue2: false},
    {bigContinue1: true, bigContinue2: false}
  ],
  [
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false}
  ],
  [
    {bigContinue1: false, bigContinue2: true},
    {bigContinue1: false, bigContinue2: true},
    {bigContinue1: false, bigContinue2: true},
    {bigContinue1: false, bigContinue2: true},
    {bigContinue1: false, bigContinue2: true},
    {bigContinue1: false, bigContinue2: true},
    {bigContinue1: false, bigContinue2: true},
    {bigContinue1: false, bigContinue2: true},
    {bigContinue1: false, bigContinue2: true}
  ],
  [
    {bigContinue1: true, bigContinue2: false},
    {bigContinue1: true, bigContinue2: false},
    {bigContinue1: true, bigContinue2: false},
    {bigContinue1: true, bigContinue2: false},
    {bigContinue1: true, bigContinue2: false},
    {bigContinue1: true, bigContinue2: false},
    {bigContinue1: true, bigContinue2: false},
    {bigContinue1: true, bigContinue2: false},
    {bigContinue1: true, bigContinue2: false}
  ],
  [
    {bigContinue1: false, bigContinue2: true},
    {bigContinue1: false, bigContinue2: true},
    {bigContinue1: false, bigContinue2: true},
    {bigContinue1: false, bigContinue2: true},
    {bigContinue1: false, bigContinue2: true},
    {bigContinue1: false, bigContinue2: true},
    {bigContinue1: false, bigContinue2: true},
    {bigContinue1: false, bigContinue2: true},
    {bigContinue1: false, bigContinue2: true}
  ],
  [
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false}
  ],
  [
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false},
    {bigContinue1: false, bigContinue2: false}
  ],
  [
    {bigContinue1: true, bigContinue2: false},
    {bigContinue1: true, bigContinue2: false},
    {bigContinue1: true, bigContinue2: false},
    {bigContinue1: true, bigContinue2: false},
    {bigContinue1: true, bigContinue2: false},
    {bigContinue1: true, bigContinue2: false},
    {bigContinue1: true, bigContinue2: false},
    {bigContinue1: true, bigContinue2: false},
    {bigContinue1: true, bigContinue2: false}
  ],
  [
    {bigContinue1: true, bigContinue2: false},
    {bigContinue1: true, bigContinue2: false},
    {bigContinue1: true, bigContinue2: false},
    {bigContinue1: true, bigContinue2: false},
    {bigContinue1: true, bigContinue2: false},
    {bigContinue1: true, bigContinue2: false},
    {bigContinue1: true, bigContinue2: false},
    {bigContinue1: true, bigContinue2: false},
    {bigContinue1: true, bigContinue2: false}
  ]
]

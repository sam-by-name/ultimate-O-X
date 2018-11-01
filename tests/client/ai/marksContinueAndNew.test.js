const {marksContinueAndNew} = require('../../../lib/medAiV2/lib/getInfoV2')

test('splits and marks continue and new by count', () => {
  const expected = alteredAiDb
  marksContinueAndNew(sorted, 0, aiDb, true)
  const actual = aiDb
  expect(actual).toEqual(expected)
})

test('splits and marks continue and new by count', () => {
  const expected = bigAlteredAiDb
  marksContinueAndNew(sorted, 0, bigAiDb, false)
  const actual = bigAiDb
  expect(actual).toEqual(expected)
})

const sorted = [
  {value: 0, count: 2},
  {value: 4, count: 2},
  {value: 8, count: 2},
  {value: 3, count: 1},
  {value: 2, count: 1},
  {value: 7, count: 1}
]

const aiDb = [
  [
    {continueAndNew: false, continueAndMultiNew: false},
    {continueAndNew: false, continueAndMultiNew: false},
    {continueAndNew: false, continueAndMultiNew: false},
    {continueAndNew: false, continueAndMultiNew: false},
    {continueAndNew: false, continueAndMultiNew: false},
    {continueAndNew: false, continueAndMultiNew: false},
    {continueAndNew: false, continueAndMultiNew: false},
    {continueAndNew: false, continueAndMultiNew: false},
    {continueAndNew: false, continueAndMultiNew: false}
  ]
]

const alteredAiDb = [
  [
    {continueAndNew: false, continueAndMultiNew: true},
    {continueAndNew: false, continueAndMultiNew: false},
    {continueAndNew: true, continueAndMultiNew: false},
    {continueAndNew: true, continueAndMultiNew: false},
    {continueAndNew: false, continueAndMultiNew: true},
    {continueAndNew: false, continueAndMultiNew: false},
    {continueAndNew: false, continueAndMultiNew: false},
    {continueAndNew: true, continueAndMultiNew: false},
    {continueAndNew: false, continueAndMultiNew: true}
  ]
]

const bigAiDb = [
  [
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false}
  ],
  [
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false}
  ],
  [
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false}
  ],
  [
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false}
  ],
  [
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false}
  ],
  [
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false}
  ],
  [
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false}
  ],
  [
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false}
  ],
  [
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false}
  ]
]

const bigAlteredAiDb = [
  [
    {bigContinueAndNew: false, bigContinueAndMultiNew: true},
    {bigContinueAndNew: false, bigContinueAndMultiNew: true},
    {bigContinueAndNew: false, bigContinueAndMultiNew: true},
    {bigContinueAndNew: false, bigContinueAndMultiNew: true},
    {bigContinueAndNew: false, bigContinueAndMultiNew: true},
    {bigContinueAndNew: false, bigContinueAndMultiNew: true},
    {bigContinueAndNew: false, bigContinueAndMultiNew: true},
    {bigContinueAndNew: false, bigContinueAndMultiNew: true},
    {bigContinueAndNew: false, bigContinueAndMultiNew: true}
  ],
  [
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false}
  ],
  [
    {bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinueAndNew: true, bigContinueAndMultiNew: false}
  ],
  [
    {bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinueAndNew: true, bigContinueAndMultiNew: false}
  ],
  [
    {bigContinueAndNew: false, bigContinueAndMultiNew: true},
    {bigContinueAndNew: false, bigContinueAndMultiNew: true},
    {bigContinueAndNew: false, bigContinueAndMultiNew: true},
    {bigContinueAndNew: false, bigContinueAndMultiNew: true},
    {bigContinueAndNew: false, bigContinueAndMultiNew: true},
    {bigContinueAndNew: false, bigContinueAndMultiNew: true},
    {bigContinueAndNew: false, bigContinueAndMultiNew: true},
    {bigContinueAndNew: false, bigContinueAndMultiNew: true},
    {bigContinueAndNew: false, bigContinueAndMultiNew: true}
  ],
  [
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false}
  ],
  [
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinueAndNew: false, bigContinueAndMultiNew: false}
  ],
  [
    {bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinueAndNew: true, bigContinueAndMultiNew: false}
  ],
  [
    {bigContinueAndNew: false, bigContinueAndMultiNew: true},
    {bigContinueAndNew: false, bigContinueAndMultiNew: true},
    {bigContinueAndNew: false, bigContinueAndMultiNew: true},
    {bigContinueAndNew: false, bigContinueAndMultiNew: true},
    {bigContinueAndNew: false, bigContinueAndMultiNew: true},
    {bigContinueAndNew: false, bigContinueAndMultiNew: true},
    {bigContinueAndNew: false, bigContinueAndMultiNew: true},
    {bigContinueAndNew: false, bigContinueAndMultiNew: true},
    {bigContinueAndNew: false, bigContinueAndMultiNew: true}
  ]
]

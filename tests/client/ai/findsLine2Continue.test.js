const {findsLine2Continue} = require('../../../lib/medAiV2/lib/getInfoV2')

test('finds and marks small lines', () => {
  const expected = alteredAiDb
  findsLine2Continue('23', '014578', 0, aiDb, true)
  const actual = aiDb
  expect(actual).toEqual(expected)
})

test('finds and marks big lines', () => {
  const expected = bigAlteredAiDb
  findsLine2Continue('23', '014578', 0, bigAiDb, false)
  const actual = bigAiDb
  expect(actual).toEqual(expected)
})

const aiDb = [
  [
    {continue1: false, continue2: false, continueAndNew: false, continueAndMultiNew: false},
    {continue1: false, continue2: false, continueAndNew: false, continueAndMultiNew: false},
    {continue1: false, continue2: false, continueAndNew: false, continueAndMultiNew: false},
    {continue1: false, continue2: false, continueAndNew: false, continueAndMultiNew: false},
    {continue1: false, continue2: false, continueAndNew: false, continueAndMultiNew: false},
    {continue1: false, continue2: false, continueAndNew: false, continueAndMultiNew: false},
    {continue1: false, continue2: false, continueAndNew: false, continueAndMultiNew: false},
    {continue1: false, continue2: false, continueAndNew: false, continueAndMultiNew: false},
    {continue1: false, continue2: false, continueAndNew: false, continueAndMultiNew: false}
  ]
]

const alteredAiDb = [
  [
    {continue1: true, continue2: false, continueAndNew: true, continueAndMultiNew: false},
    {continue1: true, continue2: false, continueAndNew: true, continueAndMultiNew: false},
    {continue1: false, continue2: false, continueAndNew: false, continueAndMultiNew: false},
    {continue1: false, continue2: false, continueAndNew: false, continueAndMultiNew: false},
    {continue1: true, continue2: false, continueAndNew: false, continueAndMultiNew: true},
    {continue1: false, continue2: true, continueAndNew: false, continueAndMultiNew: false},
    {continue1: false, continue2: false, continueAndNew: false, continueAndMultiNew: false},
    {continue1: false, continue2: false, continueAndNew: false, continueAndMultiNew: false},
    {continue1: true, continue2: false, continueAndNew: true, continueAndMultiNew: false}
  ]
]

const bigAiDb = [
  [
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false}
  ],
  [
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false}
  ],
  [
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false}
  ],
  [
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false}
  ],
  [
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false}
  ],
  [
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false}
  ],
  [
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false}
  ],
  [
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false}
  ],
  [
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false}
  ]
]

const bigAlteredAiDb = [
  [
    {bigContinue1: true, bigContinue2: false, bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinue1: true, bigContinue2: false, bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinue1: true, bigContinue2: false, bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinue1: true, bigContinue2: false, bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinue1: true, bigContinue2: false, bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinue1: true, bigContinue2: false, bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinue1: true, bigContinue2: false, bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinue1: true, bigContinue2: false, bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinue1: true, bigContinue2: false, bigContinueAndNew: true, bigContinueAndMultiNew: false}
  ],
  [
    {bigContinue1: true, bigContinue2: false, bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinue1: true, bigContinue2: false, bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinue1: true, bigContinue2: false, bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinue1: true, bigContinue2: false, bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinue1: true, bigContinue2: false, bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinue1: true, bigContinue2: false, bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinue1: true, bigContinue2: false, bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinue1: true, bigContinue2: false, bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinue1: true, bigContinue2: false, bigContinueAndNew: true, bigContinueAndMultiNew: false}
  ],
  [
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false}
  ],
  [
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false}
  ],
  [
    {bigContinue1: true, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: true},
    {bigContinue1: true, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: true},
    {bigContinue1: true, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: true},
    {bigContinue1: true, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: true},
    {bigContinue1: true, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: true},
    {bigContinue1: true, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: true},
    {bigContinue1: true, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: true},
    {bigContinue1: true, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: true},
    {bigContinue1: true, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: true}
  ],
  [
    {bigContinue1: false, bigContinue2: true, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: true, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: true, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: true, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: true, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: true, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: true, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: true, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: true, bigContinueAndNew: false, bigContinueAndMultiNew: false}
  ],
  [
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false}
  ],
  [
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false},
    {bigContinue1: false, bigContinue2: false, bigContinueAndNew: false, bigContinueAndMultiNew: false}
  ],
  [
    {bigContinue1: true, bigContinue2: false, bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinue1: true, bigContinue2: false, bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinue1: true, bigContinue2: false, bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinue1: true, bigContinue2: false, bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinue1: true, bigContinue2: false, bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinue1: true, bigContinue2: false, bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinue1: true, bigContinue2: false, bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinue1: true, bigContinue2: false, bigContinueAndNew: true, bigContinueAndMultiNew: false},
    {bigContinue1: true, bigContinue2: false, bigContinueAndNew: true, bigContinueAndMultiNew: false}
  ]
]

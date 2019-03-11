const {findsNewLine} = require('../../../lib/medAiV2/lib/getInfoV2')

test('findsNewLine, sets aiDb newLine flags', () => {
  const expected = alteredAiDb
  findsNewLine('25678', 0, aiDb, true)
  const actual = aiDb
  expect(actual).toEqual(expected)
})

test('findsNewLine, sets aiDb newLine flags', () => {
  const expected = bigAlteredAiDb
  findsNewLine('25678', 0, bigAiDb, false)
  const actual = bigAiDb
  expect(actual).toEqual(expected)
})

const aiDb = [
  [
    {startsNew: false, startsMostNew: false},
    {startsNew: false, startsMostNew: false},
    {startsNew: false, startsMostNew: false},
    {startsNew: false, startsMostNew: false},
    {startsNew: false, startsMostNew: false},
    {startsNew: false, startsMostNew: false},
    {startsNew: false, startsMostNew: false},
    {startsNew: false, startsMostNew: false},
    {startsNew: false, startsMostNew: false}
  ]
]

const alteredAiDb = [
  [
    {startsNew: false, startsMostNew: false},
    {startsNew: false, startsMostNew: false},
    {startsNew: true, startsMostNew: false},
    {startsNew: false, startsMostNew: false},
    {startsNew: false, startsMostNew: false},
    {startsNew: true, startsMostNew: false},
    {startsNew: true, startsMostNew: false},
    {startsNew: true, startsMostNew: false},
    {startsNew: false, startsMostNew: true}
  ]
]

const bigAiDb = [
  [
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false}
  ],
  [
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false}
  ],
  [
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false}
  ],
  [
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false}
  ],
  [
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false}
  ],
  [
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false}
  ],
  [
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false}
  ],
  [
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false}
  ],
  [
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false}
  ]
]

const bigAlteredAiDb = [
  [
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false}
  ],
  [
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false}
  ],
  [
    {bigStartsNew: true, bigStartsMostNew: false},
    {bigStartsNew: true, bigStartsMostNew: false},
    {bigStartsNew: true, bigStartsMostNew: false},
    {bigStartsNew: true, bigStartsMostNew: false},
    {bigStartsNew: true, bigStartsMostNew: false},
    {bigStartsNew: true, bigStartsMostNew: false},
    {bigStartsNew: true, bigStartsMostNew: false},
    {bigStartsNew: true, bigStartsMostNew: false},
    {bigStartsNew: true, bigStartsMostNew: false}
  ],
  [
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false}
  ],
  [
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false},
    {bigStartsNew: false, bigStartsMostNew: false}
  ],
  [
    {bigStartsNew: true, bigStartsMostNew: false},
    {bigStartsNew: true, bigStartsMostNew: false},
    {bigStartsNew: true, bigStartsMostNew: false},
    {bigStartsNew: true, bigStartsMostNew: false},
    {bigStartsNew: true, bigStartsMostNew: false},
    {bigStartsNew: true, bigStartsMostNew: false},
    {bigStartsNew: true, bigStartsMostNew: false},
    {bigStartsNew: true, bigStartsMostNew: false},
    {bigStartsNew: true, bigStartsMostNew: false}
  ],
  [
    {bigStartsNew: true, bigStartsMostNew: false},
    {bigStartsNew: true, bigStartsMostNew: false},
    {bigStartsNew: true, bigStartsMostNew: false},
    {bigStartsNew: true, bigStartsMostNew: false},
    {bigStartsNew: true, bigStartsMostNew: false},
    {bigStartsNew: true, bigStartsMostNew: false},
    {bigStartsNew: true, bigStartsMostNew: false},
    {bigStartsNew: true, bigStartsMostNew: false},
    {bigStartsNew: true, bigStartsMostNew: false}
  ],
  [
    {bigStartsNew: true, bigStartsMostNew: false},
    {bigStartsNew: true, bigStartsMostNew: false},
    {bigStartsNew: true, bigStartsMostNew: false},
    {bigStartsNew: true, bigStartsMostNew: false},
    {bigStartsNew: true, bigStartsMostNew: false},
    {bigStartsNew: true, bigStartsMostNew: false},
    {bigStartsNew: true, bigStartsMostNew: false},
    {bigStartsNew: true, bigStartsMostNew: false},
    {bigStartsNew: true, bigStartsMostNew: false}
  ],
  [
    {bigStartsNew: false, bigStartsMostNew: true},
    {bigStartsNew: false, bigStartsMostNew: true},
    {bigStartsNew: false, bigStartsMostNew: true},
    {bigStartsNew: false, bigStartsMostNew: true},
    {bigStartsNew: false, bigStartsMostNew: true},
    {bigStartsNew: false, bigStartsMostNew: true},
    {bigStartsNew: false, bigStartsMostNew: true},
    {bigStartsNew: false, bigStartsMostNew: true},
    {bigStartsNew: false, bigStartsMostNew: true}
  ]
]

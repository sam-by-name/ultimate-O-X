const {isMoveHarikari} = require('../../../lib/medAiV2/lib/isMoveHarikari')
const {
  aiDb1, alteredAiDb1, aiDb2, alteredAiDb2, aiDb3, alteredAiDb3,
  aiDb4, alteredAiDb4, aiDb5, alteredAiDb5, aiDb6, alteredAiDb6,
  aiDb7, alteredAiDb7, aiDb8, alteredAiDb8, aiDb9, alteredAiDb9,
  huDb1, alteredHuDb1, huDb2, alteredHuDb2, huDb3, alteredHuDb3,
  huDb4, alteredHuDb4, huDb5, alteredHuDb5, huDb6, alteredHuDb6,
  huDb7, alteredHuDb7, huDb8, alteredHuDb8, huDb9, alteredHuDb9
} = require('./lib/harikariMock')

test('sends2Same is a vicDeny, ai', () => {
  const expected = alteredAiDb1

  let x = aiDb1[0][0]
  isMoveHarikari(aiDb1, 0, x, 1, true)

  const actual = aiDb1
  expect(actual).toEqual(expected)
})

test('sends2Same is harikari, ai', () => {
  const expected = alteredAiDb2

  let x = aiDb2[0][0]
  isMoveHarikari(aiDb2, 0, x, 1, true)

  const actual = aiDb2
  expect(actual).toEqual(expected)
})

test('sends2Dead and is not a deny is harikari, ai', () => {
  const expected = alteredAiDb3

  let x = aiDb3[0][1]
  isMoveHarikari(aiDb3, 1, x, 1, true)

  const actual = aiDb3
  expect(actual).toEqual(expected)
})

test('sends2Dead is harikari, ai', () => {
  const expected = alteredAiDb4

  let x = aiDb4[0][1]
  isMoveHarikari(aiDb4, 1, x, 2, true)

  const actual = aiDb4
  expect(actual).toEqual(expected)
})

test('sends2Dead and is a deny is vicDeny, ai', () => {
  const expected = alteredAiDb5

  let x = aiDb5[0][1]
  isMoveHarikari(aiDb5, 1, x, 1, true)

  const actual = aiDb5
  expect(actual).toEqual(expected)
})

test('sends2Same, is a vicDeny and there are no other vics, is vicDeny, ai', () => {
  const expected = alteredAiDb6

  let x = aiDb6[0][0]
  isMoveHarikari(aiDb6, 0, x, 1, true)

  const actual = aiDb6
  expect(actual).toEqual(expected)
})

test('sends2Same, is a vicDeny and there are other vics, is harikari, ai', () => {
  const expected = alteredAiDb7

  let x = aiDb7[0][0]
  isMoveHarikari(aiDb7, 0, x, 1, true)

  const actual = aiDb7
  expect(actual).toEqual(expected)
})

test('sends2Same, is not a deny and there are vics, is harikari, ai', () => {
  const expected = alteredAiDb8

  let x = aiDb8[0][0]
  isMoveHarikari(aiDb8, 0, x, 1, true)

  const actual = aiDb8
  expect(actual).toEqual(expected)
})

test('does not send2Same or dead, destination has a op vic, is harikari, ai', () => {
  const expected = alteredAiDb9

  let x = aiDb9[0][0]
  isMoveHarikari(aiDb9, 0, x, 1, true)

  const actual = aiDb9
  expect(actual).toEqual(expected)
})

// human version below

test('sends2Same is a vicDeny, hu', () => {
  const expected = alteredHuDb1

  let x = huDb1[0][0]
  isMoveHarikari(huDb1, 0, x, 1, false)

  const actual = huDb1
  expect(actual).toEqual(expected)
})

test('sends2Same is harikari, hu', () => {
  const expected = alteredHuDb2

  let x = huDb2[0][0]
  isMoveHarikari(huDb2, 0, x, 1, false)

  const actual = huDb2
  expect(actual).toEqual(expected)
})

test('sends2Dead and is not a deny is harikari, hu', () => {
  const expected = alteredHuDb3

  let x = huDb3[0][1]
  isMoveHarikari(huDb3, 1, x, 1, true)

  const actual = huDb3
  expect(actual).toEqual(expected)
})

test('sends2Dead is harikari, hu', () => {
  const expected = alteredHuDb4

  let x = huDb4[0][1]
  isMoveHarikari(huDb4, 1, x, 2, false)

  const actual = huDb4
  expect(actual).toEqual(expected)
})

test('sends2Dead and is a deny is vicDeny, hu', () => {
  const expected = alteredHuDb5

  let x = huDb5[0][1]
  isMoveHarikari(huDb5, 1, x, 1, false)

  const actual = huDb5
  expect(actual).toEqual(expected)
})

test('sends2Same, is a vicDeny and there are no other vics, is vicDeny, hu', () => {
  const expected = alteredHuDb6

  let x = huDb6[0][0]
  isMoveHarikari(huDb6, 0, x, 1, false)

  const actual = huDb6
  expect(actual).toEqual(expected)
})

test('sends2Same, is a vicDeny and there are other vics, is harikari, hu', () => {
  const expected = alteredHuDb7

  let x = huDb7[0][0]
  isMoveHarikari(huDb7, 0, x, 1, false)

  const actual = huDb7
  expect(actual).toEqual(expected)
})

test('sends2Same, is not a deny and there are vics, is harikari, hu', () => {
  const expected = alteredHuDb8

  let x = huDb8[0][0]
  isMoveHarikari(huDb8, 0, x, 1, false)

  const actual = huDb8
  expect(actual).toEqual(expected)
})

test('does not send2Same or dead, destination has a op vic, is harikari, hu', () => {
  const expected = alteredHuDb9

  let x = huDb9[0][0]
  isMoveHarikari(huDb9, 0, x, 1, false)

  const actual = huDb9
  expect(actual).toEqual(expected)
})

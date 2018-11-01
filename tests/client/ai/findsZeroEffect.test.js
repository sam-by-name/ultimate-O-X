const {findsZeroEffect} = require('../../../lib/medAiV2/lib/getInfoV2')

test('checks that move has no other outcomes and set move as zeroEffect if so', () => {
  const expected = alteredAiDb
  findsZeroEffect(aiDb)
  const actual = aiDb
  expect(actual).toEqual(expected)
})

const aiDb = [
  {
    victoryDeny: true, deny: false, bigContinue2: false, bigContinueAndMultiNew: false, bigContinue1: false, bigContinueAndNew: false, bigStartsMostNew: false, bigStartsNew: false, continue2: false, continueAndMultiNew: false, continue1: false, continueAndNew: false, startsMostNew: false, startsNew: false, zeroEffect: false
  },
  {
    victoryDeny: false, deny: false, bigContinue2: false, bigContinueAndMultiNew: false, bigContinue1: false, bigContinueAndNew: false, bigStartsMostNew: false, bigStartsNew: false, continue2: false, continueAndMultiNew: false, continue1: false, continueAndNew: false, startsMostNew: false, startsNew: false, zeroEffect: false
  },
  {
    victoryDeny: false, deny: false, bigContinue2: false, bigContinueAndMultiNew: false, bigContinue1: true, bigContinueAndNew: false, bigStartsMostNew: false, bigStartsNew: false, continue2: false, continueAndMultiNew: false, continue1: false, continueAndNew: false, startsMostNew: false, startsNew: false, zeroEffect: false
  },
  {
    victoryDeny: false, deny: false, bigContinue2: false, bigContinueAndMultiNew: false, bigContinue1: false, bigContinueAndNew: false, bigStartsMostNew: false, bigStartsNew: false, continue2: false, continueAndMultiNew: false, continue1: false, continueAndNew: false, startsMostNew: false, startsNew: false, zeroEffect: false
  },
  {
    victoryDeny: false, deny: false, bigContinue2: false, bigContinueAndMultiNew: false, bigContinue1: false, bigContinueAndNew: false, bigStartsMostNew: false, bigStartsNew: false, continue2: false, continueAndMultiNew: false, continue1: false, continueAndNew: false, startsMostNew: false, startsNew: false, zeroEffect: false
  },
  {
    victoryDeny: false, deny: true, bigContinue2: false, bigContinueAndMultiNew: false, bigContinue1: false, bigContinueAndNew: false, bigStartsMostNew: false, bigStartsNew: false, continue2: false, continueAndMultiNew: false, continue1: false, continueAndNew: false, startsMostNew: false, startsNew: false, zeroEffect: false
  },
  {
    victoryDeny: false, deny: false, bigContinue2: false, bigContinueAndMultiNew: false, bigContinue1: false, bigContinueAndNew: false, bigStartsMostNew: false, bigStartsNew: false, continue2: false, continueAndMultiNew: false, continue1: true, continueAndNew: false, startsMostNew: false, startsNew: false, zeroEffect: false
  },
  {
    victoryDeny: false, deny: false, bigContinue2: false, bigContinueAndMultiNew: false, bigContinue1: false, bigContinueAndNew: false, bigStartsMostNew: false, bigStartsNew: false, continue2: false, continueAndMultiNew: false, continue1: false, continueAndNew: false, startsMostNew: false, startsNew: false, zeroEffect: false
  },
  {
    victoryDeny: false, deny: false, bigContinue2: false, bigContinueAndMultiNew: false, bigContinue1: false, bigContinueAndNew: false, bigStartsMostNew: false, bigStartsNew: false, continue2: false, continueAndMultiNew: false, continue1: false, continueAndNew: false, startsMostNew: false, startsNew: false, zeroEffect: false
  }
]

const alteredAiDb = [
  {
    victoryDeny: true, deny: false, bigContinue2: false, bigContinueAndMultiNew: false, bigContinue1: false, bigContinueAndNew: false, bigStartsMostNew: false, bigStartsNew: false, continue2: false, continueAndMultiNew: false, continue1: false, continueAndNew: false, startsMostNew: false, startsNew: false, zeroEffect: false
  },
  {
    victoryDeny: false, deny: false, bigContinue2: false, bigContinueAndMultiNew: false, bigContinue1: false, bigContinueAndNew: false, bigStartsMostNew: false, bigStartsNew: false, continue2: false, continueAndMultiNew: false, continue1: false, continueAndNew: false, startsMostNew: false, startsNew: false, zeroEffect: true
  },
  {
    victoryDeny: false, deny: false, bigContinue2: false, bigContinueAndMultiNew: false, bigContinue1: true, bigContinueAndNew: false, bigStartsMostNew: false, bigStartsNew: false, continue2: false, continueAndMultiNew: false, continue1: false, continueAndNew: false, startsMostNew: false, startsNew: false, zeroEffect: false
  },
  {
    victoryDeny: false, deny: false, bigContinue2: false, bigContinueAndMultiNew: false, bigContinue1: false, bigContinueAndNew: false, bigStartsMostNew: false, bigStartsNew: false, continue2: false, continueAndMultiNew: false, continue1: false, continueAndNew: false, startsMostNew: false, startsNew: false, zeroEffect: true
  },
  {
    victoryDeny: false, deny: false, bigContinue2: false, bigContinueAndMultiNew: false, bigContinue1: false, bigContinueAndNew: false, bigStartsMostNew: false, bigStartsNew: false, continue2: false, continueAndMultiNew: false, continue1: false, continueAndNew: false, startsMostNew: false, startsNew: false, zeroEffect: true
  },
  {
    victoryDeny: false, deny: true, bigContinue2: false, bigContinueAndMultiNew: false, bigContinue1: false, bigContinueAndNew: false, bigStartsMostNew: false, bigStartsNew: false, continue2: false, continueAndMultiNew: false, continue1: false, continueAndNew: false, startsMostNew: false, startsNew: false, zeroEffect: false
  },
  {
    victoryDeny: false, deny: false, bigContinue2: false, bigContinueAndMultiNew: false, bigContinue1: false, bigContinueAndNew: false, bigStartsMostNew: false, bigStartsNew: false, continue2: false, continueAndMultiNew: false, continue1: true, continueAndNew: false, startsMostNew: false, startsNew: false, zeroEffect: false
  },
  {
    victoryDeny: false, deny: false, bigContinue2: false, bigContinueAndMultiNew: false, bigContinue1: false, bigContinueAndNew: false, bigStartsMostNew: false, bigStartsNew: false, continue2: false, continueAndMultiNew: false, continue1: false, continueAndNew: false, startsMostNew: false, startsNew: false, zeroEffect: true
  },
  {
    victoryDeny: false, deny: false, bigContinue2: false, bigContinueAndMultiNew: false, bigContinue1: false, bigContinueAndNew: false, bigStartsMostNew: false, bigStartsNew: false, continue2: false, continueAndMultiNew: false, continue1: false, continueAndNew: false, startsMostNew: false, startsNew: false, zeroEffect: true
  }
]
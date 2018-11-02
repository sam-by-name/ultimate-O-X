export const aiFirstGoScore = (x) => {
  if (x.victory) x.totScore += 10000000
  if (x.victoryDeny) x.totScore += 2
  if (x.win) x.totScore += 1
  if (x.deny) x.totScore += 0.5
  if (x.continue2) x.totScore += 0.25
  if (x.continue1) x.totScore += 0.15
  if (x.continueAndMultiNew) x.totScore += 0.3
  if (x.continueAndNew) x.totScore += 0.2
  if (x.startsMostNew) x.totScore += 0.2
  if (x.startsNew) x.totScore += 0.1

  if (x.aiNeeds4Vic) x.totScore += 2
  if (x.huNeeds4Vic && (x.win || x.deny)) x.totScore += 2

  if (x.bigContinue2) x.totScore += 0.25
  if (x.bigContinue1) x.totScore += 0.15
  if (x.bigContinueAndMultiNew) x.totScore += 0.3
  if (x.bigContinueAndNew) x.totScore += 0.2
  if (x.bigStartsMostNew) x.totScore += 0.2
  if (x.bigStartsNew) x.totScore += 0.1

  if (x.zeroEffect) x.totScore -= 0.5
  if (x.sends2Dead) x.totScore -= 0.5
  if (x.harikari) x.totScore -= 1000
}

export const ai2ndGoScore = (z, x) => {
  let temp = 0
  if (z.victory) temp += 100
  if (z.victoryDeny) temp += 1
  if (z.win) temp += 1
  if (z.deny) temp += 0.5
  if (z.continue2) temp += 0.25
  if (z.continue1) temp += 0.15
  if (z.continueAndMultiNew) temp += 0.3
  if (z.continueAndNew) temp += 0.2
  if (z.startsMostNew) temp += 0.2
  if (z.startsNew) temp += 0.1

  if (z.aiNeeds4Vic) temp += 2
  if (z.huNeeds4Vic && (z.win || z.deny)) temp += 2

  if (z.bigContinue2) temp += 0.25
  if (z.bigContinue1) temp += 0.15
  if (z.bigContinueAndMultiNew) temp += 0.3
  if (z.bigContinueAndNew) temp += 0.2
  if (z.bigStartsMostNew) temp += 0.2
  if (z.bigStartsNew) temp += 0.1

  if (z.zeroEffect) temp -= 0.5
  if (z.sends2Dead) temp -= 0.5 // is leads2Dead
  if (z.harikari) temp -= 100
  x.push(temp)
}

export const humanFirstGoScore = (y, x) => {
  let temp = 0
  if (y.humanVic) temp -= 1000
  if (y.victoryDeny) temp -= 2
  if (y.win) temp -= 1
  if (y.deny) temp -= 0.5
  if (y.continue2) temp -= 0.25
  if (y.continue1) temp -= 0.15
  if (y.continueAndMultiNew) temp -= 0.3
  if (y.continueAndNew) temp -= 0.2
  if (y.startsMostNew) temp -= 0.2
  if (y.startsNew) temp -= 0.1

  if (y.aiNeeds4Vic && (y.win || y.deny)) temp -= 1
  if (y.huNeeds4Vic) temp -= 1

  if (y.bigContinue2) temp -= 0.25
  if (y.bigContinue1) temp -= 0.15
  if (y.bigContinueAndMultiNew) temp -= 0.3
  if (y.bigContinueAndNew) temp -= 0.2
  if (y.bigStartsMostNew) temp -= 0.2
  if (y.bigStartsNew) temp -= 0.1

  if (y.zeroEffect) temp += 0.5
  if (y.sends2Dead) temp += 0.5 // this is more than the ai loses .. ??
  if (y.harikari) temp += 1000 // is ai futureVic
  x.push(temp)
}

export const human2ndGoScore = (y, x) => {
  let temp = 0
  if (y.humanVic) temp -= 100
  if (y.victoryDeny) temp -= 1
  if (y.win) temp -= 1
  if (y.deny) temp -= 0.5
  if (y.continue2) temp -= 0.25
  if (y.continue1) temp -= 0.15
  if (y.continueAndMultiNew) temp -= 0.3
  if (y.continueAndNew) temp -= 0.2
  if (y.startsMostNew) temp -= 0.2
  if (y.startsNew) temp -= 0.1

  if (y.aiNeeds4Vic && (y.win || y.deny)) temp -= 1
  if (y.huNeeds4Vic) temp -= 1

  if (y.bigContinue2) temp -= 0.25
  if (y.bigContinue1) temp -= 0.15
  if (y.bigContinueAndMultiNew) temp -= 0.3
  if (y.bigContinueAndNew) temp -= 0.2
  if (y.bigStartsMostNew) temp -= 0.2
  if (y.bigStartsNew) temp -= 0.1

  if (y.zeroEffect) temp += 0.5
  if (y.sends2Dead) temp += 0.5 // this is more than the ai loses .. ??
  if (y.harikari) temp += 100
  x.push(temp)
}

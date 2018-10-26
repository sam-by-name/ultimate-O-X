import {
  findsMiniGame,
  findsPlayable,
  findsMiniStatus,
  findsWinOrDeny,
  // findsVictory,
  findsLine2Continue,
  findsNewLine,
  findsZeroEffect} from './lib/getInfoV2'

import {createAiArr} from '../gameArrays'
// import gradeHumanWin from './grading/gradeHumanWin'
// import gradeHumanDeny from './grading/gradeHumanDeny'
// import gradeHumanRandom from './grading/gradeHumanRandom'
// import {grade2DeadOr2Same, gradeFuture2DeadOr2Same} from './grading/grade2DeadOr2Same'

export const mediumAiV2 = (arr, ai, human) => {
  let aiDb = createAiArr()
  let mini = findsMiniGame(arr, [], aiDb)
  let coOrds = scans4Possibilities(arr, ai.name, human.name, mini, aiDb, true)
  if (coOrds.length < 2) coOrds = gradeAndSelect(arr, aiDb, ai.name, human.name, coOrds) // if vic has not already been found, grade moves
  return {mini: coOrds[0], cell: coOrds[1]}
}

const scans4Possibilities = (arr, ai, human, mini, aiDb, boo) => {
  let coOrds
  for (let i = 0; i < mini.length; i++) {
    let {aiOwns, playable, humanOwns} =
    findsPlayable(arr, mini[i], ai, human, aiDb, true)
    coOrds = [mini[i]]
    findsWinOrDeny(aiOwns, playable, aiDb, arr, ai, human, coOrds, boo)
    findsWinOrDeny(humanOwns, playable, aiDb, arr, ai, human, coOrds, !boo)
    findsLine2Continue((boo ? aiOwns : humanOwns), playable, mini[i], aiDb, boo)
    findsNewLine(playable, mini[i], aiDb, boo)
    let z = findsMiniStatus(arr, ai, human)
    findsLine2Continue((boo ? z.aiOwns : z.humanOwns), z.playable, mini[i], aiDb, !boo) // for the big game
    findsNewLine(z.playable, mini[i], aiDb, !boo) // for the big game
    findsZeroEffect(aiDb[i])
  }
  return coOrds
}

const gradeAndSelect = (arr, aiDb, ai, human, coOrds) => {
  let allPlayable = getsAllPlayable(aiDb)
  gradesMoves(arr, allPlayable, ai, human, aiDb)
  if (coOrds.length < 2) {
    if (coOrds.length < 2) coOrds = findsHighestScore(allPlayable, coOrds)
  }
  return coOrds
}

const getsAllPlayable = (aiDb) => {
  let allPlayable = []
  for (let i = 0; i < 9; i++) {
    if (aiDb[i][0].miniPlayable) {
      for (let j = 0; j < 9; j++) {
        if (aiDb[i][j].playable) {
          allPlayable.push(aiDb[i][j])
        }
      }
    }
  }
  return allPlayable
}

const findsHighestScore = (allPlayable, coOrds) => {
  allPlayable.sort((a, b) => a.totScore < b.totScore)
  coOrds = allPlayable[0].coOrds
  return coOrds
}

const findsHumanVictory = (arr, ai, human, aiDb) => { // finds mini that human needs to win
  let humanVics = 0
  let {humanOwns, playable} = findsMiniStatus(arr, ai, human)
  let miniHumanNeeds = findsWinOrDeny(humanOwns, playable)
  if (miniHumanNeeds.length) {
    for (let i = 0; i < miniHumanNeeds.length; i++) {
      let humanVicMove = humanWinOrAiDeny(arr, ai, human, miniHumanNeeds[i])
      for (let j = 0; j < humanVicMove.length; j++) {
        humanVics++
        aiDb[miniHumanNeeds[i]][humanVicMove[j]].humanVic = true
      }
    }
  }
  return humanVics
}

const doesMoveSend2Dead = (arr, aiDb, toPlay, mini, x) => {
  if (arr[toPlay][0].wonBy) {
    aiDb[toPlay][0].deadMini = true
    x.sends2Dead = true
  }
  if (x.win && mini === toPlay) {
    x.sends2Dead = true // sends 2 same and now same is dead
  } else if (mini === toPlay) x.sends2Same = true // sends to same but same is not dead
}

const aiFirstGoScore = (x) => {
  if (x.victory) x.totScore += 1000000
  if (x.victoryDeny) x.totScore += 200
  if (x.win) x.totScore += 100
  if (x.deny) x.totScore += 25
  if (x.continue2) x.totScore += 25
  if (x.continue1) x.totScore += 15
  if (x.continueAndMultiNew) x.totScore += 30
  if (x.continueAnNew) x.totScore += 20
  if (x.startsMostNew) x.totScore += 20
  if (x.startsNew) x.totScore += 10
  // if (x.zeroEffect) x.totScore -= 50
  if (x.sends2Dead) x.totScore -= 50
  if (x.harikari) x.totScore -= 1000000
}

const ai2ndGoScore = (x, z) => {
  if (x.victoryDeny) x.totScore += 100
  if (z.win) x.totScore += 100
  if (z.deny) x.totScore += 25
  if (z.continue2) x.totScore += 25
  if (z.continue1) x.totScore += 15
  if (z.continueAndMultiNew) x.totScore += 30
  if (z.continueAnNew) x.totScore += 20
  if (z.startsMostNew) x.totScore += 20
  if (z.startsNew) x.totScore += 10
  // if (z.zeroEffect) x.totScore -= 50
  if (z.sends2Dead) x.totScore -= 50 // is leads2Dead
  if (z.futureHarikari) x.totScore -= 1000
}

const humanFirstGoScore = (y, x) => {
  if (x.victoryDeny) x.totScore -= 100
  if (y.win) x.totScore -= 100
  if (y.deny) x.totScore -= 25
  if (y.continue2) x.totScore -= 25
  if (y.continue1) x.totScore -= 15
  if (y.continueAndMultiNew) x.totScore -= 30
  if (y.continueAnNew) x.totScore -= 20
  if (y.startsMostNew) x.totScore -= 20
  if (y.startsNew) x.totScore -= 10
  if (y.zeroEffect) x.totScore += 50
  if (y.sends2Dead) x.totScore += 200 // this is more than the ai loses .. ??
  if (y.harikari) x.totScore += 10000 // is ai futureVic
}

const human2ndGoScore = (y, x) => {
  if (x.victoryDeny) x.totScore -= 100
  if (y.win) x.totScore -= 100
  if (y.deny) x.totScore -= 25
  if (y.continue2) x.totScore -= 25
  if (y.continue1) x.totScore -= 15
  if (y.continueAndMultiNew) x.totScore -= 30
  if (y.continueAnNew) x.totScore -= 20
  if (y.startsMostNew) x.totScore -= 15
  if (y.startsNew) x.totScore -= 10
  if (y.zeroEffect) x.totScore += 50
  if (y.sends2Dead) x.totScore += 100 // this is more than the ai loses .. ??
  if (y.harikari) x.totScore += 1000
}

const gradesMoves = (arr, allPlayable, ai, human, aiDb) => {
  let allHuVics = findsHumanVictory(arr, ai, human, aiDb)
  for (let i = 0; i < allPlayable.length; i++) {
    let toPlay = Number(allPlayable[i].coOrds[1])
    let mini = allPlayable[i].coOrds[0]
    let x = aiDb[mini][toPlay]
    doesMoveSend2Dead(arr, aiDb, toPlay, mini, x) // or same
    isMoveHarikari(aiDb, toPlay, x, allHuVics)
    aiFirstGoScore(x)
    let tempArr = JSON.parse(JSON.stringify(arr))
    x.win ? mockOutArr(tempArr, mini, toPlay, ai, true) // ai 'pseudo taken 1st' move
      : mockOutArr(tempArr, mini, toPlay, ai, false)
    if (!x.harikari) humanTurn(tempArr, ai, human, x)
  }
}

const humanTurn = (arr, ai, human, x) => {
  let huDb = createAiArr()
  let huMinis = findsMiniGame(arr, [], huDb)
  scans4Possibilities(arr, ai, human, huMinis, huDb, false)
  let huPlayable = getsAllPlayable(huDb)
  for (let j = 0; j < huPlayable.length; j++) {
    let huMini = huPlayable[j].coOrds[0]
    let huToPlay = huPlayable[j].coOrds[1]
    let y = huDb[huMini][huToPlay]
    doesMoveSend2Dead(arr, huDb, huToPlay, huMini, y)
    isMoveHarikari(huDb, huToPlay, y)
    humanFirstGoScore(y, x)
    let tempArr = JSON.parse(JSON.stringify(arr))
    y.win ? mockOutArr(tempArr, huMini, huToPlay, human, true) // human 'pseudo taken 2nd' move, should not use x.win
      : mockOutArr(tempArr, huMini, huToPlay, human, false)
    if (!y.harikari) aiTurn(tempArr, ai, human, x)
  }
}

const aiTurn = (arr, ai, human, x) => {
  let aiDb2 = createAiArr()
  let aiMinis = findsMiniGame(arr, [], aiDb2)
  scans4Possibilities(arr, ai, human, aiMinis, aiDb2, true)
  let aiPlayable = getsAllPlayable(aiDb2)
  for (let i = 0; i < aiPlayable.length; i++) {
    let aiMini = aiPlayable[i].coOrds[0]
    let aiToPlay = aiPlayable[i].coOrds[1]
    let z = aiDb2[aiMini][aiToPlay]
    doesMoveSend2Dead(arr, aiDb2, aiToPlay, aiMini, z)
    isMoveHarikari(aiDb2, aiToPlay, z)
    ai2ndGoScore(x, z)
    let tempArr = JSON.parse(JSON.stringify(arr))
    z.win ? mockOutArr(tempArr, aiMini, aiToPlay, ai, true)
      : mockOutArr(tempArr, aiMini, aiToPlay, ai, false)
    if (!z.futureHarikari && !z.victory) human2ndTurn(tempArr, ai, human, x)
  }
}

const human2ndTurn = (arr, ai, human, x) => {
  let huDb = createAiArr()
  let huMinis = findsMiniGame(arr, [], huDb)
  scans4Possibilities(arr, ai, human, huMinis, huDb, false)
  let huPlayable = getsAllPlayable(huDb)
  for (let j = 0; j < huPlayable.length; j++) {
    let huMini = huPlayable[j].coOrds[0]
    let huToPlay = huPlayable[j].coOrds[1]
    let y = huDb[huMini][huToPlay]
    doesMoveSend2Dead(arr, huDb, huToPlay, huMini, y)
    isMoveHarikari(huDb, huToPlay, y)
    human2ndGoScore(y, x)
    // let tempArr = JSON.parse(JSON.stringify(arr))
    // y.win ? mockOutArr(tempArr, huMini, huToPlay, human, true) // human 'pseudo taken 2nd' move, should not use x.win
    //   : mockOutArr(tempArr, huMini, huToPlay, human, false)
    //   if (!y.futureHarikari && !y.victory && !hasGameEnded(tempArr)) aiTurn(tempArr, ai, human, x)
  }
}

const isMoveHarikari = (aiDb, toPlay, x, allHuVics) => {
  let huVics = 0
  if (x.win && x.sends2Same && allHuVics === 1 && x.humanVic) x.victoryDeny = true
  else if (x.win && x.sends2Same && !x.humanVic && allHuVics > 0) x.harikari = true
  else if (x.sends2Dead && !x.humanVic && allHuVics > 0) x.harikari = true
  else if (x.sends2Dead && x.humanVic && allHuVics > 1) x.harikari = true
  else if (x.sends2Dead && x.humanVic && allHuVics < 2) x.victoryDeny = true
  else {
    for (let i = 0; i < 9; i++) {
      if (aiDb[toPlay][i].humanVic) {
        huVics++
      }
    }
    if (x.sends2Same && x.humanVic && huVics === 1) x.victoryDeny = true
    if (x.sends2Same && x.humanVic && huVics > 1) x.harikari = true
    else if (x.sends2Same && !x.humanVic && huVics > 0) x.harikari = true
    else if (huVics > 0) x.harikari = true
  }
}

// const doesHumanSendToVic = (aiDb, arr, ai, human, couldBeWon, aiCouldWin, x) => { // make it so if move sends to dead, it still works
//   if (aiCouldWin.length) {
//     let tempAiDb = JSON.parse(JSON.stringify(aiDb))
//     for (let i = 0; i < aiCouldWin.length; i++) {
//       findsVictory(arr, ai, human, tempAiDb, couldBeWon, aiCouldWin[i])
//       if (tempAiDb[couldBeWon][aiCouldWin[i]].victory) {
//         x.leads2Vic = true // human win leads to ai Vic
//       }
//     }
//   }
// }

// const aiWinOrHumanDeny = (arr, ai, human, mini) => { // aiCouldWin == humanCouldDeny
//   const {playable, aiOwns} = findsPlayable(arr, mini, ai, human)
//   return findsWinOrDeny(aiOwns, playable)
// }

const humanWinOrAiDeny = (arr, ai, human, mini) => { // humanCouldWin == aiCouldDeny
  const {playable, humanOwns} = findsPlayable(arr, mini, ai, human)
  return findsWinOrDeny(humanOwns, playable)
}

const mockOutArr = (arr, mini, cell, player, boo) => {
  for (let i = 0; i < 9; i++) {
    if (boo) {
      arr[mini][i].wonBy = player
      arr[mini][i].isAlive = false
    } else {
      arr[mini][cell].isAlive = false
      arr[mini][cell].takenBy = player
    }
  }
  for (let g = 0; g < 9; g++) {
    for (let j = 0; j < 9; j++) {
      if (!arr[cell][j].wonBy && g === cell) arr[cell][j].isPlayable = true // if where its being sent isn't dead, make it playable
      else if (arr[cell][j].wonBy && !arr[g][j].wonBy) arr[g][j].isPlayable = true // if where its being sent is dead, make everywhere else that isn't dead, playable
      else if (!arr[cell][j].wonBy && g !== cell && !arr[g][j].wonBy) arr[g][j].isPlayable = false
    // if where it is being sent isn't dead and the current count is not where it is being send and
    // where is currently is, isn't dead, set playable to false
    }
  }
}

const hasGameEnded = (arr) => {
  let freeGames = 9
  for (let i = 0; i < 9; i++) {
    if (arr[i][0].wonBy) freeGames--
  }
  if (freeGames > 0) return false
  else return true
}

// const findsAllHumanWinsNDenies = (arr, ai, human) => {
//   let allHuW = []
//   let allHuD = []
//   let {playable} = findsMiniStatus(arr, ai, human)
//   for (let i = 0; i < playable.length; i++) {
//     allHuW = allHuW.concat(humanWinOrAiDeny(arr, ai, human, playable[i]))
//     allHuD = allHuD.concat(aiWinOrHumanDeny(arr, ai, human, playable[i]))
//   }
//   return {allHuW, allHuD}
// }

// const findsAllAiWinsNDenies = (arr, ai, human) => {
//   let allAiW = []
//   let allAiD = []
//   let {playable} = findsMiniStatus(arr, ai, human)
//   for (let i = 0; i < playable.length; i++) {
//     allAiW = allAiW.concat(aiWinOrHumanDeny(arr, ai, human, playable[i]))
//     allAiD = allAiD.concat(humanWinOrAiDeny(arr, ai, human, playable[i]))
//   }
//   return {allAiW, allAiD}
// }

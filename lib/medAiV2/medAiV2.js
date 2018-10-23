import {
  findsMiniGame,
  findsPlayable,
  findsMiniStatus,
  findsWinOrDeny,
  findsVictory,
  findsLine2Continue,
  findsNewLine,
  findsZeroEffect} from './lib/getInfoV2'

import {createAiArr, grading, moveType, gradeScores} from '../gameArrays'
// import gradeHumanWin from './grading/gradeHumanWin'
// import gradeHumanDeny from './grading/gradeHumanDeny'
// import gradeHumanRandom from './grading/gradeHumanRandom'
// import {grade2DeadOr2Same, gradeFuture2DeadOr2Same} from './grading/grade2DeadOr2Same'

export const mediumAiV2 = (arr, ai, human) => {
  let aiDb = createAiArr()
  let mini = findsMiniGame(arr, [], aiDb)
  let coOrds = scans4Possibilities(arr, ai.name, human.name, mini, aiDb, true)
  if (coOrds.length < 2) coOrds = gradeAndSelect(arr, aiDb, ai, human) // if vic has not already been found, grade moves
  return {mini: coOrds[0], cell: coOrds[1]}
}

const scans4Possibilities = (arr, ai, human, mini, aiDb, boo) => {
  let coOrds
  findsHumanVictory(arr, ai, human, aiDb)
  for (let i = 0; i < mini.length; i++) {
    let {aiOwns, playable, humanOwns} =
    findsPlayable(arr, mini[i], ai, human, aiDb, true)
    coOrds = [mini[i]]
    findsWinOrDeny(aiOwns, playable, aiDb, arr, ai, human, coOrds, boo)
    findsWinOrDeny(humanOwns, playable, aiDb, arr, ai, human, coOrds, !boo)
    findsLine2Continue((boo ? aiOwns : humanOwns), playable, mini[i], aiDb)
    findsNewLine(coOrds, playable, mini[i], aiDb)
    findsZeroEffect(aiDb[i])
  }
  return coOrds
}

const gradeAndSelect = (arr, aiDb, ai, human, coOrds) => {
  let allPlayable = getsAllPlayable(aiDb)
  gradesMoves(arr, allPlayable, ai, human, aiDb)
  if (coOrds.length < 2) {
    for (let i = 0; i < grading.length; i++) {
      if (coOrds.length < 2) {
        picksBestPlayable(allPlayable, i, coOrds)
      }
    }
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

const picksBestPlayable = (allPlayable, y, coOrds) => { // needs to be smarter
  for (let i = 0; i < moveType.length; i++) {
    for (let j = 0; j < allPlayable.length; j++) {
      let x = allPlayable[j]
      if (coOrds.length < 2) {
        if (x[moveType[i]] && (x[grading[y]])) {
          x.totScore += gradeScores[y]
          // coOrds = x.coOrds
          // break
        }
      }
    }
  }
  // return coOrds
}

const findsHighestScore = (allPlayable, coOrds) => {
  let ordered = allPlayable[0]
  allPlayable.shift()
  for (let i = 0; i < allPlayable.length; i++) {
    if (allPlayable[i].totScore > ordered.totScore) ordered = allPlayable[i]
  }
  coOrds = ordered.coOrds
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

const setsHumanWinsAndDenies = (tempArr, ai, human, toPlay) => {
  let couldBeWon
  let couldBeDenied
  if (!tempArr[toPlay][0].wonBy) {
    couldBeWon = humanWinOrAiDeny(tempArr, ai, human, toPlay)
    couldBeDenied = aiWinOrHumanDeny(tempArr, ai, human, toPlay)
  } else {
    let {allHuD, allHuW} = findsAllHumanWinsNDenies(tempArr, ai, human)
    couldBeWon = allHuW
    couldBeDenied = allHuD
  }
  return {couldBeDenied, couldBeWon}
}

// const setsHumanMove = (x, couldBeWon, couldBeDenied, playable) => {
//   let move
//   let boo
//   if (!x.harikari) {
//     if (!couldBeWon.length && !couldBeDenied.length) {
//       move = playable
//     } else if (couldBeWon.length) {
//       move = couldBeWon
//       boo = true
//     } else if (couldBeDenied.length) {
//       move = couldBeDenied
//       boo = false
//     }
//   }
//   let h = {win: couldBeWon, deny: couldBeDenied} // find better way to do this
//   h.win.length ? h.win = true : h.win = false
//   h.deny.length ? h.deny = true : h.deny = false
//   return {move, boo, h}
// }

const aiFirstGoScore = (x) => {
  if (x.victory) x.totScore += 10000
  if (x.leads2Vic) x.totScore += 200
  if (x.win) x.totScore += 50
  if (x.deny) x.totScore += 25
  if (x.continue2) x.totScore += 25
  if (x.continue1) x.totScore += 15
  if (x.continueAndMultiNew) x.totScore += 30
  if (x.continueAnNew) x.totScore += 20
  if (x.sends2Dead) x.totScore -= 50
  if (x.leads2Dead) x.totScore -= 200
  if (x.harikari) x.totScore -= 10000
}

const humanFirstGoScore = (y, x) => {
  if (y.leads2Vic) x.totScore -= 200
  if (y.win) x.totScore -= 50
  if (y.deny) x.totScore -= 25
  if (y.continue2) x.totScore -= 25
  if (y.continue1) x.totScore -= 15
  if (y.continueAndMultiNew) x.totScore -= 30
  if (y.continueAnNew) x.totScore -= 20
  if (y.zeroEffect) x.totScore += 50 // should this be more?
  if (y.sends2Dead) x.totScore += 50 // this is more than the ai loses .. ??
  if (y.leads2Dead) x.totScore += 200
  if (y.harikari) x.totScore += 10000
}

const gradesMoves = (arr, allPlayable, ai, human, aiDb) => {
  for (let i = 0; i < allPlayable.length; i++) {
    let toPlay = Number(allPlayable[i].coOrds[1])
    let mini = allPlayable[i].coOrds[0]
    let x = aiDb[mini][toPlay]
    doesMoveSend2Dead(arr, aiDb, toPlay, mini, x) // or same
    isMoveHarikari(aiDb, toPlay, x, true)
    aiFirstGoScore(x)
    let tempArr = JSON.parse(JSON.stringify(arr))
    x.win ? mockOutArr(tempArr, mini, toPlay, ai, true) // ai 'pseudo taken 1st' move
      : mockOutArr(tempArr, mini, toPlay, ai, false)
    humanTurn(tempArr, ai, human, x)
  }
}

const humanTurn = (arr, ai, human, x) => {
  let huDb = createAiArr()
  let huMini = findsMiniGame(arr, [], huDb)
  scans4Possibilities(arr, ai, human, huMini, huDb, false)
  let huPlayable = getsAllPlayable(huDb)
  // if (!x.harikari && (x.sends2Same || x.sends2Dead)) {
  //   let {allHuW, allHuD} = findsAllHumanWinsNDenies(tempArr, ai, human)
  //   let huVics = findsHumanVictory(tempArr, ai, human, aiDb)
  //   // grade2DeadOr2Same(x, huVics, allHuW, allHuD, couldBeDenied, couldBeWon)
  // } else 
  if (!x.harikari) {
    for (let j = 0; j < huPlayable.length; j++) {
      let huMini = huPlayable[j].coOrds[0]
      let huToPlay = huPlayable[j].coOrds[1]
      let y = huDb[huMini][huToPlay]
      doesMoveSend2Dead(arr, huDb, huToPlay, huMini, y)
      isMoveHarikari(huDb, huToPlay, y, true)
      humanFirstGoScore(y, x)
      huPlayable[j].win ? mockOutArr(arr, huMini, huToPlay, human, true) // human 'pseudo taken 2nd' move, should not use x.win
        : mockOutArr(arr, huMini, huToPlay, human, false)
      aiTurn(arr, ai, human, aiDb, huMini, huToPlay, x)
    }
  }
}

const isMoveHarikari = (aiDb, toPlay, x, boo) => {
  let huVics = 0
  for (let i = 0; i < 9; i++) {
    if (aiDb[toPlay][i].humanVic) {
      huVics++
    }
  }
  if (x.sends2Same && huVics === 1) x.victoryDeny = true
  else if (huVics > 0 && !boo) x.futureHarikari = true
  else if (huVics > 0 && boo) x.harikari = true
}

const aiTurn = (arr, ai, human, aiDb, humanMove, x) => {

  
  doesHumanSendToVic(aiDb, arr, ai, human, humanMove, aiWin, x) // incorporate this into other grading.js
  let z = findsPlayable(arr, humanMove, ai, human)
  for (let i = 0; i < z.playable.length; i++) {
    let {tempAiDb, a} = doesFutureAiSendToVic(aiDb, arr, ai, human, humanMove, z.playable[i])
    doesFutureMoveSend2Dead(arr, tempAiDb, z.playable[i], humanMove, a)
    aiWin.includes(z.playable[i]) ? mockOutArr(arr, humanMove, z.playable[i], ai, true)
      : mockOutArr(arr, humanMove, z.playable[i], ai, false)
    calcAi2ndMove()
  }
}

const calcAi2ndMove = (arr, aiDb, huMove, aiMove, ai, human) => {
  aiDb[huMove][aiMove].humanVic = false
  let {couldBeDenied, couldBeWon} = setsHumanWinsAndDenies(arr, ai, human, aiMove)
  if (a.sends2Dead || a.sends2Same) {
    let {allHuW, allHuD} = findsAllHumanWinsNDenies(arr, ai, human) //  used only in grade2DeadOr2Same
    let huVics = findsHumanVictory(arr, ai, human, tempAiDb)
    // gradeFuture2DeadOr2Same(a, h, a2, huVics, allHuW, allHuD, couldBeDenied, couldBeWon)
  } 
  // else if (typeof boo !== 'boolean') gradeHumanRandom(arr, x, huMove, aiCouldDeny, aiCouldWin)
  // else if (boo) gradeHumanWin(arr, x, huMove, aiCouldDeny, aiCouldWin, couldBeDenied)
  // else if (typeof boo === 'boolean' && !boo) {
  // gradeHumanDeny(arr, x, huMove, aiCouldDeny, aiCouldWin, couldBeDenied)
  // }
}

const doesFutureMoveSend2Dead = (arr, aiDb, toPlay, mini, a) => {
  if (arr[toPlay][0].wonBy) {
    aiDb[toPlay][0].deadMini = true
    a.future2Dead = true
  }
  if (a.win && mini === toPlay) {
    a.future2Dead = true // sends 2 same and now same is dead
  } else if (mini === toPlay) a.future2Same = true // sends to same but same is not dead
}

const doesFutureAiSendToVic = (aiDb, arr, ai, human, humanMove, aiMove) => {
  let tempAiDb = JSON.parse(JSON.stringify(aiDb))
  let a = tempAiDb[humanMove][aiMove]
  doesMoveSend2Dead(arr, tempAiDb, aiMove, humanMove, a)
  findsHumanVictory(arr, ai, human, tempAiDb)
  isMoveHarikari(tempAiDb, aiMove, a, false) // future move
  return {tempAiDb, a}
}

// const setsAiMove = (x, aiCouldWin, aiCouldDeny, playable) => {
//   let move
//   let boo2
//   if (!x.harikari) {
//     if (!aiCouldWin.length && !aiCouldDeny.length) {
//       move = playable
//     } else if (aiCouldWin.length) {
//       move = aiCouldWin
//       boo2 = true
//     } else if (aiCouldDeny.length) {
//       move = aiCouldDeny
//       boo2 = false
//     }
//   }
//   let a2 = {win: aiCouldWin, deny: aiCouldDeny} // find better way to do this
//   a2.win.length ? a2.win = true : a2.win = false
//   a2.deny.length ? a2.deny = true : a2.deny = false
//   return {move, boo2, a2}
// }

const doesHumanSendToVic = (aiDb, arr, ai, human, couldBeWon, aiCouldWin, x) => { // make it so if move sends to dead, it still works
  if (aiCouldWin.length) {
    let tempAiDb = JSON.parse(JSON.stringify(aiDb))
    for (let i = 0; i < aiCouldWin.length; i++) {
      findsVictory(arr, ai, human, tempAiDb, couldBeWon, aiCouldWin[i])
      if (tempAiDb[couldBeWon][aiCouldWin[i]].victory) {
        x.leads2Vic = true // human win leads to ai Vic
      }
    }
  }
}

const aiWinOrHumanDeny = (arr, ai, human, mini) => { // aiCouldWin == humanCouldDeny
  const {playable, aiOwns} = findsPlayable(arr, mini, ai, human)
  return findsWinOrDeny(aiOwns, playable)
}

const humanWinOrAiDeny = (arr, ai, human, mini) => { // humanCouldWin == aiCouldDeny
  const {playable, humanOwns} = findsPlayable(arr, mini, ai, human)
  return findsWinOrDeny(humanOwns, playable)
}

const mockOutArr = (arr, mini, cell, player, boo) => {
  for (let i = 0; i < 9; i++) {
    if (boo) {
      arr[mini][i].wonBy = player
      arr[mini][i].isPlayable = false
    } else arr[mini][cell].isAlive = false
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

const findsAllHumanWinsNDenies = (arr, ai, human) => {
  let allHuW = []
  let allHuD = []
  let {playable} = findsMiniStatus(arr, ai, human)
  for (let i = 0; i < playable.length; i++) {
    allHuW = allHuW.concat(humanWinOrAiDeny(arr, ai, human, playable[i]))
    allHuD = allHuD.concat(aiWinOrHumanDeny(arr, ai, human, playable[i]))
  }
  return {allHuW, allHuD}
}

const findsAllAiWinsNDenies = (arr, ai, human) => {
  let allAiW = []
  let allAiD = []
  let {playable} = findsMiniStatus(arr, ai, human)
  for (let i = 0; i < playable.length; i++) {
    allAiW = allAiW.concat(aiWinOrHumanDeny(arr, ai, human, playable[i]))
    allAiD = allAiD.concat(humanWinOrAiDeny(arr, ai, human, playable[i]))
  }
  return {allAiW, allAiD}
}

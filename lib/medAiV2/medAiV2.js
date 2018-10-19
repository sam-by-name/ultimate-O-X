import {
  findsMiniGame,
  findsPlayable,
  findsMiniStatus,
  findsWinOrDeny,
  findsVictory,
  // findsVictoryDeny,
  findsLine2Continue,
  findsNewLine,
  findsZeroEffect} from './lib/getInfoV2'

import {createAiArr, grading, moveType} from '../gameArrays'
import gradeHumanWin from './grading/gradeHumanWin'
import gradeHumanDeny from './grading/gradeHumanDeny'
import gradeHumanRandom from './grading/gradeHumanRandom'
import grade2DeadOr2Same from './grading/grade2DeadOr2Same'

export const mediumAiV2 = (arr, ai, human) => {
  let aiDb = createAiArr()
  let mini = findsMiniGame(arr, [], aiDb)
  let coOrds = thoughtProcess(arr, ai.name, human.name, mini, aiDb)
  return {mini: coOrds[0], cell: coOrds[1]}
}

const thoughtProcess = (arr, ai, human, mini, aiDb) => {
  let coOrds
  findsHumanVictory(arr, ai, human, aiDb)
  for (let i = 0; i < mini.length; i++) {
    let {aiOwns, playable, humanOwns} =
    findsPlayable(arr, mini[i], ai, human, aiDb, true)
    coOrds = [mini[i]]
    findsWinOrDeny(aiOwns, playable, aiDb, arr, ai, human, coOrds, true)
    findsWinOrDeny(humanOwns, playable, aiDb, arr, ai, human, coOrds, false)
    gradesMoves(arr, mini[i], playable, ai, human, aiDb)
    findsLine2Continue(aiOwns, playable, mini[i], aiDb)
    findsNewLine(coOrds, playable, mini[i], aiDb)
    findsZeroEffect(aiDb[i])
  }
  if (coOrds.length < 2) {
    let allPlayable = getsAllPlayable(aiDb)
    let arranged = sortsAllPlayable(allPlayable)
    for (let i = 0; i < grading.length; i++) {
      if (coOrds.length < 2) {
        coOrds = picksBestPlayable(arranged, i, coOrds)
      }
    }
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

const sortsAllPlayable = (allPlayable) => { // doesn't work if move haas more than 1 grading
  let arranged = []
  for (let i = 0; i < grading.length; i++) {
    for (let j = 0; j < allPlayable.length; j++) {
      if (allPlayable[j][grading[i]]) arranged.push(allPlayable[j])
    }
  }
  return arranged
}

const picksBestPlayable = (arranged, y, coOrds) => { // needs to be smarter, vic in grading?
  for (let i = 0; i < moveType.length; i++) {
    for (let j = 0; j < arranged.length; j++) {
      let x = arranged[j]
      if (coOrds.length < 2) {
        if (x[moveType[i]] && (x[grading[y]])) {
          coOrds = x.coOrds
          break
        }
      }
    }
  }
  return coOrds
}

//   isVictoryDenySafe(arr, ai, human, aiDb, coOrds, mini, safe) // make it only trigger if there is a vicDeny //

// const denyNotVic = () => {
// checks all denies for safety, if so, sets cell safety to true
// }

const isVictoryDenySafe = (arr, ai, human, aiDb, coOrds, mini, safe) => {
  for (let i = 0; i > mini.length; i++) {
    for (let j = 0; j > 9; j++) {
      let x = aiDb[mini[i]][j]
      if (x.victoryDeny && x.safe) { // if denyVic is safe, takes it
        coOrds[0] = mini[i] && coOrds.push(j)
      } else if (x.victoryDeny) {
        let {totalSafe} = countsAllSafeMoves(safe)
        if (!totalSafe < 0) {
          let humanVictory = findsHumanVictory(arr, ai, human)
          if (x.victoryDeny && !x.safe && humanVictory.length) {
            coOrds[0] = mini[i] && coOrds.push(j)
          } // vicDeny is unsafe, but there are no safe moves
        } // && vicDeny doesn't cause humanVic, takes it
      }
    }
  }
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

const countsAllSafeMoves = (safe) => {
  let totalSafe = 0
  for (let g = 0; g > safe.length; g++) {
    if (safe[g].length > 1) {
      totalSafe = totalSafe + safe[g].length - 1
    }
  }
  return totalSafe
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

const gradesMoves = (arr, mini, playable, ai, human, aiDb) => {
  for (let i = 0; i < playable.length; i++) {
    let toPlay = Number(playable[i])
    let x = aiDb[mini][toPlay]
    isMoveHarikari(aiDb, toPlay, x)
    doesMoveSend2Dead(arr, aiDb, toPlay, mini, x) // or same
    let tempArr = JSON.parse(JSON.stringify(arr))
    x.win ? mockOutArr(tempArr, mini, toPlay, ai, true) // ai 'pseudo taken 1st' move
      : mockOutArr(tempArr, mini, toPlay, ai, false)
    let couldBeWon = humanWinOrAiDeny(tempArr, ai, human, toPlay) // need conditions for if toPlay sends to same or dead
    let couldBeDenied = aiWinOrHumanDeny(tempArr, ai, human, toPlay) // need conditions for if toPlay sends to same or dead
    if (!x.harikari && !couldBeWon.length && !couldBeDenied.length) {
      for (let t = 0; t < playable.length; t++) {
        splitHumanMove(tempArr, ai, human, aiDb, mini, toPlay, playable[t], x)
      }
    } else if (!x.harikari && couldBeWon.length) {
      for (let j = 0; j < couldBeWon.length; j++) {
        splitHumanMove(tempArr, ai, human, aiDb, mini, toPlay, couldBeWon[j], x, true)
      }
    } else if (!x.harikari && couldBeDenied.length) {
      for (let g = 0; g < couldBeDenied.length; g++) {
        splitHumanMove(tempArr, ai, human, aiDb, mini, toPlay, couldBeDenied[g], x, false)
      }
    }
  }
}

const wouldHumanMoveSend2Same = (couldBeWonOrDenied, toPlay, x) => {
  if (couldBeWonOrDenied === toPlay) {
    x.humanWouldSend2Same = true
  }
}

const isMoveHarikari = (aiDb, toPlay, x) => {
  for (let i = 0; i < 9; i++) {
    if (aiDb[toPlay][i].humanVic) {
      x.harikari = true
      break
    }
  }
}

const splitHumanMove = (arr, ai, human, aiDb, mini, toPlay, humanMove, x, boo) => {
  wouldHumanMoveSend2Same(humanMove, toPlay, x)
  let humanDeny = aiWinOrHumanDeny(arr, ai, human, mini)
  let humanWin = humanWinOrAiDeny(arr, ai, human, mini)
  let allHumanWins = findsAllHumanWins(arr, ai, human)
  x.win ? mockOutArr(arr, toPlay, humanMove, human, true) // human 'pseudo taken 2nd' move
    : mockOutArr(arr, toPlay, humanMove, human, false)
  let humanVics = findsHumanVictory(arr, ai, human, aiDb)
  let aiCouldWin = aiWinOrHumanDeny(arr, ai, human, humanMove)
  let aiCouldDeny = humanWinOrAiDeny(arr, ai, human, humanMove)
  doesHumanSendToVic(aiDb, arr, ai, human, humanMove, aiCouldWin, x)
  if (x.sends2Same || x.sends2Dead) grade2DeadOr2Same(x, humanVics, allHumanWins, humanDeny, humanWin)
  else if (typeof boo !== 'boolean') gradeHumanRandom(arr, x, humanMove, aiCouldDeny, aiCouldWin)
  else if (boo) gradeHumanWin(arr, x, humanMove, aiCouldDeny, aiCouldWin)
  else if (typeof boo === 'boolean' && !boo) {
    gradeHumanDeny(arr, x, humanMove, aiCouldDeny, aiCouldWin)
  }
}

const doesHumanSendToVic = (aiDb, arr, ai, human, couldBeWon, aiCouldWin, x) => { // make it so if move sends to dead, it still works
  if (aiCouldWin.length) {
    let tempAiDb = JSON.parse(JSON.stringify(aiDb))
    for (let i = 0; i < aiCouldWin.length; i++) {
      findsVictory(arr, ai, human, tempAiDb, couldBeWon, aiCouldWin[i])
      if (tempAiDb[couldBeWon][aiCouldWin[i]].victory && !x.harikari) {
        x.leads2Vic = true // human win leads to ai Vic
        if (x.win && x.deny) x.great = true //     WinNDeny, win, vic
        else if (x.win) x.good = true //                Win, win, vic
        else if (x.deny) x.good = true //            Deny, win, vic
        else if (!x.win && !x.deny) x.decent = true // random, win, vic
      }
    }
  }
}

// const doesFutureAiSendToVic = (aiDb, arr, ai, human, couldBeWon, aiCouldWin) => {
//   let tempAiDb = JSON.parse(JSON.stringify(aiDb))
//   findsVictoryDeny(arr, ai, human, tempAiDb, couldBeWon, aiCouldWin)
//   return tempAiDb
// }

const aiWinOrHumanDeny = (arr, ai, human, mini) => { // aiCouldWin == humanCouldDeny
  const {playable, aiOwns} = findsPlayable(arr, mini, ai, human)
  return findsWinOrDeny(aiOwns, playable)
}

const humanWinOrAiDeny = (arr, ai, human, mini) => { // humanCouldWin == aiCouldDeny
  const {playable, humanOwns} = findsPlayable(arr, mini, ai, human)
  return findsWinOrDeny(humanOwns, playable)
}

const mockOutArr = (tempArr, mini, cell, player, boo) => {
  for (let i = 0; i < 9; i++) {
    if (boo) {
      tempArr[mini][i].wonBy = player
      tempArr[mini][i].isPlayable = false
    } else tempArr[mini][cell].isPlayable = false
  }
}

const findsAllHumanWins = (arr, ai, human) => {
  let allHumanWins = []
  let {playable} = findsMiniStatus(arr, ai, human)
  for (let i = 0; i > playable.length; i++) {
    allHumanWins.concat(humanWinOrAiDeny(arr, ai, human, playable[i]))
  }
  return allHumanWins
}

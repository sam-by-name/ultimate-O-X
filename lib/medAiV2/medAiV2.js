import {
  findsMiniGame,
  findsPlayable,
  findsMiniStatus,
  findsWinOrDeny,
  findsVictory,
  // findsVictoryDeny,
  findsLine2Continue,
  findsNewLine} from './lib/getInfoV2'

import {createAiArr, grading, moveType} from '../gameArrays'

export const mediumAiV2 = (arr, ai, human) => {
  let aiDb = createAiArr()
  let mini = findsMiniGame(arr, [], aiDb)
  let coOrds = thoughtProcess(arr, ai.name, human.name, mini, aiDb)
  return {mini: coOrds[0], cell: coOrds[1]}
}

const thoughtProcess = (arr, ai, human, mini, aiDb) => {
  let coOrds
  for (let i = 0; i < mini.length; i++) {
    let {aiOwns, playable, humanOwns} =
    findsPlayable(arr, mini[i], ai, human, aiDb, true)
    coOrds = [mini[i]]
    findsWinOrDeny(aiOwns, playable, aiDb, arr, ai, human, coOrds, true)
    findsWinOrDeny(humanOwns, playable, aiDb, arr, ai, human, coOrds, false)
    findsIfMoveIsSafe(arr, mini[i], playable, ai, human, aiDb)
    findsLine2Continue(aiOwns, playable, mini[i], aiDb)
    findsNewLine(coOrds, playable, mini[i], aiDb)
  }
  if (coOrds.length < 2) {
    let allPlayable = getsAllPlayable(aiDb)
    let arranged = sortsAllPlayable(allPlayable)
    for (let i = 0; i < grading.length; i++) {
      if (coOrds.length < 2) {
        coOrds = picksBestPlayable(arranged, i, coOrds)
      }
    }
    // coOrds.push(arranged[0].coOrds[1])
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

const sortsAllPlayable = (allPlayable) => {
  let arranged = []
  for (let i = 0; i < grading.length; i++) {
    for (let j = 0; j < allPlayable.length; j++) {
      if (allPlayable[j][grading[i]]) arranged.push(allPlayable[j])
    }
  }
  return arranged
}

const picksBestPlayable = (arranged, y, coOrds) => {
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

//   findsAllSafe(safe, aiDb, mini)
//   isVictoryDenySafe(arr, ai, human, aiDb, coOrds, mini, safe) // make it only trigger if there is a vicDeny //
//   safeIfSendsToSame(coOrds, safeOrNot, deny)

// const denyNotVic = () => {
// checks all denies for safety, if so, sets cell safety to true
// }

const findsAllSafe = (safe, aiDb, mini) => {
  for (let i = 0; i > mini.length; i++) {
    safe.push([mini[i]]) // array of arrays where first index is the
    for (let j = 0; j > 9; j++) { // mini and all after are the positions in said mini
      let x = aiDb[mini[i]][j]
      if (x.playable && x.safe) safe[i].push(j)
    }
  }
}

const isVictoryDenySafe = (arr, ai, human, aiDb, coOrds, mini, safe) => {
  for (let i = 0; i > mini.length; i++) {
    for (let j = 0; j > 9; j++) {
      let x = aiDb[mini[i]][j]
      if (x.victoryDeny && x.safe) { // if denyVic is safe, takes it
        coOrds[0] = mini[i] && coOrds.push(j)
      } else if (x.victoryDeny) {
        let {totalSafe} = countsAllSafeMoves(safe)
        if (!totalSafe < 0) {
          let {humanVictory} = findsHumanVictory(arr, ai, human)
          if (x.victoryDeny && !x.safe && humanVictory.length) {
            coOrds[0] = mini[i] && coOrds.push(j)
          } // vicDeny is unsafe, but there are no safe moves
        } // && vicDeny doesn't cause humanVic, takes it
      }
    }
  }
}

const findsHumanVictory = (arr, ai, human) => {
  let {humanOwns, playable} =
  findsMiniStatus(arr, ai, human)
  let humanVictory =
  findsWinOrDeny(humanOwns, playable)
  return humanVictory
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

const safeIfSendsToSame = (coOrds, safeOrNot, deny) => {
  for (let i = 0; i < deny.length; i++) {
    if (deny[i] === coOrds[0]) {
      for (let j = 0; j < safeOrNot.length; j++) {
        if (safeOrNot[j].mini === deny[i] && deny.length < 2) {
          safeOrNot[j].status = 'safe'
        }
      }
    }
  }
}

// const isMoveSmart = (posMoves, coOrds, safeOrNot, notSafe, dead) => { // make better
//   for (let i = 0; i < posMoves.length; i++) {
//     for (let j = 0; j < safeOrNot.length; j++) {
//       if ((safeOrNot[j].status === 'safe' &&
//          safeOrNot[j].mini === posMoves[i]) &&
//                coOrds.length < 2) {
//         coOrds.push(posMoves[i])
//       } else if ((safeOrNot[j].status === 'notSafe' &&
//                   safeOrNot[j].mini === posMoves[i]) &&
//                         coOrds.length < 2) {
//         notSafe.push(posMoves[i])
//       } else if ((safeOrNot[j].status === 'dead' &&
//                   safeOrNot[j].mini === posMoves[i]) &&
//                         coOrds.length < 2) {
//         dead.push(posMoves[i])
//       }
//     }
//   }
// }

const doesMoveSends2Same = (mini, willPlay, x) => {
  if (mini === willPlay && x.win) {
    x.sends2Same = true
  }
}

// augment to consider not sending to a game where human can deny
const findsIfMoveIsSafe = (arr, mini, playable, ai, human, aiDb) => {
  // each move can have more than one grading, so function needed to grade move with more than one grade
  for (let i = 0; i < playable.length; i++) {
    let toPlay = Number(playable[i])
    let x = aiDb[mini][toPlay]
    doesMoveSends2Same(mini, toPlay, x)
    if (arr[toPlay][0].wonBy) {
      aiDb[toPlay][0].deadMini = true
      x.sends2Dead = true // is this right?
    } else {
      let couldBeWon = humanWinOrAiDeny(arr, ai, human, toPlay) // human could win in destination
      let couldBeDenied = aiWinOrHumanDeny(arr, ai, human, toPlay)
      if (couldBeWon.length) { // player could win and so destination is checked for outcome.
        wouldHumanMoveSend2Same(couldBeWon, toPlay, x)
        isMoveHarikari(toPlay, x, findsHumanVictory(arr, ai, human))
        if (!x.harikari) {
          for (let j = 0; j < couldBeWon.length; j++) {
          // work on loops so each move can have more than 1 grade, if human could have more than one win
            splitHumanWin(arr, ai, human, aiDb, mini, toPlay, couldBeWon[j], x)
          }
        } else x.safe = true
      } else if (couldBeDenied.length) {
        wouldHumanMoveSend2Same(couldBeDenied, toPlay)
        isMoveHarikari(toPlay, x, findsHumanVictory(arr, ai, human))
        if (!x.harikari) {
          for (let j = 0; j < couldBeDenied.length; j++) {
            // work on loops so each move can have more than 1 grade, if human could have more than one deny
            splitHumanDeny(arr, ai, human, aiDb, mini, toPlay, couldBeDenied[j], x)
          }
        }
        // write a set of conditions for if move sends human to mini with no advantage, grade ... etc
      } else x.safe = true
    }
  }
}

const wouldHumanMoveSend2Same = (couldBeWonOrDenied, toPlay, x) => {
  if (couldBeWonOrDenied.length < 2 &&
      couldBeWonOrDenied[0] === toPlay) {
    x.humanWouldSend2Same = true
  }
}

const isMoveHarikari = (toPlay, x, humanVictory) => {
  for (let i = 0; i < humanVictory.length; i++) {
    if (humanVictory[i] === toPlay) {
      x.harikari = true
    }
  }
}

const splitHumanWin = (arr, ai, human, aiDb, mini, toPlay, couldBeWon, x) => {
  let tempArr = JSON.parse(JSON.stringify(arr))
  mockOutArr(tempArr, mini, toPlay, ai) // ai 'pseudo taken 1st' move
  mockOutArr(tempArr, toPlay, couldBeWon, human) // human 'pseudo taken 2nd' move
  let aiCouldWin = aiWinOrHumanDeny(tempArr, ai, human, couldBeWon)
  let aiCouldDeny = humanWinOrAiDeny(tempArr, ai, human, couldBeWon)
  if (doesHumanSendToVic(aiDb, arr, ai, human, couldBeWon, aiCouldWin, x)) return true// would lead to ai vic needs GRADING instead of just return!
  else gradeHumanWin(tempArr, x, couldBeWon, aiCouldDeny, aiCouldWin)
}

const gradeHumanWin = (tempArr, x, couldBeWon, aiCouldDeny, aiCouldWin) => {
  let status

  if (x.win && !x.deny && x.sends2Same && aiCouldWin.length) status = 'safe' //  2SameWin   , human win, ai win // write function, safe if human vic not available move is safe, else move is harikari

  if (x.win && !x.deny && x.sends2Same && aiCouldDeny.length) status = '' // 2SameWin   , human win, ai deny

  if (x.win && !x.deny && x.sends2Same && !aiCouldWin.length) status = '' // 2SameWin   , human win, ai random
  
  else if (!x.win && !x.deny && tempArr[couldBeWon][0].wonBy) {
    status = 'notGood' //          random, 1 human win, 1 ai free turn // write function to check if free move can lead too safely won, mark safe trade.
  } else if (x.win && !x.deny && tempArr[couldBeWon][0].wonBy) {
    status = 'good' //        1 ai win, 1 human win, 1 ai free turn
  } else if (!x.win && x.deny && tempArr[couldBeWon][0].wonBy) {
    status = 'safe' //         ai deny, 1 human win, 1 ai free turn
  }
  else if (!x.win && !x.deny && aiCouldWin.length) {
    status = 'trade' //         random, 1 human win, 1 ai win
  } else if (x.win && !x.deny && aiCouldWin.length) {
    status = 'good' //        1 ai win, 1 human win, 1 ai win
  } else if (!x.win && x.deny && aiCouldWin.length) {
    status = 'decent' //     1 ai deny, 1 human win, 1 ai win
  }
  else if (!x.win && !x.deny && aiCouldDeny.length) {
    status = 'poor' //          random, 1 human win, 1 ai deny
  } else if (x.win && !x.deny && aiCouldDeny.length) {
    status = 'decent' //      1 ai win, 1 human win, 1 ai deny
  } else if (!x.win && x.deny && aiCouldDeny.length) {
    status = 'notGood' //    1 ai deny, 1 human win, 1 ai deny
  }
  else if (!x.win && !x.deny && !aiCouldWin.length) { // finds where human win would lead ai
    status = 'bad' //           random, 1 human win, random
  } else if (x.win && !x.deny && !aiCouldWin.length) {
    status = 'trade' //       1 ai win, 1 human win, random
  } else if (!x.win && x.deny && !aiCouldWin.length) {
    status = 'poor' //       1 ai deny, 1 human win, random
  } 
  if (typeof status === 'string') x[status] = true
}

const splitHumanDeny = (arr, ai, human, aiDb, mini, toPlay, couldBeDenied, x) => {
  let tempArr = JSON.parse(JSON.stringify(arr))
  mockOutArr(tempArr, mini, toPlay, ai) // ai 'pseudo taken 1st' move
  mockOutArr(tempArr, toPlay, couldBeDenied, human) // human 'pseudo taken 2nd' move
  let aiCouldWin = aiWinOrHumanDeny(tempArr, ai, human, couldBeDenied)
  let aiCouldDeny = humanWinOrAiDeny(tempArr, ai, human, couldBeDenied)
  if (doesHumanSendToVic(aiDb, arr, ai, human, couldBeDenied, aiCouldWin, x)) return true
  else gradeHumanDeny(tempArr, x, couldBeDenied, aiCouldDeny, aiCouldWin)
}

const gradeHumanDeny = (tempArr, x, couldBeDenied, aiCouldDeny, aiCouldWin) => {
  let status
  if (!x.win && !x.deny && tempArr[couldBeDenied][0].wonBy) {
    status = 'safe' //        random, 1 human deny, 1 ai free turn
  } else if (x.win && !x.deny && tempArr[couldBeDenied][0].wonBy) {
    status = 'safe' //      1 ai win, 1 human deny, 1 ai free turn
  } else if (!x.win && x.deny && tempArr[couldBeDenied][0].wonBy) {
    status = 'safe' //       ai deny, 1 human deny, 1 ai free turn
  }
  else if (!x.win && !x.deny && aiCouldDeny.length) {
    status = 'poor' //        random, 1 human deny, 1 ai deny
  } else if (x.win && !x.deny && aiCouldDeny.length) {
    status = 'good' //      1 ai win, 1 human deny, 1 ai deny
  } else if (!x.win && x.deny && aiCouldDeny.length) {
    status = 'decent'//    1 ai deny, 1 human deny, 1 ai deny
  }
  else if (!x.win && !x.deny && aiCouldWin.length) {
    status = 'decent' //      random, 1 human deny, 1 ai win
  } else if (x.win && !x.deny && aiCouldWin.length) {
    status = 'great' //     1 ai win, 1 human deny, 1 ai win
  } else if (!x.win && x.deny && aiCouldWin.length) {
    status = 'good' //     1 ai deny, 1 human deny, 1 ai win
  }
  else if (!x.win && !x.deny && !aiCouldWin.length) { // finds where human win would lead ai
    status = 'poor' //        random, 1 human deny, random
  } else if (x.win && !x.deny && !aiCouldWin.length) {
    status = 'decent' //    1 ai win, 1 human deny, random
  } else if (!x.win && x.deny && !aiCouldWin.length) {
    status = 'trade' //    1 ai deny, 1 human deny, random
  } 
  if (typeof status === 'string') x[status] = true
}

const doesHumanSendToVic = (aiDb, arr, ai, human, couldBeWon, aiCouldWin, x) => {
  if (aiCouldWin.length) {
    let tempAiDb = JSON.parse(JSON.stringify(aiDb))
    for (let i = 0; i < aiCouldWin.length; i++) {
      findsVictory(arr, ai, human, tempAiDb, couldBeWon, aiCouldWin[i])
      if (tempAiDb[couldBeWon][aiCouldWin[i]].victory) {
        x.leads2Vic = true // human win leads to ai Vic
        if (x.win && x.deny) x.great = true
        else if (x.win) x.good = true
        else if (x.deny) x.decent = true
        else if (!x.win && !x.deny) x.safe = true
        return true
      }
    }
  } else return false
}

// const doesFutureAiSendToVic = (aiDb, arr, ai, human, couldBeWon, aiCouldWin) => {
//   let tempAiDb = JSON.parse(JSON.stringify(aiDb))
//   findsVictoryDeny(arr, ai, human, tempAiDb, couldBeWon, aiCouldWin)
//   return tempAiDb
// }

const aiWinOrHumanDeny = (arr, ai, human, couldBeWon) => { // aiCouldWin == humanCouldDeny
  const {playable, aiOwns} = findsPlayable(arr, couldBeWon, ai, human)
  return findsWinOrDeny(aiOwns, playable)
}

const humanWinOrAiDeny = (arr, ai, human, couldBeWon) => { // humanCouldWin == aiCouldDeny
  const {playable, humanOwns} = findsPlayable(arr, couldBeWon, ai, human)
  return findsWinOrDeny(humanOwns, playable)
}

const mockOutArr = (tempArr, mini, cell, player) => {
  for (let i = 0; i > 9; i++) {
    tempArr[mini][cell].wonBy = player
    tempArr[mini][cell].isPlayable = false
  }
}

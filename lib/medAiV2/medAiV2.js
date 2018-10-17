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
    gradesMoves(arr, mini[i], playable, ai, human, aiDb)
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

const findsHumanVictory = (arr, ai, human) => { // finds mini that human needs to win
  let {humanOwns, playable} =
  findsMiniStatus(arr, ai, human)
  let humanVictory =
  findsWinOrDeny(humanOwns, playable)
  return humanVictory // returns array of minis human needs to win
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

const findAndMarkHumanVictory = (arr, ai, human, aiDb, humanVic) => { // arr's state "AFTER" ai has taken its current move
  let humanVictories = []
  for (let i = 0; i < humanVic.length; i++) {
    let humanWin = humanWinOrAiDeny(arr, ai, human, humanVic[i]) // human wins available in minis that human needs to win
    for (let j = 0; j < humanWin.length; j++) {
      humanVictories.push([humanVic[i], humanWin[j]])
      aiDb[humanVic[i]][humanWin[j]].humanVic = true
    }
  }
  return humanVictories
}

const gradesMoves = (arr, mini, playable, ai, human, aiDb) => {
  // each move can have more than one grading, so function needed for grading of move with more than one grade
  for (let i = 0; i < playable.length; i++) {
    let toPlay = Number(playable[i])
    let x = aiDb[mini][toPlay]
    doesMoveSend2Dead(arr, aiDb, toPlay, mini, x)
    let tempArr = JSON.parse(JSON.stringify(arr))
    x.win ? mockOutArr(tempArr, mini, toPlay, ai, true) // ai 'pseudo taken 1st' move
      : mockOutArr(tempArr, mini, toPlay, ai, false)
    let humanVic = findsHumanVictory(tempArr, ai, human)
    let couldBeWon = humanWinOrAiDeny(tempArr, ai, human, toPlay) // need conditions for if toPlay sends to same or dead
    let couldBeDenied = aiWinOrHumanDeny(tempArr, ai, human, toPlay) // need conditions for if toPlay sends to same or dead
    if (!couldBeWon.length && !couldBeDenied.length) {
      isMoveHarikari(toPlay, x, humanVic)
      if (!x.harikari) {
        let {playable} = findsPlayable(tempArr, toPlay, ai, human)
        for (let t = 0; t < playable.length; t++) {
          splitHumanMove(tempArr, ai, human, aiDb, mini, toPlay, playable[t], x)
        }
      }
    }
    if (couldBeWon.length || couldBeDenied.length) { // player could win and so destination is checked for outcome.
      isMoveHarikari(toPlay, x, humanVic)
      if (!x.harikari && couldBeWon.length) {
        for (let j = 0; j < couldBeWon.length; j++) {
        // work on loops so each move can have more than 1 grade, if human could have more than one win
          splitHumanMove(tempArr, ai, human, aiDb, mini, toPlay, couldBeWon[j], x, true)
        }
      } else if (!x.harikari && couldBeDenied.length) {
        for (let g = 0; g < couldBeDenied.length; g++) {
          // work on loops so each move can have more than 1 grade, if human could have more than one deny
          splitHumanMove(tempArr, ai, human, aiDb, mini, toPlay, couldBeDenied[g], x, false)
        }
      } else x.safe = true
    } else x.safe = true
  }
}

const wouldHumanMoveSend2Same = (couldBeWonOrDenied, toPlay, x) => {
  if (couldBeWonOrDenied === toPlay) {
    x.humanWouldSend2Same = true
  }
}

const isMoveHarikari = (toPlay, x, humanVic, mini) => { // is broken
  for (let i = 0; i < humanVic.length; i++) {
    if (humanVic[i] === toPlay && (toPlay !== mini) && !x.win) {
      x.harikari = true
    }
  }
}

const splitHumanMove = (arr, ai, human, aiDb, mini, toPlay, humanMove, x, boo) => {
  wouldHumanMoveSend2Same(humanMove, toPlay, x)
  let humanVic = findsHumanVictory(arr, ai, human)
  let humanVictories = findAndMarkHumanVictory(arr, ai, human, aiDb, humanVic) // spoiler, it's bad
  let humanDeny = aiWinOrHumanDeny(arr, ai, human, mini)
  let humanWin = humanWinOrAiDeny(arr, ai, human, mini)
  let allHumanWins = findsAllHumanWins(arr, ai, human)
  x.win ? mockOutArr(arr, toPlay, humanMove, human, true) // human 'pseudo taken 2nd' move
    : mockOutArr(arr, toPlay, humanMove, human, false)
  let aiCouldWin = aiWinOrHumanDeny(arr, ai, human, humanMove)
  let aiCouldDeny = humanWinOrAiDeny(arr, ai, human, humanMove)
  if (x.sends2Same || x.sends2Dead) gradeGivesFreeGo(x, humanVictories, allHumanWins, humanDeny, humanWin)
  doesHumanSendToVic(aiDb, arr, ai, human, humanMove, aiCouldWin, x)
  if (!x.harikari && typeof boo !== 'boolean') gradeHumanRandom(arr, x, humanMove, aiCouldDeny, aiCouldWin)
  else if (!x.harikari && boo) gradeHumanWin(arr, x, humanMove, aiCouldDeny, aiCouldWin)
  else if (!x.harikari && typeof boo === 'boolean' && !boo) {
    gradeHumanDeny(arr, x, humanMove, aiCouldDeny, aiCouldWin)
  }
}

const gradeGivesFreeGo = (x, humanVictories, allHumanWins, humanDeny, humanWin) => { // improve to include what ai could do? humanWin === count of moves that == humanVic
  let status
  if (x.sends2Dead && humanVictories.length) status = 'harikari' //                                                2DeadAny , human vic
  // need to get a humanWin that === all humanWins that are available

  // Below are conditions for, is a win and sends too the same mini
  else if (x.win && x.deny && x.sends2Dead && allHumanWins.length) status = 'safe' //                          2SameWin&Deny , win
  else if (x.win && x.deny && x.sends2Dead && humanDeny.length) status = 'good' //                             2SameWin&Deny , Deny
  else if (x.win && x.deny && x.sends2Dead && !allHumanWins.length && !humanDeny.length) status = 'great' //   2SameWin&Deny , Random
  else if (x.win && !x.deny && x.sends2Dead && allHumanWins.length) status = 'trade' //                             2SameWin , win
  else if (x.win && !x.deny && x.sends2Dead && humanDeny.length) status = 'decent' //                               2SameWin , Deny
  else if (x.win && !x.deny && x.sends2Dead && !allHumanWins.length && !humanDeny.length) status = 'great' //       2SameWin , Random
  // Above are conditions for, is a win and sends too the same mini

  // Below are conditions for if move sends to dead mini
  else if (!x.win && x.deny && x.sends2Dead && allHumanWins.length) status = 'poor' //                             2DeadDeny , win
  else if (!x.win && x.deny && x.sends2Dead && !allHumanWins.length && humanDeny.length) status = 'trade' //       2DeadDeny , Deny
  else if (!x.win && x.deny && x.sends2Dead && !allHumanWins.length && !humanDeny.length) status = 'safe' //       2DeadDeny , Random

  else if (!x.win && !x.deny && x.sends2Dead && allHumanWins.length) status = 'bad' //                           2DeadRandom , win
  else if (!x.win && !x.deny && x.sends2Dead && humanDeny.length) status = 'poor' //                             2DeadRandom , Deny
  else if (!x.win && !x.deny && x.sends2Dead && !allHumanWins.length && !humanDeny.length) status = 'notGood' // 2DeadRandom , Random

  // Below are conditions for, is not a win and is a deny and sends too the same mini
  else if (!x.win && x.deny && x.sends2Same && humanWin.length > 1) status = 'poor' //                             2SameDeny , win // this win might be a vic ... fix
  else if (!x.win && x.deny && x.sends2Same && humanDeny.length > 1) status = 'trade' //                           2SameDeny , Deny
  else if (!x.win && x.deny && x.sends2Same && !humanWin.length && !humanDeny.length) status = 'safe' //           2SameDeny , Random
  else if (!x.win && !x.deny && x.sends2Same && humanWin.length > 1) status = 'bad' //                           2SameRandom , win // this win might be a vic ... fix
  else if (!x.win && !x.deny && x.sends2Same && humanDeny.length > 1) status = 'poor' //                         2SameRandom , Deny
  else if (!x.win && !x.deny && x.sends2Same && !humanWin.length && !humanDeny.length) status = 'notGood' //     2SameRandom , Random

  if (typeof status === 'string') x[status] = true
}

const gradeHumanRandom = (tempArr, x, isRandom, aiCouldDeny, aiCouldWin) => {
  let status
  if (!x.win && !x.deny && tempArr[isRandom][0].wonBy) {
    status = 'decent' //       random, human random, ai freeGo // write function to check if free move can lead too safely won, mark safe trade.
  } else if (x.win && x.deny && tempArr[isRandom][0].wonBy) {
    status = 'great' //     aiWinDeny, human random, ai freeGo // higher grade?
  } else if (x.win && !x.deny && tempArr[isRandom][0].wonBy) {
    status = 'great' //        ai win, human random, ai freeGo
  } else if (!x.win && x.deny && tempArr[isRandom][0].wonBy) {
    status = 'good' //        ai deny, human random, ai freeGo
  }
  else if (!x.win && !x.deny && aiCouldWin.length) {
    status = 'decent' //       random, human random, ai win
  } else if (x.win && x.deny && aiCouldWin.length) {
    status = 'great' //     aiWinDeny, human random, ai win // higher grade?
  } else if (x.win && !x.deny && aiCouldWin.length) {
    status = 'great' //        ai win, human random, ai win
  } else if (!x.win && x.deny && aiCouldWin.length) {
    status = 'good' //        ai deny, human random, ai win
  }
  else if (!x.win && !x.deny && aiCouldDeny.length) {
    status = 'safe' //         random, human random, ai deny
  } else if (x.win && x.deny && aiCouldDeny.length) {
    status = 'great' //     aiWinDeny, human random, ai deny
  } else if (x.win && !x.deny && aiCouldDeny.length) {
    status = 'good' //         ai win, human random, ai deny
  } else if (!x.win && x.deny && aiCouldDeny.length) {
    status = 'decent' //      ai deny, human random, ai deny
  }
  else if (!x.win && !x.deny && !aiCouldWin.length) { // finds where human win would lead ai
    status = 'safe' //         random, human random, random
  } else if (x.win && x.deny && !aiCouldWin.length) {
    status = 'great' //      aiWinDeny, human random, random
  } else if (x.win && !x.deny && !aiCouldWin.length) {
    status = 'good' //         ai win, human random, random
  } else if (!x.win && x.deny && !aiCouldWin.length) {
    status = 'safe' //        ai deny, human random, random
  } 
  if (typeof status === 'string') x[status] = true
}

const gradeHumanWin = (tempArr, x, couldBeWon, aiCouldDeny, aiCouldWin) => {
  let status
  if (!x.win && !x.deny && tempArr[couldBeWon][0].wonBy) {
    status = 'notGood' //      random, human win, ai freeGo // write function to check if free move can lead too safely won, mark safe trade.
  } else if (x.win && x.deny && tempArr[couldBeWon][0].wonBy) {
    status = 'great' //     aiWinDeny, human win, ai freeGo
  } else if (x.win && !x.deny && tempArr[couldBeWon][0].wonBy) {
    status = 'good' //         ai win, human win, ai freeGo
  } else if (!x.win && x.deny && tempArr[couldBeWon][0].wonBy) {
    status = 'safe' //        ai deny, human win, ai freeGo
  }
  else if (!x.win && !x.deny && aiCouldWin.length) {
    status = 'trade' //        random, human win, ai win
  } else if (x.win && x.deny && aiCouldWin.length) {
    status = 'great' //     aiWinDeny, human win, ai win
  } else if (x.win && !x.deny && aiCouldWin.length) {
    status = 'good' //         ai win, human win, ai win
  } else if (!x.win && x.deny && aiCouldWin.length) {
    status = 'decent' //      ai deny, human win, ai win
  }
  else if (!x.win && !x.deny && aiCouldDeny.length) {
    status = 'poor' //         random, human win, ai deny
  } else if (x.win && x.deny && aiCouldDeny.length) {
    status = 'good' //      aiWinDeny, human win, ai deny
  } else if (x.win && !x.deny && aiCouldDeny.length) {
    status = 'decent' //       ai win, human win, ai deny
  } else if (!x.win && x.deny && aiCouldDeny.length) {
    status = 'notGood' //     ai deny, human win, ai deny
  }
  else if (!x.win && !x.deny && !aiCouldWin.length) { // finds where human win would lead ai
    status = 'bad' //          random, human win, random
  } else if (x.win && x.deny && !aiCouldWin.length) {
    status = 'safe' //        aiWinDeny, human win, random
  } else if (x.win && !x.deny && !aiCouldWin.length) {
    status = 'trade' //        ai win, human win, random
  } else if (!x.win && x.deny && !aiCouldWin.length) {
    status = 'poor' //        ai deny, human win, random
  } 
  if (typeof status === 'string') x[status] = true
}

const gradeHumanDeny = (tempArr, x, couldBeDenied, aiCouldDeny, aiCouldWin, humanVic, humanWin) => {
  let status
  if (!x.win && !x.deny && tempArr[couldBeDenied][0].wonBy) {
    status = 'safe' //         random, human deny, ai freeGo
  } else if (x.win && x.deny && tempArr[couldBeDenied][0].wonBy) {
    status = 'great' //      aiWinDeny, human deny, ai freeGo
  } else if (x.win && !x.deny && tempArr[couldBeDenied][0].wonBy) {
    status = 'great' //         ai win, human deny, ai freeGo
  } else if (!x.win && x.deny && tempArr[couldBeDenied][0].wonBy) {
    status = 'decent' //        ai deny, human deny, ai freeGo
  }
  else if (!x.win && !x.deny && aiCouldDeny.length) {
    status = 'notGood' //      random, human deny, ai deny
  } else if (x.win && x.deny && aiCouldDeny.length) {
    status = 'good' //      aiWinDeny, human deny, ai deny // should be better than good
  } else if (x.win && !x.deny && aiCouldDeny.length) {
    status = 'good' //         ai win, human deny, ai deny
  } else if (!x.win && x.deny && aiCouldDeny.length) {
    status = 'safe'//         ai deny, human deny, ai deny
  }
  else if (!x.win && !x.deny && aiCouldWin.length) {
    status = 'decent' //      random, human deny, ai win
  } else if (x.win && x.deny && aiCouldWin.length) {
    status = 'great' //   aiWinNDeny, human deny, ai win
  } else if (x.win && !x.deny && aiCouldWin.length) {
    status = 'good' //        ai win, human deny, ai win
  } else if (!x.win && x.deny && aiCouldWin.length) {
    status = 'decent' //     ai deny, human deny, ai win
  }
  else if (!x.win && !x.deny && !aiCouldWin.length) { // finds where human win would lead ai
    status = 'poor' //        random, human deny, random
  } else if (x.win && x.deny && !aiCouldWin.length) {
    status = 'decent' //  aiWinNDeny, human deny, random
  } else if (x.win && !x.deny && !aiCouldWin.length) {
    status = 'safe' //        ai win, human deny, random
  } else if (!x.win && x.deny && !aiCouldWin.length) {
    status = 'trade' //      ai deny, human deny, random
  } 
  if (typeof status === 'string') x[status] = true
}

const doesHumanSendToVic = (aiDb, arr, ai, human, couldBeWon, aiCouldWin, x) => {
  if (aiCouldWin.length) {
    let tempAiDb = JSON.parse(JSON.stringify(aiDb))
    for (let i = 0; i < aiCouldWin.length; i++) {
      findsVictory(arr, ai, human, tempAiDb, couldBeWon, aiCouldWin[i])
      if (tempAiDb[couldBeWon][aiCouldWin[i]].victory && !x.harikari) {
        x.leads2Vic = true // human win leads to ai Vic
        if (x.win && x.deny) x.great = true //     WinNDeny, win, vic
        else if (x.win) x.good = true //                Win, win, vic
        else if (x.deny) x.decent = true //            Deny, win, vic
        else if (!x.win && !x.deny) x.safe = true // random, win, vic
      }
    }
  }
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

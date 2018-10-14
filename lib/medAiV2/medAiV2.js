import {
  findsMiniGame,
  findsPlayable,
  findsMiniStatus,
  findsWinOrDeny,
  findsVictory,
  // findsVictoryDeny,
  findsLine2Continue,
  findsNewLine} from './lib/getInfoV2'

import noOtherChoice from './lib/noOtherChoice'
import {createAiArr, grading} from '../gameArrays'

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
    let win =
    findsWinOrDeny(aiOwns, playable, aiDb, arr, ai, human, coOrds, true)
    let deny =
    findsWinOrDeny(humanOwns, playable, aiDb, arr, ai, human, coOrds, false)
    let safeOrNot =
    findsIfMoveIsSafe(arr, mini[i], playable, ai, human, aiDb)
    let {continue2, continueAndMultiNew, continueAndNew, continue1} =
    findsLine2Continue(aiOwns, playable, mini[i], aiDb)
    let startsNewLine =
    findsNewLine(coOrds, playable, mini[i], aiDb)
    if (i === 100) { // for old way = "(i + 1 === mini.length)"
      makesChoice(arr, ai, human, coOrds, win, deny, continue2, continueAndMultiNew,
        continueAndNew, continue1, startsNewLine, playable, safeOrNot, aiDb, mini)
    }
  }
  if (coOrds.length < 2) {
    let allPlayable = newWayOfThinking(aiDb)
    let arranged = organizesAllPlayable(allPlayable)
    newMakesChoice(arranged, coOrds)
    // coOrds.push(arranged[0].coOrds[1])
  }
  return coOrds
}

const organizesAllPlayable = (allPlayable) => {
  let arranged = []
  for (let i = 0; i < grading.length; i++) {
    for (let j = 0; j < allPlayable.length; j++) {
      if (allPlayable[j][grading[i]]) arranged.push(allPlayable[j])
    }
  }
  return arranged
}

const newMakesChoice = (arranged, coOrds) => {
  for (let i = 0; i < arranged.length; i++) {
    let x = arranged[i]
    if (x.win && (x[grading[0]] || x[grading[1]] || x[grading[2]] || x[grading[3]])) coOrds.push(x.coOrds[1])
  }
  if (coOrds.length < 2) {
    for (let i = 0; i < arranged.length; i++) {
      let x = arranged[i]
      if (x.deny && (x[grading[0]] || x[grading[1]] || x[grading[2]] || x[grading[3]])) coOrds.push(x.coOrds[1])
    }
  }
  if (coOrds.length < 2) {
    for (let i = 0; i < arranged.length; i++) {
      let x = arranged[i]
      if (x.continue2 && (x[grading[0]] || x[grading[1]] || x[grading[2]] || x[grading[3]])) coOrds.push(x.coOrds[1])
    }
  }
  if (coOrds.length < 2) {
    for (let i = 0; i < arranged.length; i++) {
      let x = arranged[i]
      if (x.continueAndMultiNew && (x[grading[0]] || x[grading[1]] || x[grading[2]] || x[grading[3]])) coOrds.push(x.coOrds[1])
    }
  }
  if (coOrds.length < 2) {
    for (let i = 0; i < arranged.length; i++) {
      let x = arranged[i]
      if (x.deny && (x[grading[0]] || x[grading[1]] || x[grading[2]] || x[grading[3]])) coOrds.push(x.coOrds[1])
    }
  }
  if (coOrds.length < 2) {
    for (let i = 0; i < arranged.length; i++) {
      let x = arranged[i]
      if (x.continue1 && (x[grading[0]] || x[grading[1]] || x[grading[2]] || x[grading[3]])) coOrds.push(x.coOrds[1])
    }
  }
  if (coOrds.length < 2) {
    for (let i = 0; i < arranged.length; i++) {
      let x = arranged[i]
      if (x.continueAndNew && (x[grading[0]] || x[grading[1]] || x[grading[2]] || x[grading[3]])) coOrds.push(x.coOrds[1])
    }
  }
  if (coOrds.length < 2) {
    for (let i = 0; i < arranged.length; i++) {
      let x = arranged[i]
      if (x.startsNew && (x[grading[0]] || x[grading[1]] || x[grading[2]] || x[grading[3]] || x[grading[4]])) coOrds.push(x.coOrds[1])
    }
  }
}

const newWayOfThinking = (aiDb) => {
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

const makesChoice = (arr, ai, human, coOrds, win, deny, continue2, continueAndMultiNew,
  continueAndNew, continue1, startsNewLine, playable, safeOrNot, aiDb, mini) => {
  let notSafe = []
  let dead = []
  let safe = [] // array of objects with safe&playable in
  if (coOrds.length < 2) findsAllSafe(safe, aiDb, mini)
  if (win.length && coOrds.length < 2) {
    if (coOrds.length < 2) { isMoveSmart(win, coOrds, safeOrNot, notSafe, dead) }
  }
  if (deny.length && coOrds.length < 2) {
    isVictoryDenySafe(arr, ai, human, aiDb, coOrds, mini, safe) // make it only trigger if there is a vicDeny //
    if (coOrds.length < 2) { safeIfSendsToSame(coOrds, safeOrNot, deny) }
    if (coOrds.length < 2) { isMoveSmart(deny, coOrds, safeOrNot, notSafe, dead) }
  }
  if (continue2.length && coOrds.length < 2) {
    isMoveSmart(continue2, coOrds, safeOrNot, notSafe, dead)
  }
  if (continueAndMultiNew.length && coOrds.length < 2) {
    isMoveSmart(continueAndMultiNew, coOrds, safeOrNot, notSafe, dead)
  }
  if (continueAndNew.length && coOrds.length < 2) {
    isMoveSmart(continueAndNew, coOrds, safeOrNot, notSafe, dead)
  }
  if (continue1.length && coOrds.length < 2) {
    isMoveSmart(continue1, coOrds, safeOrNot, notSafe, dead)
  }
  if (startsNewLine.length && coOrds.length < 2) {
    isMoveSmart(startsNewLine, coOrds, safeOrNot, notSafe, dead)
  }
  if (mini.length < 2 && coOrds.length < 2) {
    isMoveSmart(playable, coOrds, safeOrNot, notSafe, dead) // test please
  }
  // if (coOrds.length < 2 && count > 1) {
  //   checkOtherMini(arr, ai, human, mini, count)
  // }
  if (coOrds.length < 2) {
    rethinksSafety(notSafe, dead, coOrds)
  }
  if (coOrds.length < 2) {
    noOtherChoice(coOrds, playable)
  }
  return coOrds
}

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

// const checkOtherMini = (arr, ai, human, mini, count) => {
//   mini.push(mini.shift())
//   count -= 1
//   thoughtProcess(arr, ai, human, mini, count) // rework to be smart
// }

const isMoveSmart = (posMoves, coOrds, safeOrNot, notSafe, dead) => { // make better
  for (let i = 0; i < posMoves.length; i++) {
    for (let j = 0; j < safeOrNot.length; j++) {
      if ((safeOrNot[j].status === 'safe' &&
         safeOrNot[j].mini === posMoves[i]) &&
               coOrds.length < 2) {
        coOrds.push(posMoves[i])
      } else if ((safeOrNot[j].status === 'notSafe' &&
                  safeOrNot[j].mini === posMoves[i]) &&
                        coOrds.length < 2) {
        notSafe.push(posMoves[i])
      } else if ((safeOrNot[j].status === 'dead' &&
                  safeOrNot[j].mini === posMoves[i]) &&
                        coOrds.length < 2) {
        dead.push(posMoves[i])
      }
    }
  }
}

const rethinksSafety = (notSafe, dead, coOrds) => { // MAKE BETTER LoPri
  for (let i = 0; i < notSafe.length; i++) {
    if (notSafe.length && coOrds.length < 2) {
      coOrds.push(notSafe[i])
    }
  }
  for (let i = 0; i < dead.length; i++) {
    if (notSafe.length && coOrds.length < 2) {
      coOrds.push(dead[i])
    }
  }
}

// augment to consider not sending to a game where human can deny
const findsIfMoveIsSafe = (arr, mini, willPlay, ai, human, aiDb) => { // willPlay === playable within current mini
  let safeOrNot = []
  for (let i = 0; i < willPlay.length; i++) {
    let x = aiDb[mini][willPlay[i]]
    let toPlay = Number(willPlay[i])
    if (arr[willPlay[i]][0].wonBy) {
      aiDb[willPlay[i]][0].deadMini = true
      safeOrNot.push({status: 'sends2dead', mini: toPlay}) && (x.sends2Dead = true)
    } else {
      let couldBeWon = humanWinOrAiDeny(arr, ai, human, willPlay[i])
      let couldBeDenied = aiWinOrHumanDeny(arr, ai, human, willPlay[i])
      const length = safeOrNot.length
      if (couldBeWon.length) { // player could win and so destination is checked for outcome.
        let sendToSame = wouldHumanWinSend2Same(couldBeWon, toPlay)
        isMoveHumanVic(aiDb, toPlay, couldBeWon[0], safeOrNot, x)
        if (!x.harikari === !sendToSame) {
          for (let j = 0; j < couldBeWon.length; j++) {
            if (length === safeOrNot.length) {
              splitHumanWin(arr, ai, human, aiDb, safeOrNot, mini, toPlay, couldBeWon[j], x)
            }
          }
        }
      } else if (couldBeDenied.length && length === safeOrNot.length) {
        let sendToSame = wouldHumanWinSend2Same(couldBeDenied, toPlay)
        isMoveHumanVic(aiDb, toPlay, couldBeDenied[0], safeOrNot, x)
        const length = safeOrNot.length
        if (!x.harikari === !sendToSame) {
          for (let j = 0; j < couldBeDenied.length; j++) {
            if (length === safeOrNot.length) {
              splitHumanDeny(arr, ai, human, aiDb, safeOrNot, mini, toPlay, couldBeDenied[j], x)
            }
          }
        }
        // write a set of conditions for if move sends human to mini with no advantage, grade ... etc
      } else { safeOrNot.push({status: 'safe', mini: toPlay}) && (x.safe = true) }
    }
  }
  return safeOrNot
}

const wouldHumanWinSend2Same = (couldBeWon, toPlay) => {
  if (couldBeWon.length < 2 && couldBeWon[0] === toPlay) return true
  else return false
  // for (let i = 0; i < couldBeWon.length; i++) {

  // }
}

const isMoveHumanVic = (aiDb, toPlay, couldBeWon, safeOrNot, x) => {
  if (aiDb[toPlay][couldBeWon].victoryDeny) { // move human could take would === victory
    safeOrNot.push({status: 'harikari', mini: toPlay}) && (x.harikari = true)
  }
}

const splitHumanWin = (arr, ai, human, aiDb, safeOrNot, mini, toPlay, couldBeWon, x) => {
  let tempArr = JSON.parse(JSON.stringify(arr))
  mockOutArr(tempArr, mini, toPlay, ai) // ai 'pseudo taken 1st' move
  mockOutArr(tempArr, toPlay, couldBeWon, human) // human 'pseudo taken 2nd' move
  let aiCouldWin = aiWinOrHumanDeny(tempArr, ai, human, couldBeWon)
  let aiCouldDeny = humanWinOrAiDeny(tempArr, ai, human, couldBeWon)
  if (doesHumanSendToVic(aiDb, arr, ai, human, couldBeWon, aiCouldWin, safeOrNot, toPlay, x)) return true// would lead to ai vic so move is decent and returns
  else gradeHumanWin(tempArr, x, toPlay, couldBeWon, aiCouldDeny, aiCouldWin, safeOrNot)
// safeOrNot.push({status: 'notSafe', mini: toPlay}) && (x.notSafe = true)
}

const gradeHumanWin = (tempArr, x, toPlay, couldBeWon, aiCouldDeny, aiCouldWin, safeOrNot) => {
  let status
  if (!x.win && !x.deny && tempArr[couldBeWon][0].wonBy) {
    status = 'safe' //          random, 1 human win, 1 ai free turn
  } else if (x.win && !x.deny && tempArr[couldBeWon][0].wonBy) {
    status = 'safe' //        1 ai win, 1 human win, 1 ai free turn
  } else if (!x.win && x.deny && tempArr[couldBeWon][0].wonBy) {
    status = 'safe' //         ai deny, 1 human win, 1 ai free turn
  }
  else if (!x.win && !x.deny && aiCouldDeny.length) {
    status = 'poor' //          random, 1 human win, 1 ai deny
  } else if (x.win && !x.deny && aiCouldDeny.length) {
    status = 'decent' //      1 ai win, 1 human win, 1 ai deny
  } else if (!x.win && x.deny && aiCouldDeny.length) {
    status = 'notGood' //    1 ai deny, 1 human win, 1 ai deny
  }
  else if (!x.win && !x.deny && aiCouldWin.length) {
    status = 'trade' //         random, 1 human win, 1 ai win
  } else if (x.win && !x.deny && aiCouldWin.length) {
    status = 'good' //        1 ai win, 1 human win, 1 ai win
  } else if (!x.win && x.deny && aiCouldWin.length) {
    status = 'decent' //     1 ai deny, 1 human win, 1 ai win
  }
  else if (!x.win && !x.deny && !aiCouldWin.length) { // finds where human win would lead ai
    status = 'bad' //           random, 1 human win, random
  } else if (x.win && !x.deny && !aiCouldWin.length) {
    status = 'trade' //       1 ai win, 1 human win, random
  } else if (!x.win && x.deny && !aiCouldWin.length) {
    status = 'poor' //       1 ai deny, 1 human win, random
  } 
  if (typeof status === 'string') {
    safeOrNot.push({status: status, mini: toPlay})
    x[status] = true
  }
}

const splitHumanDeny = (arr, ai, human, aiDb, safeOrNot, mini, toPlay, couldBeDenied, x) => {
  let tempArr = JSON.parse(JSON.stringify(arr))
  mockOutArr(tempArr, mini, toPlay, ai) // ai 'pseudo taken 1st' move
  mockOutArr(tempArr, toPlay, couldBeDenied, human) // human 'pseudo taken 2nd' move
  let aiCouldWin = aiWinOrHumanDeny(tempArr, ai, human, couldBeDenied)
  let aiCouldDeny = humanWinOrAiDeny(tempArr, ai, human, couldBeDenied)
  if (doesHumanSendToVic(aiDb, arr, ai, human, couldBeDenied, aiCouldWin, safeOrNot, toPlay, x)) return true
  else gradeHumanDeny(tempArr, x, toPlay, couldBeDenied, aiCouldDeny, aiCouldWin, safeOrNot)
}

const gradeHumanDeny = (tempArr, x, toPlay, couldBeDenied, aiCouldDeny, aiCouldWin, safeOrNot) => {
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
  if (typeof status === 'string') {
    safeOrNot.push({status: status, mini: toPlay})
    x[status] = true
  }
}

const doesHumanSendToVic = (aiDb, arr, ai, human, couldBeWon, aiCouldWin, safeOrNot, toPlay, x) => {
  if (aiCouldWin.length) {
    let tempAiDb = JSON.parse(JSON.stringify(aiDb))
    findsVictory(arr, ai, human, tempAiDb, couldBeWon, aiCouldWin[0])
    if (tempAiDb[couldBeWon][aiCouldWin[0]].victory) {
      safeOrNot.push({status: 'great', mini: toPlay}) && (x.leads2Vic = true)
      return true
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

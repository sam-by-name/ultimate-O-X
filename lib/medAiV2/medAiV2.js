import {
  findsMiniGame,
  findsPlayable,
  findsMiniStatus,
  findsWinOrDeny,
  findsLine2Continue,
  findsNewLine,
  randomNum} from './getInfoV2'

import {createAiArr} from '../gameArrays'

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
    let safeOrNot =
    findsIfMoveIsSafe(arr, mini, playable, ai, human, aiDb)
    coOrds = [mini[i]]
    let win =
    findsWinOrDeny(aiOwns, playable, aiDb, arr, ai, human, coOrds, true)
    let deny =
    findsWinOrDeny(humanOwns, playable, aiDb, arr, ai, human, coOrds, false)
    let {continue2, continueAndMultiNew, continueAndNew, continue1} =
    findsLine2Continue(aiOwns, playable, mini, aiDb)
    let startsNewLine =
    findsNewLine(coOrds, playable, mini, aiDb)
    if (i + 1 === mini.length) {
      makesChoice(arr, ai, human, coOrds, win, deny, continue2, continueAndMultiNew,
        continueAndNew, continue1, startsNewLine, playable, safeOrNot, aiDb, mini)
    }
  }
  return coOrds
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
    lastDitchMove(coOrds, playable)
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
const findsIfMoveIsSafe = (arr, mini, willPlay, ai, human, aiDb) => {
  let safeOrNot = []
  for (let i = 0; i < willPlay.length; i++) {
    let x = aiDb[mini[0]][willPlay[i]]
    let toPlay = Number(willPlay[i])
    if (arr[willPlay[i]][0].wonBy) {
      safeOrNot.push({status: 'dead', mini: toPlay}) && (x.dead = true)
    } else {
      let {playable, humanOwns} =
      findsPlayable(arr, willPlay[i], ai, human)
      let couldBeWon = findsWinOrDeny(humanOwns, playable)
      couldBeWon.length // removed because unsure if needed '&& mini[0] !== willPlay[i]'
        ? splitAndGradeNotSafe(arr, ai, human, aiDb, safeOrNot, couldBeWon, mini[0], toPlay, x)
        : safeOrNot.push({status: 'safe', mini: toPlay}) && (x.safe = true)
    }
  }
  return safeOrNot
}

const splitAndGradeNotSafe = (arr, ai, human, aiDb, safeOrNot, couldBeWon, mini, toPlay, x) => {
  if (aiDb[mini][toPlay].victoryDeny) {
    safeOrNot.push({status: 'harikari', mini: toPlay}) && (x.harikari = true)
  } else if (freeWin(arr, ai, human, mini, couldBeWon, toPlay)) { // finds where human win would lead ai
    safeOrNot.push({status: 'freeWin', mini: toPlay}) && (x.freeWin = true)
  }
  // safeOrNot.push({status: 'notSafe', mini: toPlay}) && (x.notSafe = true)
}

const freeWin = (arr, ai, human, mini, couldBeWon, toPlay) => { // does human get freeWin
  let tempArr = JSON.parse(JSON.stringify(arr))
  mockOutArr(tempArr, mini, toPlay, ai) // ai 'pesudo taken 1st' move

  let {playable, aiOwns} = // need to mock out arr with pseudo moves for this to work
  findsPlayable(tempArr, couldBeWon[0], ai, human)
  let aiCouldWin = findsWinOrDeny(aiOwns, playable)
  if (aiCouldWin.length) {
    mockOutArr(tempArr, toPlay, couldBeWon[0], human) // human 'pesudo taken 2nd' move
    return checksForHumanWin(tempArr, ai, human, aiCouldWin[0]) // does this work?
  }
  else return true
}

const checksForHumanWin = (tempArr, ai, human, mini, couldBeWon, toPlay) => {
  mockOutArr(tempArr, mini, couldBeWon, ai) //// continue here,~!@!!!!!!1
  // more mocking out of fake future arr for this too work
}

const mockOutArr = (tempArr, mini, cell, player) => {
  tempArr[mini][cell].wonBy = player
  tempArr[mini][cell].isPlayable = false
}

const lastDitchMove = (coOrds, playable) => {
  if (playable.includes('4')) {
    coOrds.push(4)
  } else {
    let index = randomNum(playable.length)
    coOrds.push(Number(playable[index]))
  }
  return coOrds
}

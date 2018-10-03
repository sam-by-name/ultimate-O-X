import {
  findsMiniGame,
  findsPlayable,
  findsWinOrDeny,
  findsLine2Continue,
  findsNewLine,
  randomNum} from '../getInfo'

import {aiArr} from './gameArrays'

export const mediumAi = (arr, ai, player) => {
  let aiDb = aiArr()
  let mini = findsMiniGame(arr, [], aiDb)
  let count = mini.length
  let coOrds = thoughtProcess(arr, ai, player, mini, count, aiDb)
  return {mini: coOrds[0], cell: coOrds[1]}
}

const thoughtProcess = (arr, ai, player, mini, count, aiDb) => {
  let {aiOwns, playable, playerOwns} =
  findsPlayable(arr, mini[0], aiDb, ai, player)
  let safeOrNot =
  findsIfMoveIsSafe(arr, mini, playable, ai, player, aiDb)
  let coOrds = [mini[0]]
  let win =
  findsWinOrDeny(aiOwns, playable, mini, aiDb, true)
  let deny =
  findsWinOrDeny(playerOwns, playable, mini, aiDb, false)
  let {continue2, continueAndMultiNew, continueAndNew, continue1} =
  findsLine2Continue(aiOwns, playable)
  let startsNewLine =
  findsNewLine(coOrds, playable)
  makesChoice(arr, ai, player, mini, count, coOrds, win, deny, continue2, continueAndMultiNew,
    continueAndNew, continue1, startsNewLine, playable, safeOrNot)
  return coOrds
}

const makesChoice = (arr, ai, player, mini, count, coOrds, win, deny, continue2, continueAndMultiNew,
  continueAndNew, continue1, startsNewLine, playable, safeOrNot) => {
  let notSafe = []
  let dead = []
  if (win.length) {
    willVicOrDenyVic(arr, ai, player, coOrds, win, true)
    if (coOrds.length < 2) { isMoveSmart(win, coOrds, safeOrNot, notSafe, dead) }
  }
  if (deny.length && coOrds.length < 2) {
    willVicOrDenyVic(arr, ai, player, coOrds, deny, false)
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
  // if (coOrds.length < 2 && count > 1) {
  //   checkOtherMini(arr, ai, player, mini, count)
  // }
  if (coOrds.length < 2) {
    rethinksSafety(notSafe, dead, coOrds)
  }
  if (coOrds.length < 2) {
    lastDitchMove(coOrds, playable)
  }
  return coOrds
}

// const populateAiDb = (aiDb, mini, payLoad) => {
//   for (let i = 0; i < 9; i++) {
//     if (payLoad[i] === i) {
//       aiDb[mini[0]][i].payLoad = true
//     }
//   }
// }

const safeIfSendsToSame = (coOrds, safeOrNot, deny) => {
  for (let i = 0; i < deny.length; i++) {
    if (deny[i] === coOrds[0]) {
      for (let j = 0; j < safeOrNot.length; j++) {
        if (safeOrNot[j].mini === deny[i]) {
          safeOrNot[j].status = 'safe'
        }
      }
    }
  }
}

const willVicOrDenyVic = (arr, ai, player, coOrds, winDeny, boo) => {
  let {aiOwns, playable, playerOwns} =
  findsPlayable(arr, coOrds[0], ai, player) // function will be broken now
  let isOwned
  if (boo) isOwned = aiOwns
  else isOwned = playerOwns
  let victory =
  findsWinOrDeny(isOwned, playable)
  for (let i = 0; i < victory.length; i++) {
    if (victory[i] === coOrds[0]) { // if move in mini can win whole or prevent win, takes it
      coOrds.push(winDeny[0]) // good 4 win, but if deny can it be smarter?
    } // if its a deny and doesn't send to another victory ... ???
  }
}

// const checkOtherMini = (arr, ai, player, mini, count) => {
//   mini.push(mini.shift())
//   count -= 1
//   thoughtProcess(arr, ai, player, mini, count) // rework to be smart
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

const rethinksSafety = (notSafe, dead, coOrds) => { // MAKE BETTER
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

const findsIfMoveIsSafe = (arr, mini, willPlay, ai, player, aiDb) => { // augment to consider not sending to a game where human can deny
  let safeOrNot = []
  for (let i = 0; i < willPlay.length; i++) {
    if (arr[willPlay[i]][0].wonBy) {
      safeOrNot.push({status: 'dead', mini: Number(willPlay[i])})
      aiDb[mini[0]][willPlay[i]].dead = true
    } else {
      let {playable, playerOwns} =
      findsPlayable(arr, willPlay[i], ai, player)
      let couldBeWon = findsWinOrDeny(playerOwns, playable)
      couldBeWon.length && mini[0] !== willPlay[i]
        ? safeOrNot.push({status: 'notSafe', mini: Number(willPlay[i])}) && (aiDb[mini[0]][willPlay[i]].notSafe = true)
        : safeOrNot.push({status: 'safe', mini: Number(willPlay[i])}) && (aiDb[mini[0]][willPlay[i]].safe = true)
    }
  }
  return safeOrNot
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

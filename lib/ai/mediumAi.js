import {
  findsMiniGame,
  findsPlayable,
  findsWinOrDeny,
  findsLine2Continue,
  findsNewLine,
  randomNum} from './getInfo'

export const mediumAi = (arr, ai, player) => {
  let mini = findsMiniGame(arr, [])
  let count = mini.length
  let coOrds = thoughtProcess(arr, ai, player, mini, count)
  return {mini: coOrds[0], cell: coOrds[1]}
}

const thoughtProcess = (arr, ai, player, mini, count) => {
  let {aiOwns, playable, playerOwns} =
  findsPlayable(arr, mini, ai, player, true)
  let safeOrNot =
  findsIfMoveIsSafe(arr, mini, playable, ai, player)
  let coOrds = [mini[0]]
  let win =
  findsWinOrDeny(aiOwns, playable)
  let deny =
  findsWinOrDeny(playerOwns, playable)
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
    willWinWin(arr, mini, ai, player, safeOrNot, win)
    isMoveSmart(win, coOrds, safeOrNot, notSafe, dead)
  }
  if (deny.length && coOrds.length < 2) {
    isMoveSmart(deny, coOrds, safeOrNot, notSafe, dead)
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
  if (coOrds.length < 2 && count > 1) {
    checkOtherMini(arr, ai, player, mini, count)
  }
  if (coOrds.length < 2) {
    rethinksSafety(notSafe, dead, coOrds)
  }
  if (coOrds.length < 2) {
    lastDitchMove(coOrds, playable)
  }
  return coOrds
}

const willWinWin = (arr, mini, ai, player, safeOrNot, win) => {
  let {aiOwns, playable} =
  findsPlayable(arr, mini, ai, player, false)
  let victory =
  findsWinOrDeny(aiOwns, playable)
  for (let i = 0; i < victory.length; i++) {
    if (victory[i] === mini[0]) {
      for (let j = 0; j < safeOrNot.length; j++) {
        safeOrNot[j].status = 'safe'
      }
    }
  }
}

const checkOtherMini = (arr, ai, player, mini, count) => {
  mini.push(mini.shift())
  count -= 1
  thoughtProcess(arr, ai, player, mini, count) // rework to be smart
}

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

const findsIfMoveIsSafe = (arr, mini, willPlay, ai, player) => { // augment to consider not sending to a game where human can deny
  let safeOrNot = []
  for (let i = 0; i < willPlay.length; i++) {
    if (arr[willPlay[i]][0].wonBy) {
      safeOrNot.push({status: 'dead', mini: Number(willPlay[i])})
    } else {
      let {playable, playerOwns} =
      findsPlayable(arr, [willPlay[i]], ai, player, true)
      let couldBeWon = findsWinOrDeny(playerOwns, playable)
      couldBeWon.length && mini[0] !== willPlay[i]
        ? safeOrNot.push({status: 'notSafe', mini: Number(willPlay[i])})
        : safeOrNot.push({status: 'safe', mini: Number(willPlay[i])})
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

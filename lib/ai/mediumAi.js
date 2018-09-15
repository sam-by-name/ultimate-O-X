import {win, couldWin, willWin} from '../gameArrays'

export const mediumAi = (arr, ai, player) => {
  let mini = []
  findsMiniGame(arr, mini)
  let coOrds = thoughtProcess(arr, ai, player, mini)
  return {mini: coOrds[0], cell: coOrds[1]}
}

const thoughtProcess = (arr, ai, player, mini) => {
  let {aiOwns, playable, playerOwns} =
  findsPlayable(arr, mini, ai, player)
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
  makesChoice(arr, ai, player, mini, coOrds, win, deny, continue2, continueAndMultiNew,
    continueAndNew, continue1, startsNewLine, playable, safeOrNot)
  return coOrds
}

const makesChoice = (arr, ai, player, mini, coOrds, win, deny, continue2, continueAndMultiNew,
  continueAndNew, continue1, startsNewLine, playable, safeOrNot) => {
  let notSafe = []
  let dead = []
  if (win.length) {
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
  if (coOrds.length < 2 && mini.length > 1) {
    checkOtherMini(arr, ai, player, mini)
  }
  if (coOrds.length < 2) {
    rethinksSafety(notSafe, dead, coOrds)
  }
  if (coOrds.length < 2) {
    lastDitchMove(coOrds, playable)
  }
  return coOrds
}

const checkOtherMini = (arr, ai, player, mini) => {
  mini.shift()
  thoughtProcess(arr, ai, player, mini)
}

const isMoveSmart = (posMoves, coOrds, safeOrNot, notSafe, dead) => {
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
      findsPlayable(arr, [willPlay[i]], ai, player)
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

const findsMiniGame = (arr, mini) => {
  for (let i = 0; i < 9; i++) {
    if (arr[i][0].isPlayable) {
      mini.push(i)
    }
  }
  // if (mini.length > 1) {
  //   let miniIndex = randomNum(mini.length)
  //   mini.unshift([mini[miniIndex - 1]])
  // }
  return mini
}

const findsPlayable = (arr, mini, ai, player) => {
  let aiOwns = ''
  let playable = ''
  let playerOwns = ''
  for (let j = 0; j < 9; j++) {
    if (arr[mini[0]][j].takenBy === ai.name) {
      aiOwns += `${j}`
    } else if (arr[mini[0]][j].takenBy === player.name) {
      playerOwns += `${j}`
    }
    if (arr[mini[0]][j].isAlive) {
      playable += `${j}`
    }
  }
  return {aiOwns, playable, playerOwns}
}

const findsWinOrDeny = (isOwned, playable) => {
  let winOrDeny = []
  for (let j = 0; j < couldWin.length; j++) {
    if (isOwned.includes(couldWin[j][0]) &&
        isOwned.includes(couldWin[j][1]) &&
       playable.includes(willWin[j])) {
      winOrDeny.push(Number(willWin[j]))
    }
  }
  return winOrDeny
}

const findsWillPlay = (aiOwns, playable) => {
  let willPlay = []
  for (let i = 0; i < win.length; i++) {
    willPlay = []
    for (let j = 0; j < couldWin.length; j++) {
      if (aiOwns.includes(willWin[j]) &&
        playable.includes(couldWin[j][0]) &&
        playable.includes(couldWin[j][1])) {
        willPlay.push(couldWin[j])
      }
    }
  }
  return willPlay
}

const continuesAndStartsNew = (playable, counted) => {
  let movesThatContainCounted = []
  let posLines = findsAllPlayableWins(playable)
  for (let x = 0; x < posLines.length; x++) {
    for (let z = 0; z < counted.length; z++) {
      if (posLines[x].includes(counted[z].value)) {
        movesThatContainCounted.push(counted[z].value)
      }
    }
  }
  return movesThatContainCounted
}

const findContinue2 = (counted, continue2) => {
  for (let i = 0; i < counted.length; i++) {
    if (counted[i].count > 1) {
      continue2.push(counted[i].value)
    }
  }
  return continue2
}

const splitsSorted = (sorted, continueAndMultiNew, continueAndNew) => {
  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i].count > 1) {
      continueAndMultiNew.push(sorted[i].value)
    } else {
      continueAndNew.push(sorted[i].value)
    }
  }
}

const findsLine2Continue = (aiOwns, playable) => {
  let continue2 = []
  let continueAndNew = []
  let continueAndMultiNew = []
  let continue1 = []
  if (aiOwns.length >= 1) {
    let willPlay = findsWillPlay(aiOwns, playable)
    if (willPlay.length) {
      let splitWillPlay = arrSplit(willPlay)
      let counted = countNumberOfInstances(splitWillPlay)
      continue2 = findContinue2(counted, continue2)
      let continues = continuesAndStartsNew(playable, counted)
      let sorted = countNumberOfInstances(continues)
      splitsSorted(sorted, continueAndMultiNew, continueAndNew)
      let splitPlay = arrSplit(willPlay)
      continue1 = [...new Set(splitPlay)]
    }
  }
  return {continue2, continueAndMultiNew, continueAndNew, continue1}
}

const findsAllPlayableWins = (playable) => {
  let posLines = []
  for (let i = 0; i < win.length; i++) {
    if (playable.includes(win[i][0]) &&
        playable.includes(win[i][1]) &&
        playable.includes(win[i][2])) {
      posLines.push(win[i])
    }
  }
  return posLines
}

const findsNewLine = (coOrds, playable) => {
  let posLines = []
  if (coOrds.length < 2) {
    posLines = findsAllPlayableWins(playable)
  }
  let startsNew = arrSplit(posLines)
  startsNew = countNumberOfInstances(startsNew)
  let startsNewLine = []
  for (let i = 0; i < startsNew.length; i++) {
    startsNewLine.push(startsNew[i].value)
  }
  return startsNewLine
}

const arrSplit = (arr) => {
  return arr.join('').split('').map(Number)
}

const countNumberOfInstances = (arr) => {
  return arr.reduce((acc, curr) => {
    const obj = acc.find(o => o.value === curr)
    obj ? obj.count += 1
      : acc.push({'value': curr, 'count': 1})
    return acc.sort((a, b) => a.count < b.count)
  }, [])
}

export const randomNum = (num) => {
  return Math.floor(Math.random() * num)
}

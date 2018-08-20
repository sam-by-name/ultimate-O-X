import {win, couldWin, willWin} from '../gameArrays'

export const computersTurn = (arr, ai, player) => {
  let mini = []
  findsMiniGame(arr, mini)
  let {aiOwns, playable, playerOwns} =
  findsPlayable(arr, mini, ai, player)
  let coOrds = [mini[0]]
  findsWinOrDeny(coOrds, aiOwns, playable) // checks for win
  findsWinOrDeny(coOrds, playerOwns, playable) // checks for deny if win not possible
  // if playable and 2nd in a line can be part of more than one possible line ...?
  // if move would send to a won mini, check alternatives
  // if move would send to a game that can be won, check alternatives
  findsLine2Continue(coOrds, aiOwns, playable)
  findsNewLine(coOrds, playable)
  lastDitchMove(coOrds, playable)
  return {aiMini: coOrds[0], aiCell: coOrds[1]}
}

const findsMiniGame = (arr, mini) => {
  for (let i = 0; i < 9; i++) { // finds miniGame available
    if (arr[i][0].isPlayable) {
      mini.push(i)
    }
  }
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

const findsWinOrDeny = (coOrds, isOwned, playable) => { // completes line if it can
  if (coOrds.length < 2) {
    for (let j = 0; j < couldWin.length; j++) {
      if (isOwned.includes(couldWin[j][0]) &&
      isOwned.includes(couldWin[j][1]) &&
        playable.includes(willWin[j])) {
        coOrds.push(Number(willWin[j]))
      }
    }
    return coOrds
  }
}

const findsLine2Continue = (coOrds, aiOwns, playable) => {
  if (aiOwns.length >= 1 && coOrds.length < 2) {
    for (let i = 0; i < win.length; i++) {
      let newWin = ''
      for (let j = 0; j < couldWin.length; j++) {
        if (aiOwns.includes(willWin[j]) &&
          playable.includes(couldWin[j][0]) &&
          playable.includes(couldWin[j][1])) {
          newWin = couldWin[j]
        }
      }
      if (newWin.length === 2 && coOrds.length < 2) {
        coOrds.push(
          newWin[randomNum(2)]
        )
      }
    }
  }
  return coOrds
}

const findsNewLine = (coOrds, playable) => {
  if (coOrds.length < 2) {
    let willPlay = []
    for (let i = 0; i < win.length; i++) {
      if (playable.includes(win[i][0]) &&
          playable.includes(win[i][1]) &&
          playable.includes(win[i][2])) {
        willPlay.push(win[i])
      }
    }
    if (willPlay.length) {
      let winSet = randomNum(willPlay.length)
      let index = randomNum(3)
      coOrds.push(willPlay[winSet][index])
    }
  }
  return coOrds
}

const lastDitchMove = (coOrds, playable) => {
  if (playable.includes('4') && coOrds.length < 2) {
    coOrds.push(4)
  } else {
    let index = randomNum(playable.length)
    coOrds.push(Number(playable[index]))
  }
  return coOrds
}

export const randomNum = (num) => {
  return Math.floor(Math.random() * num)
}

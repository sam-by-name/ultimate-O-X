import {win, couldWin, willWin} from '../gameArrays'

export const computersTurn = (arr, ai) => {
  let mini = []
  findsMiniGame(arr, mini)
  let {aiOwns, playable} =
  findsPlayable(arr, mini, ai)
  let coOrds = [mini[0]]
  findsWinningMove(coOrds, aiOwns, playable)
  // randomize gameArrays, so they still correlate but make ai seem less on rails
  // if playable and 2nd in a line can be part of more than one possible line ...?
  // if player can be denied function...???
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

const findsPlayable = (arr, mini, ai) => {
  let aiOwns = ''
  let playable = ''
  for (let j = 0; j < 9; j++) {
    if (arr[mini[0]][j].takenBy === ai.name) {
      aiOwns += `${j}`
    }
    if (arr[mini[0]][j].isAlive) {
      playable += `${j}`
    }
  }
  return {aiOwns, playable}
}

const findsWinningMove = (coOrds, aiOwns, playable) => { // completes line if it can
  for (let j = 0; j < couldWin.length; j++) {
    if (aiOwns.includes(couldWin[j][0]) &&
     aiOwns.includes(couldWin[j][1]) &&
     playable.includes(willWin[j])) {
      coOrds.push(Number(willWin[j]))
    }
  }
  return coOrds
}

const findsLine2Continue = (coOrds, aiOwns, playable) => {
  if (aiOwns.length >= 1 && coOrds.length < 2) {
    let posCoOrds = ''
    for (let i = 0; i < win.length; i++) {
      let newWin = ''
      for (let j = 0; j < 3; j++) { // adapt to find if there is a space that makes two or more lines possible
        if (aiOwns.includes(win[i][j])) {
          for (let g = 0; g < 3; g++) {
            if (win[i][g] !== win[i][j]) {
              newWin += win[i][g]
            }
          }
        }
      }
      if (newWin.length === 2) {
        if (playable.includes(newWin[0]) &&
            playable.includes(newWin[1])) {
          for (let x = 0; x < playable.length; x++) {
            if (newWin.includes(playable[x])) {
              posCoOrds += playable[x]
            }
          }
          coOrds.push(
            posCoOrds[Math.floor(Math.random() * 2)]
          )
        }
      }
    }
  }
  return coOrds
}

const findsNewLine = (coOrds, playable) => {
  if (coOrds.length < 2) {
    for (let i = 0; i < win.length; i++) {
      if (playable.includes(win[i][0]) &&
          playable.includes(win[i][1]) &&
          playable.includes(win[i][2])) {
        let willPlay = []
        for (let j = 0; j < playable.length; j++) {
          if (win[i].includes(playable[j])) {
            willPlay.push(playable[j])
          }
        }
        let index = Math.floor(Math.random() * willPlay.length)
        coOrds.push(willPlay[index])
      }
    }
  }
  return coOrds
}

const lastDitchMove = (coOrds, playable) => {
  if (playable.includes('4') && coOrds.length < 2) {
    coOrds.push(4)
  } else {
    let index = Math.floor(Math.random() * playable.length)
    coOrds.push(Number(playable[index]))
  }
  return coOrds
}

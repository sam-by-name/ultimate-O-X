import {win, couldWin, willWin} from '../gameArrays'

const findsPlayable = (mini, ai, arr) => {
  let aiOwns = ''
  let playable = ''
  for (let j = 0; j < 9; j++) { // finds cells available
    if (arr[mini[0]][j].takenBy === ai.name) {
      aiOwns += `${j}`
    }
    if (arr[mini[0]][j].isAlive) {
      playable += `${j}`
    }
  }
  return {aiOwns, playable}
}

const findsWinningMove = (coOrds, aiOwns, playable) => {
  for (let j = 0; j < couldWin.length; j++) { // search's for 2/3 and completes if it can
    if (aiOwns.includes(couldWin[j][0]) &&
     aiOwns.includes(couldWin[j][1]) &&
     playable.includes(willWin[j])) {
      coOrds.push(Number(willWin[j]))
    }
  }
  return coOrds
}

export const computersTurn = (arr, ai) => {
  let mini = []

  for (let i = 0; i < 9; i++) { // finds miniGame available
    if (arr[i][0].isPlayable) {
      mini.push(i)
    }
  }

  let {aiOwns, playable} = findsPlayable(mini, ai, arr)

  let coOrds = [mini[0]]

  findsWinningMove(coOrds, aiOwns, playable)

  // if player can be denied ...

  if (aiOwns.length >= 1 && coOrds.length < 2) { // if one is taken check to continue line if available
    let posCoOrds = ''
    for (let i = 0; i < win.length; i++) {
      let newWin = ''
      for (let j = 0; j < 3; j++) { // adapt to find if there is a space that makes two lines possible
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
  if (playable.includes('4') && coOrds.length < 2) {
    coOrds.push(4)
  } else {
    let index = Math.floor(Math.random() * playable.length)
    coOrds.push(Number(playable[index]))
  }
  return {aiMini: coOrds[0], aiCell: coOrds[1]}
}

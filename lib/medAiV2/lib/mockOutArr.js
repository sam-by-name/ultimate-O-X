export const mockOutArr = (arr, mini, cell, player, boo) => {
  if (boo) {
    for (let i = 0; i < 9; i++) {
      arr[mini][i].wonBy = player
      arr[mini][i].isAlive = false
      arr[mini][cell].takenBy = player
      // arr[mini][i].isPlayable = false
    }
  } else {
    arr[mini][cell].isAlive = false
    // arr[mini][cell].isPlayable = false
    arr[mini][cell].takenBy = player
  }
  checkForDraw(arr, mini)
  setBoundaries(arr, cell)
}

const setBoundaries = (arr, cell) => {
  for (let g = 0; g < 9; g++) {
    for (let j = 0; j < 9; j++) {
      if (!arr[cell][j].wonBy && g === cell) arr[cell][j].isPlayable = true // if where its being sent isn't dead, make it playable
      else if (arr[cell][j].wonBy && !arr[g][j].wonBy) arr[g][j].isPlayable = true // if where its being sent is dead, make everywhere else that isn't dead, playable
      else if (!arr[cell][j].wonBy && g !== cell && !arr[g][j].wonBy) arr[g][j].isPlayable = false
    }
  }
}

const checkForDraw = (arr, mini) => {
  let drawPool = 0
  for (let i = 0; i < 9; i++) {
    if (arr[mini][i].takenBy && !arr[mini][i].wonBy) {
      drawPool += 1
    }
  }
  if (drawPool === 9) {
    for (let j = 0; j < 9; j++) {
      arr[mini][j].wonBy = 'DRAW'
      arr[mini][j].isPlayable = false
      arr[mini][j].isAlive = false
    }
  }
}

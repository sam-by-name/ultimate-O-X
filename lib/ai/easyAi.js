import {win, couldWin, willWin} from '../gameArrays'

export const computersChoice = (arr, ai, player) => {
  let mini = []
  findsMiniGame(arr, mini)
  let {aiOwns, playable, playerOwns} =
  findsPlayable(arr, mini, ai, player)
  let coOrds = [mini[0]]
  findsWinOrDeny(coOrds, aiOwns, playable) // checks for win
  findsWinOrDeny(coOrds, playerOwns, playable) // checks for deny if win not possible
  // if move would send to a won mini, check alternatives
  // if move would send to a game that can be won, check alternatives
  findsLine2Continue(coOrds, aiOwns, playable)
  findsNewLine(coOrds, playable)
  lastDitchMove(coOrds, playable)
  return {mini: coOrds[0], cell: coOrds[1]}
}

const findsMiniGame = (arr, mini) => {
  for (let i = 0; i < 9; i++) { // finds miniGame available
    if (arr[i][0].isPlayable) {
      mini.push(i)
    }
  }
  return mini
}

// function accesses all miniGames if free range has been given.
// finds most suitable mini to then play in.

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
      let willPlay = []
      for (let j = 0; j < couldWin.length; j++) {
        if (aiOwns.includes(willWin[j]) &&
          playable.includes(couldWin[j][0]) &&
          playable.includes(couldWin[j][1])) {
          willPlay.push(couldWin[j])
        }
      }
      if (willPlay.length >= 1 && coOrds.length < 2) { // might not be optimum if there is only one line to continue
        // coOrds.push(willPlay[randomNum(2)])         // returns mostOccurred of highest num
        let splitWillPlay = arrSplit(willPlay)
        let counted = countNumberOfInstances(splitWillPlay, [])
        let count = 1
        for (let g = 0; g < counted.length; g++) {
          if (counted[g] > 1) {
            count += counted[g]
          }
        }
        if (count > 1 && coOrds.length < 2) {
          let occursMost = findMostPrevalent(willPlay)
          coOrds.push(occursMost)
        } else if (count === 1 && coOrds.length < 2) {
          let posContainsCounted = []
          let posLines = findsAllPlayableWins(playable)
          for (let x = 0; x < posLines.length; x++) {
            for (let z = 0; z < counted.length; z++) {
              if (posLines[x].includes(z) && counted[z] === 1) {
                posContainsCounted.push(z)
              }
            }
          }
          let choice = findMostPrevalent(posContainsCounted)
          if (choice >= 1) { // doesn't work if choice is a zero
            coOrds.push(choice)
          } else {
            coOrds.push(willPlay[randomNum(2)])
          }
          //
        }
      }
    }
  }
  return coOrds
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
  if (coOrds.length < 2) {
    let posLines = findsAllPlayableWins(playable)
    if (posLines.length && coOrds.length < 2) {
      coOrds.push(
        posLines[randomNum(posLines.length)][randomNum(3)])
    }
    // else if (posLines.length > 1 && coOrds.length < 2) {
    //   let sorted = findMostPrevalent(posLines)
    //   coOrds.push(sorted)
    // }
  }
  return coOrds
}

const arrSplit = (arr) => {
  return arr.join('').split('').map(Number)
}

const countNumberOfInstances = (arr, objOrArr) => {
  return arr.reduce((allNum, num) => {
    if (num in allNum) {
      allNum[num]++
    } else {
      allNum[num] = 1
    }
    return allNum
  }, objOrArr)
}

const findMostPrevalent = (toSort) => {
  let split = arrSplit(toSort)
  let counted = countNumberOfInstances(split, {})
  let number = Object.keys(counted).reduce((a, b) => counted[a] > counted[b] ? a : b)
  return number
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

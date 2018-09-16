import {win, couldWin, willWin} from '../gameArrays'

export const findsMiniGame = (arr, mini) => {
  for (let i = 0; i < 9; i++) {
    if (arr[i][0].isPlayable) {
      mini.push(i)
    }
  }
  if (mini.length > 1) {
    let jumbledMini = []
    let count = mini.length
    for (let i = 0; i < count; i++) {
      let index = randomNum(mini.length)
      jumbledMini.push(mini[index])
      mini.splice(index, 1)
    }
    mini = jumbledMini
  }
  return mini
}

export const findsPlayable = (arr, mini, ai, player) => {
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

export const findsWinOrDeny = (isOwned, playable) => {
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

export const findsLine2Continue = (aiOwns, playable) => {
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

export const findsNewLine = (coOrds, playable) => {
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

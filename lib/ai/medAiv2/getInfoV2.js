import {win, couldWin, willWin} from '../gameArrays'

export const findsMiniGame = (arr, mini, aiDb) => {
  for (let i = 0; i < 9; i++) {
    if (arr[i][0].isPlayable) {
      mini.push(i)
      aiDb[i][0].miniPlayable = true
    }
  }
  // if (mini.length > 1) {
  //   let jumbledMini = []
  //   let count = mini.length
  //   for (let i = 0; i < count; i++) {
  //     let index = randomNum(mini.length)
  //     jumbledMini.push(mini[index])
  //     mini.splice(index, 1)
  //   }
  //   mini = jumbledMini
  // }
  return mini
}

export const findsPlayable = (arr, mini, aiDb, ai, player) => {
  let aiOwns = ''
  let playable = ''
  let playerOwns = ''
  for (let j = 0; j < 9; j++) {
    if (arr[mini][j].takenBy === ai.name) {
      aiOwns += `${j}`
      aiDb[mini[0]][j].aiOwns = true
    } else if (arr[mini][j].takenBy === player.name) {
      playerOwns += `${j}`
      aiDb[mini[0]][j].playable = true
    }
    if (arr[mini[0]][j].isAlive) {
      playable += `${j}`
      aiDb[mini[0]][j].playable = true
    }
  }
  return {aiOwns, playable, playerOwns}
}

export const findsWinOrDeny = (isOwned, playable, mini, aiDb, boo) => {
  let winOrDeny = []
  for (let j = 0; j < couldWin.length; j++) {
    if (isOwned.includes(couldWin[j][0]) &&
        isOwned.includes(couldWin[j][1]) &&
       playable.includes(willWin[j])) {
      winOrDeny.push(Number(willWin[j]))
      if (boo) aiDb[mini[0]][willWin[j]].win = true
      if (!boo) aiDb[mini[0]][willWin[j]].deny = true
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

const findContinue2 = (counted, continue2, mini, aiDb) => {
  for (let i = 0; i < counted.length; i++) {
    if (counted[i].count > 1) {
      continue2.push(counted[i].value)
      aiDb[mini[0]][counted[i].value].continue2 = true
    }
  }
  return continue2
}

const splitsSorted = (sorted, continueAndMultiNew, continueAndNew, mini, aiDb) => {
  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i].count > 1) {
      continueAndMultiNew.push(sorted[i].value)
      aiDb[mini[0]][sorted[i].value].continueAndMultiNew = true
    } else {
      continueAndNew.push(sorted[i].value)
      aiDb[mini[0]][sorted[i].value].continueAndNew = true
    }
  }
}

export const findsLine2Continue = (aiOwns, playable, mini, aiDb) => {
  let continue2 = []
  let continueAndNew = []
  let continueAndMultiNew = []
  let continue1 = []
  if (aiOwns.length >= 1) {
    let willPlay = findsWillPlay(aiOwns, playable)
    if (willPlay.length) {
      let splitWillPlay = arrSplit(willPlay)
      let counted = countNumberOfInstances(splitWillPlay)
      continue2 = findContinue2(counted, continue2, mini, aiDb)
      let continues = continuesAndStartsNew(playable, counted)
      let sorted = countNumberOfInstances(continues)
      splitsSorted(sorted, continueAndMultiNew, continueAndNew, mini, aiDb)
      findsContinue1(willPlay, continue1, mini, aiDb)
    }
  }
  return {continue2, continueAndMultiNew, continueAndNew, continue1}
}

const findsContinue1 = (willPlay, continue1, mini, aiDb) => {
  let splitPlay = arrSplit(willPlay)
  continue1 = [...new Set(splitPlay)]
  for (let i = 0; i < 9; i++) {
    if (continue1[i] === i) {
      aiDb[mini[0]][i].continue1 = true
    }
  }
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

export const findsNewLine = (coOrds, playable, mini, aiDb) => {
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

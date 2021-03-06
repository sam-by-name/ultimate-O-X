import {win, couldWin, willWin} from '../../gameArrays'

export const findsMiniGame = (arr, mini, aiDb) => { //
  for (let i = 0; i < 9; i++) {
    if (arr[i][0].isPlayable) {
      mini.push(i)
      aiDb[i][0].miniPlayable = true
    } else { aiDb[i][0].miniPlayable = false }
  }
  return mini
}

export const findsPlayable = (arr, mini, ai, human, aiDb, boo) => { //
  let aiOwns = ''
  let playable = ''
  let humanOwns = ''
  for (let j = 0; j < 9; j++) {
    if (arr[mini][j].takenBy === ai) {
      aiOwns += `${j}`
      if (boo) aiDb[mini][j].aiOwns = true
    } else if (arr[mini][j].takenBy === human) {
      humanOwns += `${j}`
      if (boo) aiDb[mini][j].humanOwns = true
    } else {
      playable += `${j}`
      if (boo) aiDb[mini][j].playable = true
      if (boo && j === mini) aiDb[mini][j].sends2Same = true
    }
  }
  return {aiOwns, playable, humanOwns, aiDb}
}

// finds which miniGames have been won and who owns them
export const findsMiniStatus = (arr, ai, human) => { //
  let aiOwns = ''
  let playable = ''
  let humanOwns = ''
  for (let i = 0; i < 9; i++) {
    let x = arr[i][0].wonBy
    if (x === ai) aiOwns += `${i}`
    else if (x === human) humanOwns += `${i}`
    if (!x) playable += `${i}`
  }
  return {aiOwns, playable, humanOwns}
}

export const findsWinOrDeny = //
(isOwned, playable, aiDb, mini, boo) => {
  let winOrDeny = []
  for (let j = 0; j < couldWin.length; j++) {
    if (isOwned.includes(couldWin[j][0]) &&
        isOwned.includes(couldWin[j][1]) &&
       playable.includes(willWin[j])) {
      winOrDeny.push(Number(willWin[j]))
      if (boo) aiDb[mini][Number(willWin[j])].win = true
      else if (typeof boo === 'boolean' && !boo) aiDb[mini][Number(willWin[j])].deny = true
    }
  }
  return winOrDeny
}

export const findsWillPlay = (aiOwns, playable) => { //
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

export const findsContinuesAndNew = (playable, counted) => { //
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

export const findsContinue1And2 = (counted, mini, aiDb, boo) => { //
  for (let i = 0; i < counted.length; i++) {
    if (counted[i].count > 1) {
      boo ? aiDb[mini][counted[i].value].continue2 = true
        : bigContinueLines(aiDb, counted[i].value, true)
    } else if (counted[i].count === 1) {
      boo ? aiDb[mini][counted[i].value].continue1 = true
        : bigContinueLines(aiDb, counted[i].value, false)
    }
  }
}

const bigContinueLines = (aiDb, counted, boo) => {
  for (let i = 0; i < 9; i++) {
    boo ? aiDb[counted][i].bigContinue2 = true
      : aiDb[counted][i].bigContinue1 = true
  }
}

export const marksContinueAndNew = (sorted, mini, aiDb, boo) => { //
  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i].count > 1) {
      boo ? aiDb[mini][sorted[i].value].continueAndMultiNew = true
        : bigContinueAndNew(aiDb, sorted[i].value, true)
    } else {
      boo ? aiDb[mini][sorted[i].value].continueAndNew = true
        : bigContinueAndNew(aiDb, sorted[i].value, false)
    }
  }
}

const bigContinueAndNew = (aiDb, sorted, boo) => {
  for (let i = 0; i < 9; i++) {
    boo ? aiDb[sorted][i].bigContinueAndMultiNew = true
      : aiDb[sorted][i].bigContinueAndNew = true
  }
}

export const findsLine2Continue = (aiOwns, playable, mini, aiDb, boo) => {
  if (aiOwns.length >= 1) {
    let willPlay = findsWillPlay(aiOwns, playable)
    if (willPlay.length) {
      let splitWillPlay = arrSplit(willPlay)
      let counted = countNumberOfInstances(splitWillPlay)
      findsContinue1And2(counted, mini, aiDb, boo)
      let continues = findsContinuesAndNew(playable, counted)
      let sorted = countNumberOfInstances(continues)
      marksContinueAndNew(sorted, mini, aiDb, boo)
    }
  }
}

export const findsAllPlayableWins = (playable) => { //
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

export const findsNewLine = (playable, mini, aiDb, boo) => { //
  let posLines = findsAllPlayableWins(playable)
  let startsNew = arrSplit(posLines)
  startsNew = countNumberOfInstances(startsNew)
  let temp = 0
  for (let i = 0; i < startsNew.length; i++) {
    if (i === temp && i < startsNew.length - 1 && startsNew[i].count > 1) {
      if (startsNew[i].count > startsNew[i + 1].count) {
        boo ? aiDb[mini][startsNew[i].value].startsMostNew = true
          : bigNewLines(aiDb, startsNew[i].value, true)
      } else {
        temp++
        boo ? aiDb[mini][startsNew[i].value].startsMostNew = true
          : bigNewLines(aiDb, startsNew[i].value, true)
      }
    } else {
      boo ? aiDb[mini][startsNew[i].value].startsNew = true
        : bigNewLines(aiDb, startsNew[i].value, false)
    }
  }
}

const bigNewLines = (aiDb, startsNew, boo) => {
  for (let i = 0; i < 9; i++) {
    boo ? aiDb[startsNew][i].bigStartsMostNew = true
      : aiDb[startsNew][i].bigStartsNew = true
  }
}

export const findsZeroEffect = (aiDb) => { //
  for (let i = 0; i < 9; i++) {
    if (!aiDb[i].win &&
      !aiDb[i].victoryDeny &&
      !aiDb[i].deny &&
      !aiDb[i].bigContinue2 &&
      !aiDb[i].bigContinueAndMultiNew &&
      !aiDb[i].bigContinue1 &&
      !aiDb[i].bigContinueAndNew &&
      !aiDb[i].bigStartsMostNew &&
      !aiDb[i].bigStartsNew &&
      !aiDb[i].continue2 &&
      !aiDb[i].continueAndMultiNew &&
      !aiDb[i].continue1 &&
      !aiDb[i].continueAndNew &&
      !aiDb[i].startsMostNew &&
      !aiDb[i].startsNew) {
      aiDb[i].zeroEffect = true
    }
  }
}

export const arrSplit = (arr) => { //
  return arr.join('').split('').map(Number)
}

export const countNumberOfInstances = (arr) => { //
  return arr.reduce((acc, curr) => {
    const obj = acc.find(o => o.value === curr)
    obj ? obj.count += 1
      : acc.push({'value': curr, 'count': 1})
    return acc.sort((a, b) => b.count - a.count)
  }, [])
}

export const randomNum = (num) => {
  return Math.floor(Math.random() * num)
}

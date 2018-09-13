import {win, couldWin, willWin} from '../gameArrays'

export const easyAi = (arr, ai, player) => {
  let mini = []
  findsMiniGame(arr, mini)
  let {aiOwns, playable, playerOwns} =
  findsPlayable(arr, mini, ai, player)
  let coOrds = [mini[0]]
  findsWinOrDeny(coOrds, aiOwns, playable)
  findsWinOrDeny(coOrds, playerOwns, playable)
  findsLine2Continue(coOrds, aiOwns, playable)
  findsNewLine(coOrds, playable)
  lastDitchMove(coOrds, playable)
  return {mini: coOrds[0], cell: coOrds[1]}
}

const findsMiniGame = (arr, mini) => {
  for (let i = 0; i < 9; i++) {
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

const findsWinOrDeny = (coOrds, isOwned, playable) => {
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

const canLinesConverge = (willPlay) => {
  let splitWillPlay = arrSplit(willPlay)
  let counted = countNumberOfInstances(splitWillPlay)
  let total = 1
  for (let g = 0; g < counted.length; g++) {
    if (counted[g].count > 1) {
      total += 1
    }
  }
  return {total, counted}
}

const linesConverge = (coOrds, willPlay) => {
  let choice = findMostPrevalent(willPlay)
  if (choice.length > 1) {
    coOrds.push(choice[randomNum(choice.length)])
  } else {
    coOrds.push(choice)
  }
  return coOrds
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

const findsLine2Continue = (coOrds, aiOwns, playable) => {
  if (aiOwns.length >= 1 && coOrds.length < 2) {
    let willPlay = findsWillPlay(aiOwns, playable)
    if (willPlay.length >= 1 && coOrds.length < 2) {
      const {total, counted} = canLinesConverge(willPlay)
      if (total > 1 && coOrds.length < 2) {
        linesConverge(coOrds, willPlay)
      } else if (total === 1 && coOrds.length < 2) {
        let movesThatContainCounted = continuesAndStartsNew(playable, counted)
        movesThatContainCounted.length
          ? linesConverge(coOrds, movesThatContainCounted)
          : coOrds.push(willPlay[randomNum(willPlay.length)])
      }
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

const findsNewLine = (coOrds, playable) => {
  if (coOrds.length < 2) {
    let posLines = findsAllPlayableWins(playable)
    if (posLines.length) {
      coOrds.push(
        posLines[randomNum(posLines.length)][randomNum(3)])
    }
  }
  return coOrds
}

const findMostPrevalent = (toSort) => {
  let split = arrSplit(toSort)
  let counted = countNumberOfInstances(split)
  let choice = []
  if (counted[0].count > counted[1].count) {
    choice = counted[0].value
    return choice
  } else {
    for (let i = 0; i < counted.length; i++) {
      if (counted[0].count === counted[i].count) {
        choice.push(counted[i].value)
      }
    }
    return choice
  }
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

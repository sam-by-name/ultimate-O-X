import {win, couldWin, willWin} from '../gameArrays'

export const computersChoice = (arr, ai, player) => {
  let mini = []
  findsMiniGame(arr, mini)
  let {aiOwns, playable, playerOwns} =
  findsPlayable(arr, mini, ai, player)
  let safeDeadNotSafe = findsIfMoveIsSafe(arr, playable, ai, player)
  let coOrds = [mini[0]]
  let win = findsWinOrDeny(aiOwns, playable)
  let deny = findsWinOrDeny(playerOwns, playable)
  let {continue2, continueAndNew, continue1} =
  findsLine2Continue(coOrds, aiOwns, playable)
  let posLines = findsNewLine(coOrds, playable)
  makesChoice(coOrds, win, deny, continue2, continueAndNew, continue1, posLines, playable)
  return {mini: coOrds[0], cell: coOrds[1]}
}

const makesChoice = (coOrds, win, deny, continue2, continueAndNew, continue1, posLines, playable) => {
  if (win.length) { coOrds.push(win[0]) } else if (deny.length) { coOrds.push(deny[0]) }
  if (continue2.length) {
    coOrds.push(continue2[0])
  } else if (continueAndNew.length) {
    coOrds.push(linesConverge(continueAndNew)[0])
  } else if (continue1.length) {
    coOrds.push(continue1[0])
  }
  if (posLines.length) {
    coOrds.push(
      posLines[randomNum(posLines.length)][randomNum(3)])
  }
  lastDitchMove(coOrds, playable)
  return coOrds
}

const findsIfMoveIsSafe = (arr, willPlay, ai, player) => {
  let safeDeadNotSafe = []
  for (let i = 0; i < willPlay.length; i++) {
    if (arr[willPlay[i]][0].wonBy) {
      safeDeadNotSafe.push({status: 'dead', mini: willPlay[i]})
    } else {
      let {playable, playerOwns} =
      findsPlayable(arr, [willPlay[i]], ai, player)
      let couldBeWon = findsWinOrDeny(playerOwns, playable)
      couldBeWon.length ? safeDeadNotSafe.push({status: 'notSafe', mini: willPlay[i]})
        : safeDeadNotSafe.push({status: 'safe', mini: willPlay[i]})
    }
  }
  return safeDeadNotSafe
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

// if move would send to a won mini, check alternatives
// if move would send to a game that can be won, check alternatives

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

const findsWinOrDeny = (isOwned, playable) => { // completes line if it can
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

const linesConverge = (willPlay) => {
  let choice = findMostPrevalent(willPlay)
  let convergence = []
  if (choice.length > 1) {
    convergence.push(choice[randomNum(choice.length)])
  } else {
    convergence.push(choice)
  }
  return convergence
}

const continuesAndStartsNew = (playable, counted) => {
  let movesThatContainCounted = []
  let posLines = findsAllPlayableWins(playable)
  for (let x = 0; x < posLines.length; x++) {
    for (let z = 0; z < counted.length; z++) {
      if (posLines[x].includes(counted[z].value)) { //    if an available win that is not in
        movesThatContainCounted.push(counted[z].value) // progress contains a move of a line in progress
      }
    }
  }
  return movesThatContainCounted
}

const findsLine2Continue = (coOrds, aiOwns, playable) => {
  let continue2 = []
  let continueAndNew = []
  let continue1 = []
  if (aiOwns.length >= 1 && coOrds.length < 2) {
    let willPlay = findsWillPlay(aiOwns, playable)
    if (willPlay.length >= 1 && coOrds.length < 2) {
      const {total, counted} = canLinesConverge(willPlay)
      if (total > 1 && coOrds.length < 2) {
        continue2 = linesConverge(willPlay)
      } else if (total === 1 && coOrds.length < 2) { // only one line in progress
        continueAndNew = continuesAndStartsNew(playable, counted)
        // continueAndNew = linesConverge(movesThatContainCounted)
        // movesThatContainCounted.length
        continue1 = counted[randomNum(counted.length)]
        // coOrds.push(counted[randomNum(counted.length)])
      }
    }
  }
  return {continue2, continueAndNew, continue1}
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
    // if (posLines.length) {
    //   coOrds.push( // can push to coOrds //
    //     posLines[randomNum(posLines.length)][randomNum(3)])
    // }
    // else if (posLines.length > 1 && coOrds.length < 2) { // always plays most occurred/ highest number of
    //   let sorted = findMostPrevalent(posLines)
    //   coOrds.push(sorted)
    // }
  }
  return posLines
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

export const randomNum = (num) => {
  return Math.floor(Math.random() * num)
}

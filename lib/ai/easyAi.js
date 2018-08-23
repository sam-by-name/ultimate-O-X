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
    if (willPlay.length >= 1 && coOrds.length < 2) { // finds if there is more than one line in progress
      let splitWillPlay = arrSplit(willPlay)
      let counted = countNumberOfInstances(splitWillPlay)
      let total = 1
      for (let g = 0; g < counted.length; g++) {
        if (counted[g].count > 1) {
          total += 1
        }
      }
      if (total > 1 && coOrds.length < 2) { // more than one line in progress
        let occursMost = findMostPrevalent(willPlay)
        coOrds.push(occursMost)
      } else if (total === 1 && coOrds.length < 2) { // only one line in progress
        let posContainsCounted = []
        let posLines = findsAllPlayableWins(playable)
        for (let x = 0; x < posLines.length; x++) {
          for (let z = 0; z < counted.length; z++) {
            if (posLines[x].includes(counted[z].value)) { // if an available win that is not in
              posContainsCounted.push(counted[z].value) //   progress contains a move of a line in progress
            }
          }
        }
        let choice = findMostPrevalent(posContainsCounted)
        if (choice.length > 1) { //
          coOrds.push(choice[randomNum(choice.length)])
        } else {
          coOrds.push(choice)
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
    if (posLines.length) {
      coOrds.push(
        posLines[randomNum(posLines.length)][randomNum(3)])
    }
    // else if (posLines.length > 1 && coOrds.length < 2) { // always plays most occurred/ highest number of
    //   let sorted = findMostPrevalent(posLines)
    //   coOrds.push(sorted)
    // }
  }
  return coOrds
}

const findMostPrevalent = (toSort) => {
  let split = arrSplit(toSort)
  let counted = countNumberOfInstances(split)
  console.log(counted)
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
  // let number = Object.keys(counted).reduce((a, b) => counted[a] > counted[b] ? a : b)
  // return number
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

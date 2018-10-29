import {
  findsMiniGame,
  findsPlayable,
  findsMiniStatus,
  findsWinOrDeny,
  // findsVictory,
  findsLine2Continue,
  findsNewLine,
  findsZeroEffect} from './lib/getInfoV2'

import {createAiArr, generateAiArr} from '../gameArrays'
// import gradeHumanWin from './grading/gradeHumanWin'
// import gradeHumanDeny from './grading/gradeHumanDeny'
// import gradeHumanRandom from './grading/gradeHumanRandom'
// import {grade2DeadOr2Same, gradeFuture2DeadOr2Same} from './grading/grade2DeadOr2Same'

export const mediumAiV2 = (arr, ai, human) => {
  let aiDb = generateAiArr()
  let mini = findsMiniGame(arr, [], aiDb)
  let coOrds = scans4Possibilities(arr, ai.name, human.name, mini, aiDb, true)
  if (coOrds.length < 2) coOrds = gradeAndSelect(arr, aiDb, ai.name, human.name, coOrds) // if vic has not already been found, grade moves
  return {mini: coOrds[0], cell: coOrds[1]}
}

const scans4Possibilities = (arr, ai, human, mini, aiDb, boo) => {
  let coOrds
  for (let i = 0; i < mini.length; i++) {
    let {aiOwns, playable, humanOwns} =
    findsPlayable(arr, mini[i], ai, human, aiDb, true)
    coOrds = [mini[i]]
    findsWinOrDeny(aiOwns, playable, aiDb, arr, ai, human, coOrds, boo)
    findsWinOrDeny(humanOwns, playable, aiDb, arr, ai, human, coOrds, !boo)
    findsLine2Continue((boo ? aiOwns : humanOwns), playable, mini[i], aiDb, boo)
    findsNewLine(playable, mini[i], aiDb, boo)
    let z = findsMiniStatus(arr, ai, human)
    findsLine2Continue((boo ? z.aiOwns : z.humanOwns), z.playable, mini[i], aiDb, !boo) // for the big game
    findsNewLine(z.playable, mini[i], aiDb, !boo) // for the big game
    findsZeroEffect(aiDb[i])
  }
  return coOrds
}

const gradeAndSelect = (arr, aiDb, ai, human, coOrds) => {
  let allPlayable = getsAllPlayable(aiDb)
  gradesMoves(arr, allPlayable, ai, human, aiDb)
  if (coOrds.length < 2) {
    if (coOrds.length < 2) coOrds = findsHighestScore(allPlayable, coOrds)
  }
  return coOrds
}

const getsAllPlayable = (aiDb) => {
  let allPlayable = []
  for (let i = 0; i < 9; i++) {
    if (aiDb[i][0].miniPlayable) {
      for (let j = 0; j < 9; j++) {
        if (aiDb[i][j].playable) {
          allPlayable.push(aiDb[i][j])
        }
      }
    }
  }
  return allPlayable
}

const findsHighestScore = (allPlayable, coOrds) => {
  allPlayable.sort((a, b) => a.ai1stScore < b.ai1stScore)
  coOrds = allPlayable[0].coOrds
  return coOrds
}

const findsHumanVictory = (arr, ai, human, aiDb) => { // finds mini that human needs to win
  let humanVics = 0
  let {humanOwns, playable} = findsMiniStatus(arr, ai, human)
  let miniHumanNeeds = findsWinOrDeny(humanOwns, playable)
  if (miniHumanNeeds.length) {
    for (let i = 0; i < miniHumanNeeds.length; i++) {
      let humanVicMove = humanWinOrAiDeny(arr, ai, human, miniHumanNeeds[i])
      for (let j = 0; j < humanVicMove.length; j++) {
        humanVics++
        aiDb[miniHumanNeeds[i]][humanVicMove[j]].humanVic = true
      }
    }
  }
  return humanVics
}

const doesMoveSend2Dead = (arr, aiDb, toPlay, mini, x) => {
  if (arr[toPlay][0].wonBy) {
    aiDb[toPlay][0].deadMini = true
    x.sends2Dead = true
  }
  if (x.win && mini === toPlay) {
    x.sends2Dead = true // sends 2 same and now same is dead
  } else if (mini === toPlay) x.sends2Same = true // sends to same but same is not dead
}

const aiFirstGoScore = (x) => {
  if (x.victory) x.ai1stScore += 1000
  if (x.victoryDeny) x.ai1stScore += 2
  if (x.win) x.ai1stScore += 1
  if (x.deny) x.ai1stScore += 0.25
  if (x.continue2) x.ai1stScore += 0.25
  if (x.continue1) x.ai1stScore += 0.15
  if (x.continueAndMultiNew) x.ai1stScore += 0.3
  if (x.continueAnNew) x.ai1stScore += 0.2
  if (x.startsMostNew) x.ai1stScore += 0.2
  if (x.startsNew) x.ai1stScore += 0.1
  if (x.zeroEffect) x.ai1stScore -= 0.5
  if (x.sends2Dead) x.ai1stScore -= 0.5
  if (x.harikari) x.ai1stScore -= 1000
}

const ai2ndGoScore = (z, x) => {
  let temp = 0
  if (z.victory) temp += 100
  if (z.victoryDeny) temp += 1
  if (z.win) temp += 1
  if (z.deny) temp += 0.25
  if (z.continue2) temp += 0.25
  if (z.continue1) temp += 0.15
  if (z.continueAndMultiNew) temp += 30
  if (z.continueAnNew) temp += 0.20
  if (z.startsMostNew) temp += 0.20
  if (z.startsNew) temp += 0.10
  if (z.zeroEffect) temp -= 0.50
  if (z.sends2Dead) temp -= 0.50 // is leads2Dead
  if (z.harikari) temp -= 100
  x.push(temp)
}

const humanFirstGoScore = (y, x) => {
  let temp = 0
  if (y.victory) temp -= 1000
  if (y.victoryDeny) temp -= 1
  if (y.win) temp -= 1
  if (y.deny) temp -= 0.25
  if (y.continue2) temp -= 0.25
  if (y.continue1) temp -= 0.15
  if (y.continueAndMultiNew) temp -= 0.30
  if (y.continueAnNew) temp -= 0.20
  if (y.startsMostNew) temp -= 0.20
  if (y.startsNew) temp -= 0.10
  if (y.zeroEffect) temp += 0.50
  if (y.sends2Dead) temp += 0.50 // this is more than the ai loses .. ??
  if (y.harikari) temp += 1000 // is ai futureVic
  x.push(temp)
}

const human2ndGoScore = (y, x) => {
  let temp = 0
  if (y.victory) temp -= 100
  if (y.victoryDeny) temp -= 1
  if (y.win) temp -= 1
  if (y.deny) temp -= 0.25
  if (y.continue2) temp -= 0.25
  if (y.continue1) temp -= 0.15
  if (y.continueAndMultiNew) temp -= 0.30
  if (y.continueAnNew) temp -= 0.20
  if (y.startsMostNew) temp -= 0.15
  if (y.startsNew) temp -= 0.10
  if (y.zeroEffect) temp += 0.50
  if (y.sends2Dead) temp += 0.50 // this is more than the ai loses .. ??
  if (y.harikari) temp += 100
  x.push(temp)
}

const gradesMoves = (arr, allPlayable, ai, human, aiDb) => {
  let allHuVics = findsHumanVictory(arr, ai, human, aiDb)
  for (let i = 0; i < allPlayable.length; i++) {
    let toPlay = Number(allPlayable[i].coOrds[1])
    let mini = allPlayable[i].coOrds[0]
    let x = aiDb[mini][toPlay]
    let tempArr = JSON.parse(JSON.stringify(arr))
    x.win ? mockOutArr(tempArr, mini, toPlay, ai, true) // ai 'pseudo taken 1st' move
      : mockOutArr(tempArr, mini, toPlay, ai, false)
    doesMoveSend2Dead(arr, aiDb, toPlay, mini, x) // or same
    isMoveHarikari(aiDb, toPlay, x, allHuVics)
    aiFirstGoScore(x)
    if (!x.harikari) humanTurn(tempArr, ai, human, x)
  }
}

const humanTurn = (arr, ai, human, x) => {
  let huDb = generateAiArr()
  let huMinis = findsMiniGame(arr, [], huDb)
  scans4Possibilities(arr, ai, human, huMinis, huDb, false)
  let huPlayable = getsAllPlayable(huDb)
  for (let j = 0; j < huPlayable.length; j++) {
    let huMini = huPlayable[j].coOrds[0]
    let huToPlay = huPlayable[j].coOrds[1]
    let y = huDb[huMini][huToPlay]
    let tempArr = JSON.parse(JSON.stringify(arr))
    y.win ? mockOutArr(tempArr, huMini, huToPlay, human, true) // human 'pseudo taken 2nd' move, should not use x.win
      : mockOutArr(tempArr, huMini, huToPlay, human, false)
    doesMoveSend2Dead(arr, huDb, huToPlay, huMini, y)
    isMoveHarikari(huDb, huToPlay, y)
    humanFirstGoScore(y, x.hu1stScore)
    if (!y.harikari && !y.victory) aiTurn(tempArr, ai, human, x)
    if (j === huPlayable.length - 1) {
      x.ai1stScore += Math.min.apply(Math, x.hu1stScore)
      x.hu1stScore = []
    }
  }
}

const aiTurn = (arr, ai, human, x) => {
  let aiDb2 = generateAiArr()
  let aiMinis = findsMiniGame(arr, [], aiDb2)
  scans4Possibilities(arr, ai, human, aiMinis, aiDb2, true)
  let aiPlayable = getsAllPlayable(aiDb2)
  for (let i = 0; i < aiPlayable.length; i++) {
    let aiMini = aiPlayable[i].coOrds[0]
    let aiToPlay = aiPlayable[i].coOrds[1]
    let z = aiDb2[aiMini][aiToPlay]
    let tempArr = JSON.parse(JSON.stringify(arr))
    z.win ? mockOutArr(tempArr, aiMini, aiToPlay, ai, true)
      : mockOutArr(tempArr, aiMini, aiToPlay, ai, false)
    doesMoveSend2Dead(arr, aiDb2, aiToPlay, aiMini, z)
    isMoveHarikari(aiDb2, aiToPlay, z)
    ai2ndGoScore(z, x.ai2ndScore)
    if (!z.harikari && !z.victory && !hasGameEnded(tempArr)) human2ndTurn(tempArr, ai, human, x)
    if (i === aiPlayable.length - 1) {
      x.ai1stScore += Math.max.apply(Math, x.ai2ndScore)
      x.ai2ndScore = []
    }
  }
}

const human2ndTurn = (arr, ai, human, x) => {
  let huDb = generateAiArr()
  let huMinis = findsMiniGame(arr, [], huDb)
  scans4Possibilities(arr, ai, human, huMinis, huDb, false)
  let huPlayable = getsAllPlayable(huDb)
  for (let j = 0; j < huPlayable.length; j++) {
    let huMini = huPlayable[j].coOrds[0]
    let huToPlay = huPlayable[j].coOrds[1]
    let y = huDb[huMini][huToPlay]
    doesMoveSend2Dead(arr, huDb, huToPlay, huMini, y)
    isMoveHarikari(huDb, huToPlay, y)
    human2ndGoScore(y, x.hu2ndScore)
    // let tempArr = JSON.parse(JSON.stringify(arr))
    // count++
    // console.log(count)
    // y.win ? mockOutArr(tempArr, huMini, huToPlay, human, true) // human 'pseudo taken 2nd' move, should not use x.win
    //   : mockOutArr(tempArr, huMini, huToPlay, human, false)

    // if (!y.harikari && !y.victory && !hasGameEnded(tempArr)) aiTurn(tempArr, ai, human, x)
    if (j === huPlayable.length - 1) {
      x.ai1stScore += Math.min.apply(Math, x.hu2ndScore)
      x.hu2ndScore = []
    }
  }
}

// const combineScores = (x, future) => {
//   x.ai1stScore += Math.min.apply(Math, future)
// }

const isMoveHarikari = (aiDb, toPlay, x, allHuVics) => {
  let huVics = 0
  if (x.win && x.sends2Same && allHuVics === 1 && x.humanVic) x.victoryDeny = true
  else if (x.win && x.sends2Same && !x.humanVic && allHuVics > 0) x.harikari = true
  else if (x.sends2Dead && !x.humanVic && allHuVics > 0) x.harikari = true
  else if (x.sends2Dead && x.humanVic && allHuVics > 1) x.harikari = true
  else if (x.sends2Dead && x.humanVic && allHuVics < 2) x.victoryDeny = true
  else {
    for (let i = 0; i < 9; i++) {
      if (aiDb[toPlay][i].humanVic) {
        huVics++
      }
    }
    if (x.sends2Same && x.humanVic && huVics === 1) x.victoryDeny = true
    if (x.sends2Same && x.humanVic && huVics > 1) x.harikari = true
    else if (x.sends2Same && !x.humanVic && huVics > 0) x.harikari = true
    else if (huVics > 0) x.harikari = true
  }
}

const humanWinOrAiDeny = (arr, ai, human, mini) => { // humanCouldWin == aiCouldDeny
  const {playable, humanOwns} = findsPlayable(arr, mini, ai, human)
  return findsWinOrDeny(humanOwns, playable)
}

const mockOutArr = (arr, mini, cell, player, boo) => {
  for (let i = 0; i < 9; i++) {
    if (boo) {
      arr[mini][i].wonBy = player
      arr[mini][i].isAlive = false
      arr[mini][i].isPlayable = false
    } else {
      arr[mini][cell].isAlive = false
      arr[mini][cell].isPlayable = false
      arr[mini][cell].takenBy = player
    }
  }
  checkForDraw(arr, mini)
  for (let g = 0; g < 9; g++) {
    for (let j = 0; j < 9; j++) {
      if (!arr[cell][j].wonBy && g === cell && arr[cell][j].isAlive) arr[cell][j].isPlayable = true // if where its being sent isn't dead, make it playable
      else if (arr[cell][j].wonBy && !arr[g][j].wonBy && arr[g][j].isAlive) arr[g][j].isPlayable = true // if where its being sent is dead, make everywhere else that isn't dead, playable
      else if (!arr[cell][j].wonBy && g !== cell && !arr[g][j].wonBy) arr[g][j].isPlayable = false
    // if where it is being sent isn't dead and the current count is not where it is
    // where is currently is, isn't dead, set playable to false
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

const hasGameEnded = (arr) => {
  let freeGames = 9
  for (let i = 0; i < 9; i++) {
    if (arr[i][0].wonBy) freeGames--
  }
  if (freeGames > 0) return false
  else return true
}

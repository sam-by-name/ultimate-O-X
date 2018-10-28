import {
  findsMiniGame,
  findsPlayable,
  findsMiniStatus,
  findsWinOrDeny,
  findsVictory,
  findsLine2Continue,
  findsNewLine,
  findsZeroEffect} from './lib/getInfoV2'

import {createAiArr, grading, moveType, gradeScores} from '../gameArrays'
import gradeHumanWin from './grading/gradeHumanWin'
import gradeHumanDeny from './grading/gradeHumanDeny'
import gradeHumanRandom from './grading/gradeHumanRandom'
import {grade2DeadOr2Same, gradeFuture2DeadOr2Same} from './grading/grade2DeadOr2Same'

export const mediumAiV2 = (arr, ai, human) => {
  let aiDb = createAiArr()
  let mini = findsMiniGame(arr, [], aiDb)
  let coOrds = thoughtProcess(arr, ai.name, human.name, mini, aiDb)
  return {mini: coOrds[0], cell: coOrds[1]}
}

const thoughtProcess = (arr, ai, human, mini, aiDb) => {
  let coOrds
  findsHumanVictory(arr, ai, human, aiDb)
  for (let i = 0; i < mini.length; i++) {
    let {aiOwns, playable, humanOwns} =
    findsPlayable(arr, mini[i], ai, human, aiDb, true)
    coOrds = [mini[i]]
    findsWinOrDeny(aiOwns, playable, aiDb, arr, ai, human, coOrds, true)
    findsWinOrDeny(humanOwns, playable, aiDb, arr, ai, human, coOrds, false)
    gradesMoves(arr, mini[i], playable, ai, human, aiDb)
    findsLine2Continue(aiOwns, playable, mini[i], aiDb)
    findsNewLine(coOrds, playable, mini[i], aiDb)
    findsZeroEffect(aiDb[i])
  }
  if (coOrds.length < 2) {
    let allPlayable = getsAllPlayable(aiDb)
    for (let i = 0; i < grading.length; i++) {
      if (coOrds.length < 2) {
        picksBestPlayable(allPlayable, i, coOrds)
      }
    }
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

const picksBestPlayable = (allPlayable, y, coOrds) => { // needs to be smarter
  for (let i = 0; i < moveType.length; i++) {
    for (let j = 0; j < allPlayable.length; j++) {
      let x = allPlayable[j]
      if (coOrds.length < 2) {
        if (x[moveType[i]] && (x[grading[y]])) {
          x.totScore += gradeScores[y]
          // coOrds = x.coOrds
          // break
        }
      }
    }
  }
  // return coOrds
}

const findsHighestScore = (allPlayable, coOrds) => {
  let ordered = allPlayable[0]
  allPlayable.shift()
  for (let i = 0; i < allPlayable.length; i++) {
    if (allPlayable[i].totScore > ordered.totScore) ordered = allPlayable[i]
  }
  coOrds = ordered.coOrds
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

const setsHumanWinsAndDenies = (tempArr, ai, human, toPlay) => {
  let couldBeWon
  let couldBeDenied
  if (!tempArr[toPlay][0].wonBy) {
    couldBeWon = humanWinOrAiDeny(tempArr, ai, human, toPlay)
    couldBeDenied = aiWinOrHumanDeny(tempArr, ai, human, toPlay)
  } else {
    let {allHuD, allHuW} = findsAllHumanWinsNDenies(tempArr, ai, human)
    couldBeWon = allHuW
    couldBeDenied = allHuD
  }
  return {couldBeDenied, couldBeWon}
}

const setsHumanMove = (x, couldBeWon, couldBeDenied, playable) => {
  let move
  let boo
  if (!x.harikari) {
    if (!couldBeWon.length && !couldBeDenied.length) {
      move = playable
    } else if (couldBeWon.length) {
      move = couldBeWon
      boo = true
    } else if (couldBeDenied.length) {
      move = couldBeDenied
      boo = false
    }
  }
  let h = {win: couldBeWon, deny: couldBeDenied} // find better way to do this
  h.win.length ? h.win = true : h.win = false
  h.deny.length ? h.deny = true : h.deny = false
  return {move, boo, h}
}

const gradesMoves = (arr, mini, playable, ai, human, aiDb) => {
  for (let i = 0; i < playable.length; i++) {
    let toPlay = Number(playable[i])
    let x = aiDb[mini][toPlay]
    doesMoveSend2Dead(arr, aiDb, toPlay, mini, x) // or same
    isMoveHarikari(aiDb, toPlay, x, true)
    let tempArr = JSON.parse(JSON.stringify(arr))
    x.win ? mockOutArr(tempArr, mini, toPlay, ai, true) // ai 'pseudo taken 1st' move
      : mockOutArr(tempArr, mini, toPlay, ai, false)
    aiDb[mini][toPlay].humanVic = false // refactor out
    let {couldBeDenied, couldBeWon} = setsHumanWinsAndDenies(tempArr, ai, human, toPlay)
    let z = findsPlayable(tempArr, toPlay, ai, human)
    let {move, boo, h} = setsHumanMove(x, couldBeWon, couldBeDenied, z.playable)
    if (!x.harikari && (x.sends2Same || x.sends2Dead)) {
      let {allHuW, allHuD} = findsAllHumanWinsNDenies(tempArr, ai, human)
      let huVics = findsHumanVictory(tempArr, ai, human, aiDb)
      grade2DeadOr2Same(x, huVics, allHuW, allHuD, couldBeDenied, couldBeWon)
    } else if (!x.harikari) {
      for (let j = 0; j < move.length; j++) {
        splitHumanMove(tempArr, ai, human, aiDb, toPlay, move[j], h, x, boo)
      }
    }
  }
}

const wouldHumanMoveSend2Same = (couldBeWonOrDenied, toPlay, x) => {
  if (couldBeWonOrDenied === toPlay && !x.sends2Same) {
    x.humanWouldSend2Same = true
  }
}

const isMoveHarikari = (aiDb, toPlay, x, boo) => {
  let huVics = 0
  for (let i = 0; i < 9; i++) {
    if (aiDb[toPlay][i].humanVic) {
      huVics++
    }
  }
  if (x.sends2Same && huVics === 1) x.victoryDeny = true
  else if (huVics > 0 && !boo) x.futureHarikari = true
  else if (huVics > 0 && boo) x.harikari = true
}

const splitHumanMove = (arr, ai, human, aiDb, toPlay, humanMove, h, x, boo) => {
  wouldHumanMoveSend2Same(humanMove, toPlay, x)
  boo ? mockOutArr(arr, toPlay, humanMove, human, true) // human 'pseudo taken 2nd' move, should not use x.win
    : mockOutArr(arr, toPlay, humanMove, human, false)
  let aiCouldWin = aiWinOrHumanDeny(arr, ai, human, humanMove)
  let aiCouldDeny = humanWinOrAiDeny(arr, ai, human, humanMove)
  doesHumanSendToVic(aiDb, arr, ai, human, humanMove, aiCouldWin, x) // incorporate this into other grading.js

  let z = findsPlayable(arr, humanMove, ai, human)
  let {move, a2} = setsAiMove(x, aiCouldWin, aiCouldDeny, z.playable) //
  for (let i = 0; i < move.length; i++) {
    let {tempAiDb, a} = doesFutureAiSendToVic(aiDb, arr, ai, human, humanMove, move[i])
    doesFutureMoveSend2Dead(arr, tempAiDb, move[i], humanMove, a)
    aiCouldWin.length ? mockOutArr(arr, humanMove, move[i], ai, true)
      : mockOutArr(arr, humanMove, move[i], ai, false)

    aiDb[humanMove][move[i]].humanVic = false
    let {couldBeDenied, couldBeWon} = setsHumanWinsAndDenies(arr, ai, human, move[i])
    if (a.sends2Dead || a.sends2Same) {
      let {allHuW, allHuD} = findsAllHumanWinsNDenies(arr, ai, human) //  used only in grade2DeadOr2Same
      let huVics = findsHumanVictory(arr, ai, human, tempAiDb)
      gradeFuture2DeadOr2Same(a, h, a2, huVics, allHuW, allHuD, couldBeDenied, couldBeWon)
    } else
    if (typeof boo !== 'boolean') gradeHumanRandom(arr, x, humanMove, aiCouldDeny, aiCouldWin)
    else if (boo) gradeHumanWin(arr, x, humanMove, aiCouldDeny, aiCouldWin) //, couldBeDenied)
    else if (typeof boo === 'boolean' && !boo) {
      gradeHumanDeny(arr, x, humanMove, aiCouldDeny, aiCouldWin) //, couldBeDenied)
    }
  }
}

const doesFutureMoveSend2Dead = (arr, aiDb, toPlay, mini, a) => {
  if (arr[toPlay][0].wonBy) {
    aiDb[toPlay][0].deadMini = true
    a.future2Dead = true
  }
  if (a.win && mini === toPlay) {
    a.future2Dead = true // sends 2 same and now same is dead
  } else if (mini === toPlay) a.future2Same = true // sends to same but same is not dead
}

const doesFutureAiSendToVic = (aiDb, arr, ai, human, humanMove, aiMove) => {
  let tempAiDb = JSON.parse(JSON.stringify(aiDb))
  let a = tempAiDb[humanMove][aiMove]
  doesMoveSend2Dead(arr, tempAiDb, aiMove, humanMove, a)
  findsHumanVictory(arr, ai, human, tempAiDb)
  isMoveHarikari(tempAiDb, aiMove, a, false) // future move
  return {tempAiDb, a}
}

const setsAiMove = (x, aiCouldWin, aiCouldDeny, playable) => {
  let move
  let boo2
  if (!x.harikari) {
    if (!aiCouldWin.length && !aiCouldDeny.length) {
      move = playable
    } else if (aiCouldWin.length) {
      move = aiCouldWin
      boo2 = true
    } else if (aiCouldDeny.length) {
      move = aiCouldDeny
      boo2 = false
    }
  }
  let a2 = {win: aiCouldWin, deny: aiCouldDeny} // find better way to do this
  a2.win.length ? a2.win = true : a2.win = false
  a2.deny.length ? a2.deny = true : a2.deny = false
  return {move, boo2, a2}
}

const doesHumanSendToVic = (aiDb, arr, ai, human, couldBeWon, aiCouldWin, x) => { // make it so if move sends to dead, it still works
  if (aiCouldWin.length) {
    let tempAiDb = JSON.parse(JSON.stringify(aiDb))
    for (let i = 0; i < aiCouldWin.length; i++) {
      findsVictory(arr, ai, human, tempAiDb, couldBeWon, aiCouldWin[i])
      if (tempAiDb[couldBeWon][aiCouldWin[i]].victory && !x.harikari) {
        x.leads2Vic = true // human win leads to ai Vic
        if (x.win && x.deny) x.great = true //     WinNDeny, win, vic
        else if (x.win) x.good = true //                Win, win, vic
        else if (x.deny) x.good = true //            Deny, win, vic
        else if (!x.win && !x.deny) x.decent = true // random, win, vic
      }
    }
  }
}

const aiWinOrHumanDeny = (arr, ai, human, mini) => { // aiCouldWin == humanCouldDeny
  const {playable, aiOwns} = findsPlayable(arr, mini, ai, human)
  return findsWinOrDeny(aiOwns, playable)
}

const humanWinOrAiDeny = (arr, ai, human, mini) => { // humanCouldWin == aiCouldDeny
  const {playable, humanOwns} = findsPlayable(arr, mini, ai, human)
  return findsWinOrDeny(humanOwns, playable)
}

const mockOutArr = (tempArr, mini, cell, player, boo) => {
  for (let i = 0; i < 9; i++) {
    if (boo) {
      tempArr[mini][i].wonBy = player
      tempArr[mini][i].isPlayable = false
    } else tempArr[mini][cell].isAlive = false
  }
}

const findsAllHumanWinsNDenies = (arr, ai, human) => {
  let allHuW = []
  let allHuD = []
  let {playable} = findsMiniStatus(arr, ai, human)
  for (let i = 0; i < playable.length; i++) {
    allHuW = allHuW.concat(humanWinOrAiDeny(arr, ai, human, playable[i]))
    allHuD = allHuD.concat(aiWinOrHumanDeny(arr, ai, human, playable[i]))
  }
  return {allHuW, allHuD}
}

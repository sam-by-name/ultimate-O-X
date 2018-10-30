import {findsMiniStatus, findsWinOrDeny, findsPlayable} from './getInfoV2'

export const findsHumanVictory = (arr, ai, human, aiDb) => { // finds mini that human needs to win
  let humanVics = 0
  let {humanOwns, playable} = findsMiniStatus(arr, ai, human)
  let miniHumanNeeds = findsWinOrDeny(humanOwns, playable)
  if (miniHumanNeeds.length) {
    for (let i = 0; i < miniHumanNeeds.length; i++) {
      let humanVicMove = winOrDeny(arr, ai, human, miniHumanNeeds[i], true)
      for (let j = 0; j < humanVicMove.length; j++) {
        humanVics++
        aiDb[miniHumanNeeds[i]][humanVicMove[j]].humanVic = true
      }
    }
  }
  return humanVics
}

export const findsAiVictory = (arr, ai, human, aiDb) => { // finds mini that human needs to win
  let aiVics = 0
  let {aiOwns, playable} = findsMiniStatus(arr, ai, human)
  let miniAiNeeds = findsWinOrDeny(aiOwns, playable)
  if (miniAiNeeds.length) {
    for (let i = 0; i < miniAiNeeds.length; i++) {
      let aiVicMove = winOrDeny(arr, ai, human, miniAiNeeds[i], false)
      for (let j = 0; j < aiVicMove.length; j++) {
        aiVics++
        aiDb[miniAiNeeds[i]][aiVicMove[j]].victory = true
      }
    }
  }
  return aiVics
}

const winOrDeny = (arr, ai, human, mini, boo) => { // humanCouldWin == aiCouldDeny
  const {playable, aiOwns, humanOwns} = findsPlayable(arr, mini, ai, human)
  return findsWinOrDeny(boo ? humanOwns : aiOwns, playable)
}

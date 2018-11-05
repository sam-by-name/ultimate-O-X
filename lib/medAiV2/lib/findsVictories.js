import {findsMiniStatus, findsWinOrDeny, findsPlayable} from './getInfoV2'

// export const findsHumanVictory = (arr, ai, human, aiDb) => { // finds mini that human needs to win
//   let humanVics = 0
//   let {humanOwns, playable} = findsMiniStatus(arr, ai, human)
//   let miniHumanNeeds = findsWinOrDeny(humanOwns, playable)
//   if (miniHumanNeeds.length) {
//     for (let i = 0; i < miniHumanNeeds.length; i++) {
//       markMiniAsNeeded(aiDb, miniHumanNeeds[i], 'huNeeds4Vic')
//       let humanVicMove = winOrDeny(arr, ai, human, miniHumanNeeds[i], true)
//       for (let j = 0; j < humanVicMove.length; j++) {
//         humanVics++
//         aiDb[miniHumanNeeds[i]][humanVicMove[j]].humanVic = true
//       }
//     }
//   }
//   return humanVics
// }

// export const findsAiVictory = (arr, ai, human, aiDb) => { // finds mini that human needs to win
//   let aiVics = 0
//   let {aiOwns, playable} = findsMiniStatus(arr, ai, human)
//   let miniAiNeeds = findsWinOrDeny(aiOwns, playable)
//   if (miniAiNeeds.length) {
//     for (let i = 0; i < miniAiNeeds.length; i++) {
//       markMiniAsNeeded(aiDb, miniAiNeeds[i], 'aiNeeds4Vic')
//       let aiVicMove = winOrDeny(arr, ai, human, miniAiNeeds[i], false)
//       for (let j = 0; j < aiVicMove.length; j++) {
//         aiVics++
//         aiDb[miniAiNeeds[i]][aiVicMove[j]].victory = true
//       }
//     }
//   }
//   return aiVics
// }

export const findsVictories = (arr, ai, human, aiDb, boo) => {
  let vic
  let vics = 0
  boo ? vic = 'victory' : vic = 'humanVic'
  let {aiOwns, playable, humanOwns} = findsMiniStatus(arr, ai, human)
  let miniNeeded = findsWinOrDeny(boo ? aiOwns : humanOwns, playable)
  if (miniNeeded.length) {
    for (let i = 0; i < miniNeeded.length; i++) {
      markMiniAsNeeded(aiDb, miniNeeded[i], boo ? 'aiNeeds4Vic' : 'huNeeds4Vic')
      let vicMove = winOrDeny(arr, ai, human, miniNeeded[i], !boo)
      for (let j = 0; j < vicMove.length; j++) {
        vics++
        aiDb[miniNeeded[i]][vicMove[j]][vic] = true
      }
    }
  }
  return vics
}

const winOrDeny = (arr, ai, human, mini, boo) => { // humanCouldWin == aiCouldDeny
  const {playable, aiOwns, humanOwns} = findsPlayable(arr, mini, ai, human)
  return findsWinOrDeny(boo ? humanOwns : aiOwns, playable)
}

const markMiniAsNeeded = (aiDb, mini, needed) => {
  for (let i = 0; i < 9; i++) {
    aiDb[mini][i][needed] = true
  }
}

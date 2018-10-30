export const doesMoveSend2Dead = (arr, aiDb, toPlay, mini, x) => {
  if (arr[toPlay][0].wonBy) {
    aiDb[toPlay][0].deadMini = true
    x.sends2Dead = true
  }
  if (x.win && mini === toPlay) {
    x.sends2Dead = true // sends 2 same and now same is dead
  } else if (mini === toPlay) x.sends2Same = true // sends to same but same is not dead
}

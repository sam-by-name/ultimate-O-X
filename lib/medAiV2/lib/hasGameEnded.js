export const hasGameEnded = (arr) => {
  let freeGames = 9
  for (let i = 0; i < 9; i++) {
    if (arr[i][0].wonBy) freeGames--
  }
  if (freeGames > 0) return false
  else return true
}

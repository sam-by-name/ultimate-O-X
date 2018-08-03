
 function generateBoard () {
  const size = 9
  const gameArr = []

  for(let i = 0; i < size; i++){
    let tempArr = []
    for(let j = 0; j < size; j++){
      tempArr.push({isAlive: true, isPlayable: true, takenBy: '', lastTaken: false})
    }
    gameArr.push(tempArr)
  }
  return gameArr
}
export const gameArr = generateBoard()

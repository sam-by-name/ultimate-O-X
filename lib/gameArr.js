
 function generateBoard () {
  const size = 9
  const gameArr = []

  for(let i = 0; i < size; i++){
    let tempArr = []
    for(let j = 0; j < size; j++){
      tempArr.push({bigGrid: i, littleGrid: j})
    }
    gameArr.push(tempArr)
  }
  return gameArr
}
export const gameArr = generateBoard()

const generateBoard = () => {
  const size = 9
  const mainArr = []

  for (let i = 0; i < size; i++) {
    let tempArr = []
    for (let j = 0; j < size; j++) {
      tempArr.push({
        big: i,
        small: j,
        isAlive: true,
        isPlayable: true,
        boundaryStyle: {border: '10px solid white'},
        lastTaken: false,
        lastTakenStyle: {backgroundColor: 'white', color: 'white'},
        takenBy: '',
        wonBy: '',
        winColor: {backgroundColor: 'white'},
        playerSymbol: '',
        style: {backgroundColor: 'white', color: 'white'}
      })
    }
    mainArr.push(tempArr)
  }
  return mainArr
}

export const mainArr = generateBoard()

export const colorArr = [
  'blue', 'cyan', 'goldenrod', 'green', 'magenta', 'orange', 'red'
]

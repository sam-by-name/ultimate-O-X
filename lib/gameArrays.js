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
        boundaryStyle: {border: '10px solid #0E0B16'},
        lastTaken: false,
        lastTakenStyle: {backgroundColor: '#0E0B16', color: '#0E0B16'},
        takenBy: '',
        wonBy: '',
        winColor: {backgroundColor: '#0E0B16'},
        playerSymbol: '',
        style: {backgroundColor: '#0E0B16', color: '#0E0B16'}
      })
    }
    mainArr.push(tempArr)
  }
  return mainArr
}

export const createArr = () => {
  return JSON.parse(JSON.stringify(generateBoard()))
}

export const colorArr = [
  'blue', 'cyan', 'goldenrod', 'green', 'magenta', 'orange', 'red'
]

export const win = ['012', '048', '036', '147', '258', '246', '345', '678']

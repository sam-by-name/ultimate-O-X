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
        boundaryStyle: {border: '10px solid lime'},
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

export const win = ['012', '036', '048', '147', '246', '258', '345', '678']

export const couldWin = [
  '01', '03', '04', '14', '12', '24', '25', '34',
  '45', '36', '46', '67', '47', '78', '48', '58',
  '02', '06', '08', '17', '26', '28', '35', '68'
]

export const willWin = [
  '2', '6', '8', '7', '0', '6', '8', '5',
  '3', '0', '2', '8', '1', '6', '0', '2',
  '1', '3', '4', '4', '4', '5', '4', '7'
]

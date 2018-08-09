function generateBoard () {
  const size = 9
  const mainArr = []

  for (let i = 0; i < size; i++) {
    let tempArr = []
    for (let j = 0; j < size; j++) {
      tempArr.push({bigGrid: i, littleGrid: j, isAlive: true, isPlayable: true, takenBy: '', wonBy: '', lastTaken: false})
    }
    mainArr.push(tempArr)
  }
  return mainArr
}

export const mainArr = generateBoard()

export const cloneArr = JSON.parse(JSON.stringify(mainArr))

export const colorArr = [
  'blue', 'cyan', 'goldenrod', 'green', 'magenta', 'orange', 'red'
]

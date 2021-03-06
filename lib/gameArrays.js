export const generateBoard = () => {
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
        boundaryStyle: {border: '5px solid #0E0B16'}, // should it start as  lime?
        lastTaken: false,
        lastTakenStyle: {backgroundColor: '#0E0B16', color: '#0E0B16'},
        takenBy: '',
        wonBy: '',
        winColor: {backgroundColor: '#0E0B16'},
        playerSymbol: '',
        style: {backgroundColor: '#0E0B16', color: '#0E0B16'},
        gameOver: false
      })
    }
    mainArr.push(tempArr)
  }
  return mainArr
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

export const generateAiArr = () => {
  const aiArr = []
  for (let i = 0; i < 9; i++) {
    let tempArr = []
    for (let j = 0; j < 9; j++) {
      tempArr.push({
        coOrds: [i, j],
        miniPlayable: false, //
        deadMini: false, //
        playable: false, //
        playerOwns: false, //
        aiOwns: false, //

        victory: false, //
        harikari: false, //

        hu1stScore: [],
        ai2ndScore: [],
        hu2ndScore: [],
        // ai3rdScore: [],
        // hu3rdScore: [],
        totScore: 0,

        sends2Dead: false, // sends to dead miniGame
        sends2Same: false, // sends to same, but same is still alive
        humanVic: false, // move wins game for human

        aiNeeds4Vic: false,
        huNeeds4Vic: false,

        win: false, //
        victoryDeny: false, // is also humanVic
        deny: false, //
        continue2: false, //
        continueAndMultiNew: false, //
        continue1: false, //
        continueAndNew: false, //
        startsMostNew: false, //
        startsNew: false, //

        bigContinue2: false, //
        bigContinueAndMultiNew: false, //
        bigContinue1: false, //
        bigContinueAndNew: false, //
        bigStartsMostNew: false, //
        bigStartsNew: false, //

        zeroEffect: false // made true if the above remain false
      })
    }
    aiArr.push(tempArr)
  }
  return aiArr
}

const gradeHumanRandom = (tempArr, x, isRandom, aiCouldDeny, aiCouldWin) => {
  let status
  if (!x.win && !x.deny && tempArr[isRandom][0].wonBy) {
    status = 'decent' //       random, human random, ai freeGo // write function to check if free move can lead too safely won, mark safe trade.
  } else if (x.win && x.deny && tempArr[isRandom][0].wonBy) {
    status = 'great' //     aiWinDeny, human random, ai freeGo // higher grade?
  } else if (x.win && !x.deny && tempArr[isRandom][0].wonBy) {
    status = 'great' //        ai win, human random, ai freeGo
  } else if (!x.win && x.deny && tempArr[isRandom][0].wonBy) {
    status = 'good' //        ai deny, human random, ai freeGo
  }
  else if (!x.win && !x.deny && aiCouldWin.length) {
    status = 'decent' //       random, human random, ai win
  } else if (x.win && x.deny && aiCouldWin.length) {
    status = 'great' //     aiWinDeny, human random, ai win // higher grade?
  } else if (x.win && !x.deny && aiCouldWin.length) {
    status = 'great' //        ai win, human random, ai win
  } else if (!x.win && x.deny && aiCouldWin.length) {
    status = 'good' //        ai deny, human random, ai win
  }
  else if (!x.win && !x.deny && aiCouldDeny.length) {
    status = 'safe' //         random, human random, ai deny
  } else if (x.win && x.deny && aiCouldDeny.length) {
    status = 'great' //     aiWinDeny, human random, ai deny
  } else if (x.win && !x.deny && aiCouldDeny.length) {
    status = 'good' //         ai win, human random, ai deny
  } else if (!x.win && x.deny && aiCouldDeny.length) {
    status = 'decent' //      ai deny, human random, ai deny
  }
  else if (!x.win && !x.deny && !aiCouldWin.length) { // finds where human win would lead ai
    status = 'safe' //         random, human random, random
  } else if (x.win && x.deny && !aiCouldWin.length) {
    status = 'great' //      aiWinDeny, human random, random
  } else if (x.win && !x.deny && !aiCouldWin.length) {
    status = 'good' //         ai win, human random, random
  } else if (!x.win && x.deny && !aiCouldWin.length) {
    status = 'safe' //        ai deny, human random, random
  } 
  if (typeof status === 'string') x[status] = true
}

export default gradeHumanRandom

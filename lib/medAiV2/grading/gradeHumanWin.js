const gradeHumanWin = (tempArr, x, couldBeWon, aiCouldDeny, aiCouldWin) => {
  let status
  if (!x.win && !x.deny && tempArr[couldBeWon][0].wonBy) {
    status = 'notGood' //      random, human win, ai freeGo // write function to check if free move can lead too safely won, mark safe trade.
  } else if (x.win && x.deny && tempArr[couldBeWon][0].wonBy) {
    status = 'great' //     aiWinDeny, human win, ai freeGo
  } else if (x.win && !x.deny && tempArr[couldBeWon][0].wonBy) {
    status = 'good' //         ai win, human win, ai freeGo
  } else if (!x.win && x.deny && tempArr[couldBeWon][0].wonBy) {
    status = 'safe' //        ai deny, human win, ai freeGo
  }
  else if (!x.win && !x.deny && aiCouldWin.length) {
    status = 'trade' //        random, human win, ai win
  } else if (x.win && x.deny && aiCouldWin.length) {
    status = 'great' //     aiWinDeny, human win, ai win
  } else if (x.win && !x.deny && aiCouldWin.length) {
    status = 'good' //         ai win, human win, ai win
  } else if (!x.win && x.deny && aiCouldWin.length) {
    status = 'decent' //      ai deny, human win, ai win
  }
  else if (!x.win && !x.deny && aiCouldDeny.length) {
    status = 'poor' //         random, human win, ai deny
  } else if (x.win && x.deny && aiCouldDeny.length) {
    status = 'good' //      aiWinDeny, human win, ai deny
  } else if (x.win && !x.deny && aiCouldDeny.length) {
    status = 'decent' //       ai win, human win, ai deny
  } else if (!x.win && x.deny && aiCouldDeny.length) {
    status = 'notGood' //     ai deny, human win, ai deny
  }
  else if (!x.win && !x.deny && !aiCouldWin.length) { // finds where human win would lead ai
    status = 'bad' //          random, human win, random
  } else if (x.win && x.deny && !aiCouldWin.length) {
    status = 'safe' //        aiWinDeny, human win, random
  } else if (x.win && !x.deny && !aiCouldWin.length) {
    status = 'trade' //        ai win, human win, random
  } else if (!x.win && x.deny && !aiCouldWin.length) {
    status = 'poor' //        ai deny, human win, random
  } 
  if (typeof status === 'string') x[status] = true
}

export default gradeHumanWin

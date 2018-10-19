const gradeHumanDeny = (tempArr, x, couldBeDenied, aiCouldDeny, aiCouldWin) => {
  let status
  if (!x.win && !x.deny && tempArr[couldBeDenied][0].wonBy) {
    status = 'safe' //         random, human deny, ai freeGo
  } else if (x.win && x.deny && tempArr[couldBeDenied][0].wonBy) {
    status = 'great' //      aiWinDeny, human deny, ai freeGo
  } else if (x.win && !x.deny && tempArr[couldBeDenied][0].wonBy) {
    status = 'great' //         ai win, human deny, ai freeGo
  } else if (!x.win && x.deny && tempArr[couldBeDenied][0].wonBy) {
    status = 'decent' //        ai deny, human deny, ai freeGo
  }
  else if (!x.win && !x.deny && aiCouldDeny.length) {
    status = 'notGood' //      random, human deny, ai deny
  } else if (x.win && x.deny && aiCouldDeny.length) {
    status = 'good' //      aiWinDeny, human deny, ai deny // should be better than good
  } else if (x.win && !x.deny && aiCouldDeny.length) {
    status = 'good' //         ai win, human deny, ai deny
  } else if (!x.win && x.deny && aiCouldDeny.length) {
    status = 'safe'//         ai deny, human deny, ai deny
  }
  else if (!x.win && !x.deny && aiCouldWin.length) {
    status = 'decent' //      random, human deny, ai win
  } else if (x.win && x.deny && aiCouldWin.length) {
    status = 'great' //   aiWinNDeny, human deny, ai win
  } else if (x.win && !x.deny && aiCouldWin.length) {
    status = 'good' //        ai win, human deny, ai win
  } else if (!x.win && x.deny && aiCouldWin.length) {
    status = 'decent' //     ai deny, human deny, ai win
  }
  else if (!x.win && !x.deny && !aiCouldWin.length) { // finds where human win would lead ai
    status = 'poor' //        random, human deny, random
  } else if (x.win && x.deny && !aiCouldWin.length) {
    status = 'decent' //  aiWinNDeny, human deny, random
  } else if (x.win && !x.deny && !aiCouldWin.length) {
    status = 'safe' //        ai win, human deny, random
  } else if (!x.win && x.deny && !aiCouldWin.length) {
    status = 'trade' //      ai deny, human deny, random
  } 
  if (typeof status === 'string') x[status] = true
}

export default gradeHumanDeny

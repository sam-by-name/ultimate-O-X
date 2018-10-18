const grade2DeadOr2Same = (x, humanVictories, allHumanWins, humanDeny, humanWin) => { // improve to include what ai could do? humanWin === count of moves that == humanVic
  let status
  if (x.sends2Dead && humanVictories.length) status = 'harikari' //                                                2DeadAny , human vic
  // need to get a humanWin that === all humanWins that are available

  // Below are conditions for, is a win and sends too the same mini
  else if (x.win && x.deny && x.sends2Dead && allHumanWins.length) status = 'safe' //                          2SameWin&Deny , win
  else if (x.win && x.deny && x.sends2Dead && humanDeny.length) status = 'good' //                             2SameWin&Deny , Deny
  else if (x.win && x.deny && x.sends2Dead && !allHumanWins.length && !humanDeny.length) status = 'great' //   2SameWin&Deny , Random
  else if (x.win && !x.deny && x.sends2Dead && allHumanWins.length) status = 'trade' //                             2SameWin , win
  else if (x.win && !x.deny && x.sends2Dead && humanDeny.length) status = 'decent' //                               2SameWin , Deny
  else if (x.win && !x.deny && x.sends2Dead && !allHumanWins.length && !humanDeny.length) status = 'great' //       2SameWin , Random
  // Above are conditions for, is a win and sends too the same mini

  // Below are conditions for if move sends to dead mini
  else if (!x.win && x.deny && x.sends2Dead && allHumanWins.length) status = 'poor' //                             2DeadDeny , win
  else if (!x.win && x.deny && x.sends2Dead && !allHumanWins.length && humanDeny.length) status = 'trade' //       2DeadDeny , Deny
  else if (!x.win && x.deny && x.sends2Dead && !allHumanWins.length && !humanDeny.length) status = 'safe' //       2DeadDeny , Random

  else if (!x.win && !x.deny && x.sends2Dead && allHumanWins.length) status = 'bad' //                           2DeadRandom , win
  else if (!x.win && !x.deny && x.sends2Dead && humanDeny.length) status = 'poor' //                             2DeadRandom , Deny
  else if (!x.win && !x.deny && x.sends2Dead && !allHumanWins.length && !humanDeny.length) status = 'notGood' // 2DeadRandom , Random

  // Below are conditions for, is not a win and is a deny and sends too the same mini
  else if (!x.win && x.deny && x.sends2Same && humanWin.length > 1) status = 'poor' //                             2SameDeny , win // this win might be a vic ... fix
  else if (!x.win && x.deny && x.sends2Same && humanDeny.length > 1) status = 'trade' //                           2SameDeny , Deny
  else if (!x.win && x.deny && x.sends2Same && !humanWin.length && !humanDeny.length) status = 'safe' //           2SameDeny , Random
  else if (!x.win && !x.deny && x.sends2Same && humanWin.length > 1) status = 'bad' //                           2SameRandom , win // this win might be a vic ... fix
  else if (!x.win && !x.deny && x.sends2Same && humanDeny.length > 1) status = 'poor' //                         2SameRandom , Deny
  else if (!x.win && !x.deny && x.sends2Same && !humanWin.length && !humanDeny.length) status = 'notGood' //     2SameRandom , Random

  if (typeof status === 'string') x[status] = true
}

export default grade2DeadOr2Same

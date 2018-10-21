const grade2DeadOr2Same = (x, humanVics, allHumanWins, allHumanDenies, humanDeny, humanWin) => { // improve to include what ai could do? humanWin === count of moves that == humanVic
  let status
  if (x.sends2Dead && humanVics > 0) status = 'harikari' //                                                2DeadAny , human vic
  // need to get a humanWin that === all humanWins that are available

  // Below are conditions for, is a win and sends too the same mini
  else if (x.win && x.deny && x.sends2Dead && allHumanWins.length) status = 'safe' //                               2SameWin&Deny , win
  else if (x.win && x.deny && x.sends2Dead && allHumanDenies.length) status = 'good' //                             2SameWin&Deny , Deny
  else if (x.win && x.deny && x.sends2Dead && !allHumanWins.length && !allHumanDenies.length) status = 'great' //   2SameWin&Deny , Random

  else if (x.win && !x.deny && x.sends2Dead && allHumanWins.length) status = 'trade' //                                  2DeadWin , win
  else if (x.win && !x.deny && x.sends2Dead && allHumanDenies.length) status = 'decent' //                               2DeadWin , Deny
  else if (x.win && !x.deny && x.sends2Dead && !allHumanWins.length && !allHumanDenies.length) status = 'great' //       2DeadWin , Random
  // Above are conditions for, is a win and sends too the same mini || to dead

  // Below are conditions for if move sends to dead mini
  else if (!x.win && x.deny && x.sends2Dead && allHumanWins.length) status = 'poor' //                                  2DeadDeny , win
  else if (!x.win && x.deny && x.sends2Dead && !allHumanWins.length && humanDeny.length) status = 'trade' //            2DeadDeny , Deny
  else if (!x.win && x.deny && x.sends2Dead && !allHumanWins.length && !humanDeny.length) status = 'safe' //            2DeadDeny , Random

  else if (!x.win && !x.deny && x.sends2Dead && allHumanWins.length) status = 'bad' //                                2DeadRandom , win
  else if (!x.win && !x.deny && x.sends2Dead && allHumanDenies.length) status = 'poor' //                             2DeadRandom , Deny
  else if (!x.win && !x.deny && x.sends2Dead && !allHumanWins.length && !allHumanDenies.length) status = 'notGood' // 2DeadRandom , Random

  // Below are conditions for, is not a win and is a deny and sends too the same mini
  else if (!x.win && x.deny && x.sends2Same && humanWin.length) status = 'poor' //                                      2SameDeny , win // this win might be a vic ... fix
  else if (!x.win && x.deny && x.sends2Same && humanDeny.length) status = 'safe' //                                     2SameDeny , Deny
  else if (!x.win && x.deny && x.sends2Same && !humanWin.length && !humanDeny.length) status = 'decent' //              2SameDeny , Random
  else if (!x.win && !x.deny && x.sends2Same && humanWin.length) status = 'bad' //                                    2SameRandom , win // this win might be a vic ... fix
  else if (!x.win && !x.deny && x.sends2Same && humanDeny.length) status = 'poor' //                                  2SameRandom , Deny
  else if (!x.win && !x.deny && x.sends2Same && !humanWin.length && !humanDeny.length) status = 'notGood' //          2SameRandom , Random

  if (typeof status === 'string') x[status] = true
}

export default grade2DeadOr2Same

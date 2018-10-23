export const grade2DeadOr2Same = (x, huVics, allHuW, allHuD, huD, huW) => { // improve to include what ai could do? humanWin === count of moves that == humanVic
  let status
  if (x.sends2Dead && huVics > 0) status = 'harikari' //                                                2DeadAny , human vic

  // Below are conditions for, is a win and sends too the same mini
  else if (x.win && x.deny && x.sends2Dead && allHuW.length) status = 'safe' //                               2SameWin&Deny , win
  else if (x.win && x.deny && x.sends2Dead && allHuD.length) status = 'good' //                             2SameWin&Deny , Deny
  else if (x.win && x.deny && x.sends2Dead && !allHuW.length && !allHuD.length) status = 'great' //   2SameWin&Deny , Random

  else if (x.win && x.sends2Dead && allHuW.length) status = 'trade' //                                  2DeadWin , win
  else if (x.win && x.sends2Dead && allHuW.length) status = 'decent' //                               2DeadWin , Deny
  else if (x.win && x.sends2Dead && !allHuW.length && !allHuD.length) status = 'great' //       2DeadWin , Random
  // Above are conditions for, is a win and sends too the same mini || to dead

  // Below are conditions for if move sends to dead mini
  else if (x.deny && x.sends2Dead && allHuW.length) status = 'poor' //                                  2DeadDeny , win
  else if (x.deny && x.sends2Dead && !allHuW.length && allHuD.length) status = 'trade' //            2DeadDeny , Deny
  else if (x.deny && x.sends2Dead && !allHuW.length && !allHuD.length) status = 'safe' //            2DeadDeny , Random

  else if (!x.win && !x.deny && x.sends2Dead && allHuW.length) status = 'bad' //                                2DeadRandom , win
  else if (!x.win && !x.deny && x.sends2Dead && allHuD.length) status = 'poor' //                             2DeadRandom , Deny
  else if (!x.win && !x.deny && x.sends2Dead && !allHuW.length && !allHuD.length) status = 'notGood' // 2DeadRandom , Random

  // Below are conditions for, is not a win and is a deny and sends too the same mini
  else if (!x.win && x.deny && x.sends2Same && huW.length) status = 'poor' //                                      2SameDeny , win // this win might be a vic ... fix
  else if (!x.win && x.deny && x.sends2Same && huD.length) status = 'safe' //                                     2SameDeny , Deny
  else if (!x.win && x.deny && x.sends2Same && !huW.length && !huD.length) status = 'decent' //              2SameDeny , Random
  else if (!x.win && !x.deny && x.sends2Same && huW.length) status = 'bad' //                                    2SameRandom , win // this win might be a vic ... fix
  else if (!x.win && !x.deny && x.sends2Same && huD.length) status = 'poor' //                                  2SameRandom , Deny
  else if (!x.win && !x.deny && x.sends2Same && !huW.length && !huD.length) status = 'notGood' //          2SameRandom , Random

  if (typeof status === 'string') x[status] = true
}

export const gradeFuture2DeadOr2Same = (a, h, a2, huVics, allHuW, allHuD, couldBeDenied, couldBeWon) => {
  let status
  if (a.win && a.deny && h.win && a2.win && a.futureHarikari) status = '' //                               win&deny,    win,    win, huVic
  else if (a.win && a.deny && h.win && a2.deny && a.futureHarikari) status = '' //                         win&deny,    win,   deny, huVic
  else if (a.win && a.deny && h.win && !a2.win && !a2.deny && a.futureHarikari) status = '' //             win&deny,    win, random, huVic
  else if (a.win && a.deny && h.deny && a2.win && a.futureHarikari) status = '' //                         win&deny,   deny,    win, huVic
  else if (a.win && a.deny && h.deny && a2.deny && a.futureHarikari) status = '' //                        win&deny,   deny,   deny, huVic
  else if (a.win && a.deny && h.deny && !a2.win && !a2.deny && a.futureHarikari) status = '' //            win&deny,   deny, random, huVic
  else if (a.win && a.deny && !h.deny && !h.win && a2.win && a.futureHarikari) status = '' //              win&deny, random,    win, huVic
  else if (a.win && a.deny && !h.deny && !h.win && a2.deny && a.futureHarikari) status = '' //             win&deny, random,   deny, huVic
  else if (a.win && a.deny && !h.deny && !h.win && !a2.win && !a2.deny && a.futureHarikari) status = '' // win&deny, random, random, huVic

  else if (a.win && h.win && a2.win && a.futureHarikari) status = '' //                                         win,    win,    win, huVic
  else if (a.win && h.win && a2.deny && a.futureHarikari) status = '' //                                        win,    win,   deny, huVic
  else if (a.win && h.win && !a2.win && !a2.deny && a.futureHarikari) status = '' //                            win,    win, random, huVic
  else if (a.win && h.deny && a2.win && a.futureHarikari) status = '' //                                        win,   deny,    win, huVic
  else if (a.win && h.deny && a2.deny && a.futureHarikari) status = '' //                                       win,   deny,   deny, huVic
  else if (a.win && h.deny && !a2.win && !a2.deny && a.futureHarikari) status = '' //                           win,   deny, random, huVic
  else if (a.win && !h.deny && !h.win && a2.win && a.futureHarikari) status = '' //                             win, random,    win, huVic
  else if (a.win && !h.deny && !h.win && a2.deny && a.futureHarikari) status = '' //                            win, random,   deny, huVic
  else if (a.win && !h.deny && !h.win && !a2.win && !a2.deny && a.futureHarikari) status = '' //                win, random, random, huVic

  else if (a.deny && h.win && a2.win && a.futureHarikari) status = '' //                                       deny,    win,    win, huVic
  else if (a.deny && h.win && a2.deny && a.futureHarikari) status = '' //                                      deny,    win,   deny, huVic
  else if (a.deny && h.win && !a2.win && !a2.deny && a.futureHarikari) status = '' //                          deny,    win, random, huVic
  else if (a.deny && h.deny && a2.win && a.futureHarikari) status = '' //                                      deny,   deny,    win, huVic
  else if (a.deny && h.deny && a2.deny && a.futureHarikari) status = '' //                                     deny,   deny,   deny, huVic
  else if (a.deny && h.deny && !a2.win && !a2.deny && a.futureHarikari) status = '' //                         deny,   deny, random, huVic
  else if (a.deny && !h.deny && !h.win && a2.win && a.futureHarikari) status = '' //                           deny, random,    win, huVic
  else if (a.deny && !h.deny && !h.win && a2.deny && a.futureHarikari) status = '' //                          deny, random,   deny, huVic
  else if (a.deny && !h.deny && !h.win && !a2.win && !a2.deny && a.futureHarikari) status = '' //              deny, random, random, huVic

  else if (!a.win && !a.deny && h.win && a2.win && a.futureHarikari) status = '' //                          random,    win,    win, huVic
  else if (!a.win && !a.deny && h.win && a2.deny && a.futureHarikari) status = '' //                         random,    win,   deny, huVic
  else if (!a.win && !a.deny && h.win && !a2.win && !a2.deny && a.futureHarikari) status = '' //             random,    win, random, huVic
  else if (!a.win && !a.deny && h.deny && a2.win && a.futureHarikari) status = '' //                         random,   deny,    win, huVic
  else if (!a.win && !a.deny && h.deny && a2.deny && a.futureHarikari) status = '' //                        random,   deny,   deny, huVic
  else if (!a.win && !a.deny && h.deny && !a2.win && !a2.deny && a.futureHarikari) status = '' //            random,   deny, random, huVic
  else if (!a.win && !a.deny && !h.deny && !h.win && a2.win && a.futureHarikari) status = '' //              random, random,    win, huVic
  else if (!a.win && !a.deny && !h.deny && !h.win && a2.deny && a.futureHarikari) status = '' //             random, random,   deny, huVic
  else if (!a.win && !a.deny && !h.deny && !h.win && !a2.win && !a2.deny && a.futureHarikari) status = '' // random, random, random, huVic

  //             //                //               //               //              //

  else if (a.win && a.deny && h.win && a2.win && a.future2Dead && huVics > 0) status = '' //                          win&deny,    win,    2DeadWin, huVic
  else if (a.win && a.deny && h.win && a2.deny && a.future2Dead && huVics > 0) status = '' //                         win&deny,    win,   2DeadDeny, huVic
  else if (a.win && a.deny && h.win && !a2.win && !a2.deny && a.future2Dead && huVics > 0) status = '' //             win&deny,    win, 2DeadRandom, huVic
  else if (a.win && a.deny && h.deny && a2.win && a.future2Dead && huVics > 0) status = '' //                         win&deny,   deny,    2DeadWin, huVic
  else if (a.win && a.deny && h.deny && a2.deny && a.future2Dead && huVics > 0) status = '' //                        win&deny,   deny,   2DeadDeny, huVic
  else if (a.win && a.deny && h.deny && !a2.win && !a2.deny && a.future2Dead && huVics > 0) status = '' //            win&deny,   deny, 2DeadRandom, huVic
  else if (a.win && a.deny && !h.deny && !h.win && a2.win && a.future2Dead && huVics > 0) status = '' //              win&deny, random,    2DeadWin, huVic
  else if (a.win && a.deny && !h.deny && !h.win && a2.deny && a.future2Dead && huVics > 0) status = '' //             win&deny, random,   2DeadDeny, huVic
  else if (a.win && a.deny && !h.deny && !h.win && !a2.win && !a2.deny && a.future2Dead && huVics > 0) status = '' // win&deny, random, 2DeadRandom, huVic
  else if (a.win && h.win && a2.win && a.future2Dead && huVics > 0) status = '' //                                         win,    win,    2DeadWin, huVic
  else if (a.win && h.win && a2.deny && a.future2Dead && huVics > 0) status = '' //                                        win,    win,   2DeadDeny, huVic
  else if (a.win && h.win && !a2.win && !a2.deny && a.future2Dead && huVics > 0) status = '' //                            win,    win, 2DeadRandom, huVic
  else if (a.win && h.deny && a2.win && a.future2Dead && huVics > 0) status = '' //                                        win,   deny,    2DeadWin, huVic
  else if (a.win && h.deny && a2.deny && a.future2Dead && huVics > 0) status = '' //                                       win,   deny,   2DeadDeny, huVic
  else if (a.win && h.deny && !a2.win && !a2.deny && a.future2Dead && huVics > 0) status = '' //                           win,   deny, 2DeadRandom, huVic
  else if (a.win && !h.deny && !h.win && a2.win && a.future2Dead && huVics > 0) status = '' //                             win, random,    2DeadWin, huVic
  else if (a.win && !h.deny && !h.win && a2.deny && a.future2Dead && huVics > 0) status = '' //                            win, random,   2DeadDeny, huVic
  else if (a.win && !h.deny && !h.win && !a2.win && !a2.deny && a.future2Dead && huVics > 0) status = '' //                win, random, 2DeadRandom, huVic
  else if (a.deny && h.win && a2.win && a.future2Dead && huVics > 0) status = '' //                                       deny,    win,    2DeadWin, huVic
  else if (a.deny && h.win && a2.deny && a.future2Dead && huVics > 0) status = '' //                                      deny,    win,   2DeadDeny, huVic
  else if (a.deny && h.win && !a2.win && !a2.deny && a.future2Dead && huVics > 0) status = '' //                          deny,    win, 2DeadRandom, huVic
  else if (a.deny && h.deny && a2.win && a.future2Dead && huVics > 0) status = '' //                                      deny,   deny,    2DeadWin, huVic
  else if (a.deny && h.deny && a2.deny && a.future2Dead && huVics > 0) status = '' //                                     deny,   deny,   2DeadDeny, huVic
  else if (a.deny && h.deny && !a2.win && !a2.deny && a.future2Dead && huVics > 0) status = '' //                         deny,   deny, 2DeadRandom, huVic
  else if (a.deny && !h.deny && !h.win && a2.win && a.future2Dead && huVics > 0) status = '' //                           deny, random,    2DeadWin, huVic
  else if (a.deny && !h.deny && !h.win && a2.deny && a.future2Dead && huVics > 0) status = '' //                          deny, random,   2DeadDeny, huVic
  else if (a.deny && !h.deny && !h.win && !a2.win && !a2.deny && a.future2Dead && huVics > 0) status = '' //              deny, random, 2DeadRandom, huVic
  else if (!a.win && !a.deny && h.win && a2.win && a.future2Dead && huVics > 0) status = '' //                          random,    win,    2DeadWin, huVic
  else if (!a.win && !a.deny && h.win && a2.deny && a.future2Dead && huVics > 0) status = '' //                         random,    win,   2DeadDeny, huVic
  else if (!a.win && !a.deny && h.win && !a2.win && !a2.deny && a.future2Dead && huVics > 0) status = '' //             random,    win, 2DeadRandom, huVic
  else if (!a.win && !a.deny && h.deny && a2.win && a.future2Dead && huVics > 0) status = '' //                         random,   deny,    2DeadWin, huVic
  else if (!a.win && !a.deny && h.deny && a2.deny && a.future2Dead && huVics > 0) status = '' //                        random,   deny,   2DeadDeny, huVic
  else if (!a.win && !a.deny && h.deny && !a2.win && !a2.deny && a.future2Dead && huVics > 0) status = '' //            random,   deny, 2DeadRandom, huVic
  else if (!a.win && !a.deny && !h.deny && !h.win && a2.win && a.future2Dead && huVics > 0) status = '' //              random, random,    2DeadWin, huVic
  else if (!a.win && !a.deny && !h.deny && !h.win && a2.deny && a.future2Dead && huVics > 0) status = '' //             random, random,   2DeadDeny, huVic
  else if (!a.win && !a.deny && !h.deny && !h.win && !a2.win && !a2.deny && a.future2Dead && huVics > 0) status = '' // random, random, 2DeadRandom, huVic

  //             //                //               //               //              //

  if (a.win && a.deny && h.win && a2.win && a.future2Dead && allHuW.length) status = '' //                               win&deny,    win,    2DeadWin, win
  else if (a.win && a.deny && h.win && a2.deny && a.future2Dead && allHuW.length) status = '' //                         win&deny,    win,   2DeadDeny, win
  else if (a.win && a.deny && h.win && !a2.win && !a2.deny && a.future2Dead && allHuW.length) status = '' //             win&deny,    win, 2DeadRandom, win
  else if (a.win && a.deny && h.deny && a2.win && a.future2Dead && allHuW.length) status = '' //                         win&deny,   deny,    2DeadWin, win
  else if (a.win && a.deny && h.deny && a2.deny && a.future2Dead && allHuW.length) status = '' //                        win&deny,   deny,   2DeadDeny, win
  else if (a.win && a.deny && h.deny && !a2.win && !a2.deny && a.future2Dead && allHuW.length) status = '' //            win&deny,   deny, 2DeadRandom, win
  else if (a.win && a.deny && !h.deny && !h.win && a2.win && a.future2Dead && allHuW.length) status = '' //              win&deny, random,    2DeadWin, win
  else if (a.win && a.deny && !h.deny && !h.win && a2.deny && a.future2Dead && allHuW.length) status = '' //             win&deny, random,   2DeadDeny, win
  else if (a.win && a.deny && !h.deny && !h.win && !a2.win && !a2.deny && a.future2Dead && allHuW.length) status = '' // win&deny, random, 2DeadRandom, win
  else if (a.win && h.win && a2.win && a.future2Dead && allHuW.length) status = '' //                                         win,    win,    2DeadWin, win
  else if (a.win && h.win && a2.deny && a.future2Dead && allHuW.length) status = '' //                                        win,    win,   2DeadDeny, win
  else if (a.win && h.win && !a2.win && !a2.deny && a.future2Dead && allHuW.length) status = '' //                            win,    win, 2DeadRandom, win
  else if (a.win && h.deny && a2.win && a.future2Dead && allHuW.length) status = '' //                                        win,   deny,    2DeadWin, win
  else if (a.win && h.deny && a2.deny && a.future2Dead && allHuW.length) status = '' //                                       win,   deny,   2DeadDeny, win
  else if (a.win && h.deny && !a2.win && !a2.deny && a.future2Dead && allHuW.length) status = '' //                           win,   deny, 2DeadRandom, win
  else if (a.win && !h.deny && !h.win && a2.win && a.future2Dead && allHuW.length) status = '' //                             win, random,    2DeadWin, win
  else if (a.win && !h.deny && !h.win && a2.deny && a.future2Dead && allHuW.length) status = '' //                            win, random,   2DeadDeny, win
  else if (a.win && !h.deny && !h.win && !a2.win && !a2.deny && a.future2Dead && allHuW.length) status = '' //                win, random, 2DeadRandom, win
  else if (a.deny && h.win && a2.win && a.future2Dead && allHuW.length) status = '' //                                       deny,    win,    2DeadWin, win
  else if (a.deny && h.win && a2.deny && a.future2Dead && allHuW.length) status = '' //                                      deny,    win,   2DeadDeny, win
  else if (a.deny && h.win && !a2.win && !a2.deny && a.future2Dead && allHuW.length) status = '' //                          deny,    win, 2DeadRandom, win
  else if (a.deny && h.deny && a2.win && a.future2Dead && allHuW.length) status = '' //                                      deny,   deny,    2DeadWin, win
  else if (a.deny && h.deny && a2.deny && a.future2Dead && allHuW.length) status = '' //                                     deny,   deny,   2DeadDeny, win
  else if (a.deny && h.deny && !a2.win && !a2.deny && a.future2Dead && allHuW.length) status = '' //                         deny,   deny, 2DeadRandom, win
  else if (a.deny && !h.deny && !h.win && a2.win && a.future2Dead && allHuW.length) status = '' //                           deny, random,    2DeadWin, win
  else if (a.deny && !h.deny && !h.win && a2.deny && a.future2Dead && allHuW.length) status = '' //                          deny, random,   2DeadDeny, win
  else if (a.deny && !h.deny && !h.win && !a2.win && !a2.deny && a.future2Dead && allHuW.length) status = '' //              deny, random, 2DeadRandom, win
  else if (!a.win && !a.deny && h.win && a2.win && a.future2Dead && allHuW.length) status = '' //                          random,    win,    2DeadWin, win
  else if (!a.win && !a.deny && h.win && a2.deny && a.future2Dead && allHuW.length) status = '' //                         random,    win,   2DeadDeny, win
  else if (!a.win && !a.deny && h.win && !a2.win && !a2.deny && a.future2Dead && allHuW.length) status = '' //             random,    win, 2DeadRandom, win
  else if (!a.win && !a.deny && h.deny && a2.win && a.future2Dead && allHuW.length) status = '' //                         random,   deny,    2DeadWin, win
  else if (!a.win && !a.deny && h.deny && a2.deny && a.future2Dead && allHuW.length) status = '' //                        random,   deny,   2DeadDeny, win
  else if (!a.win && !a.deny && h.deny && !a2.win && !a2.deny && a.future2Dead && allHuW.length) status = '' //            random,   deny, 2DeadRandom, win
  else if (!a.win && !a.deny && !h.deny && !h.win && a2.win && a.future2Dead && allHuW.length) status = '' //              random, random,    2DeadWin, win
  else if (!a.win && !a.deny && !h.deny && !h.win && a2.deny && a.future2Dead && allHuW.length) status = '' //             random, random,   2DeadDeny, win
  else if (!a.win && !a.deny && !h.deny && !h.win && !a2.win && !a2.deny && a.future2Dead && allHuW.length) status = '' // random, random, 2DeadRandom, win

  //             //                //               //               //              //

  else if (a.win && a.deny && h.win && a2.win && a.future2Dead && allHuD.length) status = '' //                          win&deny,    win,    2DeadWin, Deny
  else if (a.win && a.deny && h.win && a2.deny && a.future2Dead && allHuD.length) status = '' //                         win&deny,    win,   2DeadDeny, Deny
  else if (a.win && a.deny && h.win && !a2.win && !a2.deny && a.future2Dead && allHuD.length) status = '' //             win&deny,    win, 2DeadRandom, Deny
  else if (a.win && a.deny && h.deny && a2.win && a.future2Dead && allHuD.length) status = '' //                         win&deny,   deny,    2DeadWin, Deny
  else if (a.win && a.deny && h.deny && a2.deny && a.future2Dead && allHuD.length) status = '' //                        win&deny,   deny,   2DeadDeny, Deny
  else if (a.win && a.deny && h.deny && !a2.win && !a2.deny && a.future2Dead && allHuD.length) status = '' //            win&deny,   deny, 2DeadRandom, Deny
  else if (a.win && a.deny && !h.deny && !h.win && a2.win && a.future2Dead && allHuD.length) status = '' //              win&deny, random,    2DeadWin, Deny
  else if (a.win && a.deny && !h.deny && !h.win && a2.deny && a.future2Dead && allHuD.length) status = '' //             win&deny, random,   2DeadDeny, Deny
  else if (a.win && a.deny && !h.deny && !h.win && !a2.win && !a2.deny && a.future2Dead && allHuD.length) status = '' // win&deny, random, 2DeadRandom, Deny
  else if (a.win && h.win && a2.win && a.future2Dead && allHuD.length) status = '' //                                         win,    win,    2DeadWin, Deny
  else if (a.win && h.win && a2.deny && a.future2Dead && allHuD.length) status = '' //                                        win,    win,   2DeadDeny, Deny
  else if (a.win && h.win && !a2.win && !a2.deny && a.future2Dead && allHuD.length) status = '' //                            win,    win, 2DeadRandom, Deny
  else if (a.win && h.deny && a2.win && a.future2Dead && allHuD.length) status = '' //                                        win,   deny,    2DeadWin, Deny
  else if (a.win && h.deny && a2.deny && a.future2Dead && allHuD.length) status = '' //                                       win,   deny,   2DeadDeny, Deny
  else if (a.win && h.deny && !a2.win && !a2.deny && a.future2Dead && allHuD.length) status = '' //                           win,   deny, 2DeadRandom, Deny
  else if (a.win && !h.deny && !h.win && a2.win && a.future2Dead && allHuD.length) status = '' //                             win, random,    2DeadWin, Deny
  else if (a.win && !h.deny && !h.win && a2.deny && a.future2Dead && allHuD.length) status = '' //                            win, random,   2DeadDeny, Deny
  else if (a.win && !h.deny && !h.win && !a2.win && !a2.deny && a.future2Dead && allHuD.length) status = '' //                win, random, 2DeadRandom, Deny
  else if (a.deny && h.win && a2.win && a.future2Dead && allHuD.length) status = '' //                                       deny,    win,    2DeadWin, Deny
  else if (a.deny && h.win && a2.deny && a.future2Dead && allHuD.length) status = '' //                                      deny,    win,   2DeadDeny, Deny
  else if (a.deny && h.win && !a2.win && !a2.deny && a.future2Dead && allHuD.length) status = '' //                          deny,    win, 2DeadRandom, Deny
  else if (a.deny && h.deny && a2.win && a.future2Dead && allHuD.length) status = '' //                                      deny,   deny,    2DeadWin, Deny
  else if (a.deny && h.deny && a2.deny && a.future2Dead && allHuD.length) status = '' //                                     deny,   deny,   2DeadDeny, Deny
  else if (a.deny && h.deny && !a2.win && !a2.deny && a.future2Dead && allHuD.length) status = '' //                         deny,   deny, 2DeadRandom, Deny
  else if (a.deny && !h.deny && !h.win && a2.win && a.future2Dead && allHuD.length) status = '' //                           deny, random,    2DeadWin, Deny
  else if (a.deny && !h.deny && !h.win && a2.deny && a.future2Dead && allHuD.length) status = '' //                          deny, random,   2DeadDeny, Deny
  else if (a.deny && !h.deny && !h.win && !a2.win && !a2.deny && a.future2Dead && allHuD.length) status = '' //              deny, random, 2DeadRandom, Deny
  else if (!a.win && !a.deny && h.win && a2.win && a.future2Dead && allHuD.length) status = '' //                          random,    win,    2DeadWin, Deny
  else if (!a.win && !a.deny && h.win && a2.deny && a.future2Dead && allHuD.length) status = '' //                         random,    win,   2DeadDeny, Deny
  else if (!a.win && !a.deny && h.win && !a2.win && !a2.deny && a.future2Dead && allHuD.length) status = '' //             random,    win, 2DeadRandom, Deny
  else if (!a.win && !a.deny && h.deny && a2.win && a.future2Dead && allHuD.length) status = '' //                         random,   deny,    2DeadWin, Deny
  else if (!a.win && !a.deny && h.deny && a2.deny && a.future2Dead && allHuD.length) status = '' //                        random,   deny,   2DeadDeny, Deny
  else if (!a.win && !a.deny && h.deny && !a2.win && !a2.deny && a.future2Dead && allHuD.length) status = '' //            random,   deny, 2DeadRandom, Deny
  else if (!a.win && !a.deny && !h.deny && !h.win && a2.win && a.future2Dead && allHuD.length) status = '' //              random, random,    2DeadWin, Deny
  else if (!a.win && !a.deny && !h.deny && !h.win && a2.deny && a.future2Dead && allHuD.length) status = '' //             random, random,   2DeadDeny, Deny
  else if (!a.win && !a.deny && !h.deny && !h.win && !a2.win && !a2.deny && a.future2Dead && allHuD.length) status = '' // random, random, 2DeadRandom, Deny

  //             //                //               //               //              //

  else if (a.win && a.deny && h.win && a2.win && a.future2Dead && !allHuD.length & !allHuW.length) status = '' //                          win&deny,    win,    2DeadWin, Random
  else if (a.win && a.deny && h.win && a2.deny && a.future2Dead && !allHuD.length & !allHuW.length) status = '' //                         win&deny,    win,   2DeadDeny, Random
  else if (a.win && a.deny && h.win && !a2.win && !a2.deny && a.future2Dead && !allHuD.length & !allHuW.length) status = '' //             win&deny,    win, 2DeadRandom, Random
  else if (a.win && a.deny && h.deny && a2.win && a.future2Dead && !allHuD.length & !allHuW.length) status = '' //                         win&deny,   deny,    2DeadWin, Random
  else if (a.win && a.deny && h.deny && a2.deny && a.future2Dead && !allHuD.length & !allHuW.length) status = '' //                        win&deny,   deny,   2DeadDeny, Random
  else if (a.win && a.deny && h.deny && !a2.win && !a2.deny && a.future2Dead && !allHuD.length & !allHuW.length) status = '' //            win&deny,   deny, 2DeadRandom, Random
  else if (a.win && a.deny && !h.deny && !h.win && a2.win && a.future2Dead && !allHuD.length & !allHuW.length) status = '' //              win&deny, random,    2DeadWin, Random
  else if (a.win && a.deny && !h.deny && !h.win && a2.deny && a.future2Dead && !allHuD.length & !allHuW.length) status = '' //             win&deny, random,   2DeadDeny, Random
  else if (a.win && a.deny && !h.deny && !h.win && !a2.win && !a2.deny && a.future2Dead && !allHuD.length & !allHuW.length) status = '' // win&deny, random, 2DeadRandom, Random
  else if (a.win && h.win && a2.win && a.future2Dead && !allHuD.length & !allHuW.length) status = '' //                                         win,    win,    2DeadWin, Random
  else if (a.win && h.win && a2.deny && a.future2Dead && !allHuD.length & !allHuW.length) status = '' //                                        win,    win,   2DeadDeny, Random
  else if (a.win && h.win && !a2.win && !a2.deny && a.future2Dead && !allHuD.length & !allHuW.length) status = '' //                            win,    win, 2DeadRandom, Random
  else if (a.win && h.deny && a2.win && a.future2Dead && !allHuD.length & !allHuW.length) status = '' //                                        win,   deny,    2DeadWin, Random
  else if (a.win && h.deny && a2.deny && a.future2Dead && !allHuD.length & !allHuW.length) status = '' //                                       win,   deny,   2DeadDeny, Random
  else if (a.win && h.deny && !a2.win && !a2.deny && a.future2Dead && !allHuD.length & !allHuW.length) status = '' //                           win,   deny, 2DeadRandom, Random
  else if (a.win && !h.deny && !h.win && a2.win && a.future2Dead && !allHuD.length & !allHuW.length) status = '' //                             win, random,    2DeadWin, Random
  else if (a.win && !h.deny && !h.win && a2.deny && a.future2Dead && !allHuD.length & !allHuW.length) status = '' //                            win, random,   2DeadDeny, Random
  else if (a.win && !h.deny && !h.win && !a2.win && !a2.deny && a.future2Dead && !allHuD.length & !allHuW.length) status = '' //                win, random, 2DeadRandom, Random
  else if (a.deny && h.win && a2.win && a.future2Dead && !allHuD.length & !allHuW.length) status = '' //                                       deny,    win,    2DeadWin, Random
  else if (a.deny && h.win && a2.deny && a.future2Dead && !allHuD.length & !allHuW.length) status = '' //                                      deny,    win,   2DeadDeny, Random
  else if (a.deny && h.win && !a2.win && !a2.deny && a.future2Dead && !allHuD.length & !allHuW.length) status = '' //                          deny,    win, 2DeadRandom, Random
  else if (a.deny && h.deny && a2.win && a.future2Dead && !allHuD.length & !allHuW.length) status = '' //                                      deny,   deny,    2DeadWin, Random
  else if (a.deny && h.deny && a2.deny && a.future2Dead && !allHuD.length & !allHuW.length) status = '' //                                     deny,   deny,   2DeadDeny, Random
  else if (a.deny && h.deny && !a2.win && !a2.deny && a.future2Dead && !allHuD.length & !allHuW.length) status = '' //                         deny,   deny, 2DeadRandom, Random
  else if (a.deny && !h.deny && !h.win && a2.win && a.future2Dead && !allHuD.length & !allHuW.length) status = '' //                           deny, random,    2DeadWin, Random
  else if (a.deny && !h.deny && !h.win && a2.deny && a.future2Dead && !allHuD.length & !allHuW.length) status = '' //                          deny, random,   2DeadDeny, Random
  else if (a.deny && !h.deny && !h.win && !a2.win && !a2.deny && a.future2Dead && !allHuD.length & !allHuW.length) status = '' //              deny, random, 2DeadRandom, Random
  else if (!a.win && !a.deny && h.win && a2.win && a.future2Dead && !allHuD.length & !allHuW.length) status = '' //                          random,    win,    2DeadWin, Random
  else if (!a.win && !a.deny && h.win && a2.deny && a.future2Dead && !allHuD.length & !allHuW.length) status = '' //                         random,    win,   2DeadDeny, Random
  else if (!a.win && !a.deny && h.win && !a2.win && !a2.deny && a.future2Dead && !allHuD.length & !allHuW.length) status = '' //             random,    win, 2DeadRandom, Random
  else if (!a.win && !a.deny && h.deny && a2.win && a.future2Dead && !allHuD.length & !allHuW.length) status = '' //                         random,   deny,    2DeadWin, Random
  else if (!a.win && !a.deny && h.deny && a2.deny && a.future2Dead && !allHuD.length & !allHuW.length) status = '' //                        random,   deny,   2DeadDeny, Random
  else if (!a.win && !a.deny && h.deny && !a2.win && !a2.deny && a.future2Dead && !allHuD.length & !allHuW.length) status = '' //            random,   deny, 2DeadRandom, Random
  else if (!a.win && !a.deny && !h.deny && !h.win && a2.win && a.future2Dead && !allHuD.length & !allHuW.length) status = '' //              random, random,    2DeadWin, Random
  else if (!a.win && !a.deny && !h.deny && !h.win && a2.deny && a.future2Dead && !allHuD.length & !allHuW.length) status = '' //             random, random,   2DeadDeny, Random
  else if (!a.win && !a.deny && !h.deny && !h.win && !a2.win && !a2.deny && a.future2Dead && !allHuD.length & !allHuW.length) status = '' // random, random, 2DeadRandom, Random

  //             //                //               //               //              //

  else if (a.win && a.deny && h.win && a2.deny && a.future2Same && allHuD.length) status = '' //                         win&deny,    win,   2SameDeny, deny
  else if (a.win && a.deny && h.win && !a2.win && !a2.deny && a.future2Same && allHuD.length) status = '' //             win&deny,    win, 2SameRandom, deny
  else if (a.win && a.deny && h.deny && a2.deny && a.future2Same && allHuD.length) status = '' //                        win&deny,   deny,   2SameDeny, deny
  else if (a.win && a.deny && h.deny && !a2.win && !a2.deny && a.future2Same && allHuD.length) status = '' //            win&deny,   deny, 2SameRandom, deny
  else if (a.win && a.deny && !h.deny && !h.win && a2.deny && a.future2Same && allHuD.length) status = '' //             win&deny, random,   2SameDeny, deny
  else if (a.win && a.deny && !h.deny && !h.win && !a2.win && !a2.deny && a.future2Same && allHuD.length) status = '' // win&deny, random, 2SameRandom, deny
  else if (a.win && h.win && a2.deny && a.future2Same && allHuD.length) status = '' //                                        win,    win,   2SameDeny, deny
  else if (a.win && h.win && !a2.win && !a2.deny && a.future2Same && allHuD.length) status = '' //                            win,    win, 2SameRandom, deny
  else if (a.win && h.deny && a2.deny && a.future2Same && allHuD.length) status = '' //                                       win,   deny,   2SameDeny, deny
  else if (a.win && h.deny && !a2.win && !a2.deny && a.future2Same && allHuD.length) status = '' //                           win,   deny, 2SameRandom, deny
  else if (a.win && !h.deny && !h.win && a2.deny && a.future2Same && allHuD.length) status = '' //                            win, random,   2SameDeny, deny
  else if (a.win && !h.deny && !h.win && !a2.win && !a2.deny && a.future2Same && allHuD.length) status = '' //                win, random, 2SameRandom, deny
  else if (a.deny && h.win && a2.deny && a.future2Same && allHuD.length) status = '' //                                      deny,    win,   2SameDeny, deny
  else if (a.deny && h.win && !a2.win && !a2.deny && a.future2Same && allHuD.length) status = '' //                          deny,    win, 2SameRandom, deny
  else if (a.deny && h.deny && a2.deny && a.future2Same && allHuD.length) status = '' //                                     deny,   deny,   2SameDeny, deny
  else if (a.deny && h.deny && !a2.win && !a2.deny && a.future2Same && allHuD.length) status = '' //                         deny,   deny, 2SameRandom, deny
  else if (a.deny && !h.deny && !h.win && a2.deny && a.future2Same && allHuD.length) status = '' //                          deny, random,   2SameDeny, deny
  else if (a.deny && !h.deny && !h.win && !a2.win && !a2.deny && a.future2Same && allHuD.length) status = '' //              deny, random, 2SameRandom, deny
  else if (!a.win && !a.deny && h.win && a2.deny && a.future2Same && allHuD.length) status = '' //                         random,    win,   2SameDeny, deny
  else if (!a.win && !a.deny && h.win && !a2.win && !a2.deny && a.future2Same && allHuD.length) status = '' //             random,    win, 2SameRandom, deny
  else if (!a.win && !a.deny && h.deny && a2.deny && a.future2Same && allHuD.length) status = '' //                        random,   deny,   2SameDeny, deny
  else if (!a.win && !a.deny && h.deny && !a2.win && !a2.deny && a.future2Same && allHuD.length) status = '' //            random,   deny, 2SameRandom, deny
  else if (!a.win && !a.deny && !h.deny && !h.win && a2.deny && a.future2Same && allHuD.length) status = '' //             random, random,   2SameDeny, deny
  else if (!a.win && !a.deny && !h.deny && !h.win && !a2.win && !a2.deny && a.future2Same && allHuD.length) status = '' // random, random, 2SameRandom, deny

  //             //                //               //               //              //

  else if (a.win && a.deny && h.win && a2.deny && a.future2Same && !allHuD.length && !allHuW.length) status = '' //                         win&deny,    win,   2SameDeny, random
  else if (a.win && a.deny && h.win && !a2.win && !a2.deny && a.future2Same && !allHuD.length && !allHuW.length) status = '' //             win&deny,    win, 2SameRandom, random
  else if (a.win && a.deny && h.deny && a2.deny && a.future2Same && !allHuD.length && !allHuW.length) status = '' //                        win&deny,   deny,   2SameDeny, random
  else if (a.win && a.deny && h.deny && !a2.win && !a2.deny && a.future2Same && !allHuD.length && !allHuW.length) status = '' //            win&deny,   deny, 2SameRandom, random
  else if (a.win && a.deny && !h.deny && !h.win && a2.deny && a.future2Same && !allHuD.length && !allHuW.length) status = '' //             win&deny, random,   2SameDeny, random
  else if (a.win && a.deny && !h.deny && !h.win && !a2.win && !a2.deny && a.future2Same && !allHuD.length && !allHuW.length) status = '' // win&deny, random, 2SameRandom, random
  else if (a.win && h.win && a2.deny && a.future2Same && !allHuD.length && !allHuW.length) status = '' //                                        win,    win,   2SameDeny, random
  else if (a.win && h.win && !a2.win && !a2.deny && a.future2Same && !allHuD.length && !allHuW.length) status = '' //                            win,    win, 2SameRandom, random
  else if (a.win && h.deny && a2.deny && a.future2Same && !allHuD.length && !allHuW.length) status = '' //                                       win,   deny,   2SameDeny, random
  else if (a.win && h.deny && !a2.win && !a2.deny && a.future2Same && !allHuD.length && !allHuW.length) status = '' //                           win,   deny, 2SameRandom, random
  else if (a.win && !h.deny && !h.win && a2.deny && a.future2Same && !allHuD.length && !allHuW.length) status = '' //                            win, random,   2SameDeny, random
  else if (a.win && !h.deny && !h.win && !a2.win && !a2.deny && a.future2Same && !allHuD.length && !allHuW.length) status = '' //                win, random, 2SameRandom, random
  else if (a.deny && h.win && a2.deny && a.future2Same && !allHuD.length && !allHuW.length) status = '' //                                      deny,    win,   2SameDeny, random
  else if (a.deny && h.win && !a2.win && !a2.deny && a.future2Same && !allHuD.length && !allHuW.length) status = '' //                          deny,    win, 2SameRandom, random
  else if (a.deny && h.deny && a2.deny && a.future2Same && !allHuD.length && !allHuW.length) status = '' //                                     deny,   deny,   2SameDeny, random
  else if (a.deny && h.deny && !a2.win && !a2.deny && a.future2Same && !allHuD.length && !allHuW.length) status = '' //                         deny,   deny, 2SameRandom, random
  else if (a.deny && !h.deny && !h.win && a2.deny && a.future2Same && !allHuD.length && !allHuW.length) status = '' //                          deny, random,   2SameDeny, random
  else if (a.deny && !h.deny && !h.win && !a2.win && !a2.deny && a.future2Same && !allHuD.length && !allHuW.length) status = '' //              deny, random, 2SameRandom, random
  else if (!a.win && !a.deny && h.win && a2.deny && a.future2Same && !allHuD.length && !allHuW.length) status = '' //                         random,    win,   2SameDeny, random
  else if (!a.win && !a.deny && h.win && !a2.win && !a2.deny && a.future2Same && !allHuD.length && !allHuW.length) status = '' //             random,    win, 2SameRandom, random
  else if (!a.win && !a.deny && h.deny && a2.deny && a.future2Same && !allHuD.length && !allHuW.length) status = '' //                        random,   deny,   2SameDeny, random
  else if (!a.win && !a.deny && h.deny && !a2.win && !a2.deny && a.future2Same && !allHuD.length && !allHuW.length) status = '' //            random,   deny, 2SameRandom, random
  else if (!a.win && !a.deny && !h.deny && !h.win && a2.deny && a.future2Same && !allHuD.length && !allHuW.length) status = '' //             random, random,   2SameDeny, random
  else if (!a.win && !a.deny && !h.deny && !h.win && !a2.win && !a2.deny && a.future2Same && !allHuD.length && !allHuW.length) status = '' // random, random, 2SameRandom, random

  if (typeof status === 'string') a[status] = true
}

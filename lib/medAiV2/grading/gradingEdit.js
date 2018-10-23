export const gradeFuture2DeadOr2Same = (a, h, a2, huVics, allHuW, allHuD, couldBeDenied, couldBeWon) => {
  let status

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
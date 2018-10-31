export const isMoveHarikari = (aiDb, toPlay, x, allOpVics, boo) => {
  let vic
  boo ? vic = 'humanVic' : vic = 'victory'
  let opVics = 0
  if (x.sends2Same && x[vic] && allOpVics === 1 && x.win) x.victoryDeny = true
  else if (x.sends2Same && !x[vic] && allOpVics > 0 && x.win) x.harikari = true
  else if (x.sends2Dead && !x[vic] && allOpVics > 0) x.harikari = true
  else if (x.sends2Dead && x[vic] && allOpVics > 1) x.harikari = true
  else if (x.sends2Dead && x[vic] && allOpVics < 2) x.victoryDeny = true
  else {
    for (let i = 0; i < 9; i++) {
      if (aiDb[toPlay][i][vic]) {
        opVics++
      }
    }
    if (x.sends2Same && x[vic] && opVics === 1) x.victoryDeny = true
    if (x.sends2Same && x[vic] && opVics > 1) x.harikari = true
    else if (x.sends2Same && !x[vic] && opVics > 0) x.harikari = true
    else if (opVics > 0) x.harikari = true
  }
}

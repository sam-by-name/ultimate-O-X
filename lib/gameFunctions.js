export const createObj = (mini, cell, player) => {
  return {
    big: Number(mini),
    small: Number(cell),
    isAlive: false,
    isPlayable: true,
    lastTaken: true,
    lastTakenStyle: {backgroundColor: player.color, color: 'lime'},
    takenBy: player.name,
    playerSymbol: player.symbol,
    wonBy: '',
    style: {backgroundColor: player.color, color: `dark${player.color}`}
  }
}

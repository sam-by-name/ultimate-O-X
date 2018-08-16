export const createObj = (mini, cell, player) => {
  return {
    big: Number(mini),
    small: Number(cell),
    isAlive: false,
    isPlayable: true,
    boundaryStyle: {border: '10px solid #0E0B16'},
    lastTaken: true,
    lastTakenStyle: {backgroundColor: player.color, color: 'lime'},
    takenBy: player.name,
    wonBy: '',
    winColor: {backgroundColor: '#0E0B16'},
    playerSymbol: player.symbol,
    style: {backgroundColor: player.color, color: `dark${player.color}`}
  }
}

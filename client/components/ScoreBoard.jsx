import React from 'react'

const ScoreBoard = (props) => {
  let state = props.mainState
  return (
    <div>
      <h2 style={state.style1}>
        Player 1: {state.player1.name}
      </h2>
      <p>Score: {state.player1.score}</p>
      <h2 style={state.style2}>
        Player 2: {state.player2.name}
      </h2>
      <p>Score: {state.player2.score}</p>
    </div>
  )
}

export default ScoreBoard

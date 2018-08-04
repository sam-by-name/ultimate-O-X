import React from 'react'

const ScoreBoard = (props) => {
  let state = props.mainState
  return (
    <div>
      <h2 style={state.style1}>
        {state.player1.name}
      </h2>
      <h2 style={state.style2}>
        {state.player2.name}
      </h2>
    </div>
  )
}

export default ScoreBoard

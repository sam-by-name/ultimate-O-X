import React from 'react'

const ScoreBoard = (props) => {
  let state = props.mainState
  return (
    <div className='scoreBoard'>
      <div className='player1'>
        <h2 style={state.style1}>
          {state.player1.name}
        </h2>
        <p>{state.player1.score}</p>
      </div>
      <div className='player2'>
        <h2 style={state.style2}>
          {state.player2.name}
        </h2>
        <p>{state.player2.score}</p>
      </div>
    </div>
  )
}

export default ScoreBoard

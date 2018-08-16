import React from 'react'

const ScoreBoard = (props) => {
  let state = props.mainState
  return (
    <div className='scoreBoard'>
      <span className='player1'>
        <h2 style={state.style1}>
          {state.player1.name}
        </h2>
        <p>{state.player1.score}</p>
      </span>
      <div className='backOneCont'>
        <button className=' btn backOne' onClick={props.mainState.backTrack}>
        BackOne
        </button>
      </div>
      <span className='player2'>
        <h2 style={state.style2}>
          {state.player2.name}
        </h2>
        <p>{state.player2.score}</p>
      </span>
    </div>
  )
}

export default ScoreBoard

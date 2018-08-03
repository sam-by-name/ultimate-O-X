import React from 'react'

const MiniBoard = (props) => {
  return (
    <div className='miniBoard'>
      <div className='topRow'>
        <div onClick={props.handleClick} value={0} className='cell c0'></div>
        <div onClick={props.handleClick} value={1} className='cell c1'></div>
        <div onClick={props.handleClick} value={2} className='cell c2'></div>
      </div>
      <div className='clear'></div>
      <div className='midRow'>
        <div onClick={props.handleClick} value={3} className='cell c3'></div>
        <div onClick={props.handleClick} value={4} className='cell c4'></div>
        <div onClick={props.handleClick} value={5} className='cell c5'></div>
      </div>
      <div className='clear'></div>
      <div className='botRow'>
        <div onClick={props.handleClick} value={6} className='cell c6'></div>
        <div onClick={props.handleClick} value={7} className='cell c7'></div>
        <div onClick={props.handleClick} value={8} className='cell c8'></div>
      </div>
      <div className='clear'></div>
    </div>
  )
}

export default MiniBoard

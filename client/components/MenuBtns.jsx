import React from 'react'
import {Link} from 'react-router-dom'

const MenuBtns = (props) => {
  return (
    <div>
      <div className='homeBtn'>
        <Link to='/menu/player-select'>
          <button name='pVp' className='button' onMouseMove={props.mouseOver} onClick={props.handleClick}>
            <span>P vs P</span>
          </button>
        </Link>
      </div>
      <div className='homeBtn'>
        <button name='pVai' className='button2' onMouseMove={props.mouseOver2} onClick={props.handleClick}>
          <span>P vs Ai</span>
        </button>
      </div>
      <div className='homeBtn'>
        <button className='button3' onMouseMove={props.mouseOver3}>
          <span>Tutorial</span>
        </button>
      </div>
    </div>
  )
}

export default MenuBtns

import React from 'react'
import {Link} from 'react-router-dom'

const AiChoice = (props) => {
  return (
    <div>
      <div className='homeBtn'>
        <Link to='/menu/player-select'>
          <button name='easy' className='button' onMouseMove={props.mouseOver} onClick={props.handleClick}>
            <span>Easy</span>
          </button>
        </Link>
      </div>
      <div className='homeBtn'>
        <Link to='/menu/player-select'>
          <button name='medium' className='button2' onMouseMove={props.mouseOver2} onClick={props.handleClick}>
            <span>Medium</span>
          </button>
        </Link>
      </div>
      <div className='homeBtn'>
        <button className='button3' onMouseMove={props.mouseOver3} onClick={props.menuToggle}>
          <span>Back</span>
        </button>
      </div>
    </div>
  )
}

export default AiChoice

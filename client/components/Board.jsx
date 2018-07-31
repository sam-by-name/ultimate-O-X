import React from 'react'

class Board extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  render () {
    return (
      <div className='miniBoard'>
        <div className='topRow'>
          <div className='cell'></div>
          <div className='tM cell'></div>
          <div className='cell'></div>
        </div>
        <div className='clear'></div>
        <div className='midRow'>
          <div className='mL cell'></div>
          <div className='mM cell'></div>
          <div className='mR cell'></div>
        </div>
        <div className='clear'></div>
        <div className='botRow'>
          <div className='cell'></div>
          <div className='bM cell'></div>
          <div className='cell'></div>
        </div>
        <div className='clear'></div>
      </div>
    )
  }
}

export default Board

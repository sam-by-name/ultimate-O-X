import React from 'react'

class Board extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  render () {
    return (
      <div className='mainBoard'>
        <div className='TopRow'>
          <div className='tL cell'>x</div>
          <div className='tM cell'>x</div>
          <div className='tR cell'>x</div>
        </div>
        <div className='clear'></div>
        <div className='MidRow'>
          <div className='mL cell'>x</div>
          <div className='mM cell'>x</div>
          <div className='mR cell'>x</div>
        </div>
        <div className='clear'></div>
        <div className='BotRow'>
          <div className='bL cell'>x</div>
          <div className='bM cell'>x</div>
          <div className='bR cell'>x</div>
        </div>
        <div className='clear'></div>
      </div>
    )
  }
}

export default Board

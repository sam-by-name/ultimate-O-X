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
          <div className='tL'>x</div>
          <div className='tM'>x</div>
          <div className='tR'>x</div>
        </div>
        <div className='clear'></div>
        <div className='MidRow'>
          <div className='mL'>x</div>
          <div className='mM'>x</div>
          <div className='mR'>x</div>
        </div>
        <div className='clear'></div>
        <div className='BotRow'>
          <div className='bL'>x</div>
          <div className='bM'>x</div>
          <div className='bR'>x</div>
        </div>
        <div className='clear'></div>
      </div>
    )
  }
}

export default Board

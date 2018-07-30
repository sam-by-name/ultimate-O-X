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
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className='MidRow'>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className='BotRow'>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    )
  }
}

export default Board

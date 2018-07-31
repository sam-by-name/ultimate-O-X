import React from 'react'

import Board from './Board'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  render () {
    return (
      <div className='mainBoard'>
        <div className='topRow'>
          <Board />
          <Board />
          <Board />
        </div>
        <div className='clear'></div>
        <div className='midRow'>
          <Board />
          <Board />
          <Board />
        </div>
        <div className='clear'></div>
        <div className='botRow'>
          <Board />
          <Board />
          <Board />
        </div>
        <div className='clear'></div>
      </div>
    )
  }
}

export default App

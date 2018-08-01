import React from 'react'

import Board from './Board'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      player: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    if (!this.state.player) {
      this.setState({
        player: true
      })
    } else {
      this.setState({
        player: false
      })
    }
  }

  render () {
    return (
      <div onClick={this.handleClick} className='mainBoard'>
        <div className='topRow'>
          <div className='fl'><Board player={this.state.player}/></div>
          <div className='fl tM'><Board /></div>
          <div className='fl'><Board /></div>
        </div>
        <div className='clear'></div>
        <div className='midRow'>
          <div className='fl mL'><Board /></div>
          <div className='fl mM'><Board /></div>
          <div className='fl mR'><Board /></div>
        </div>
        <div className='clear'></div>
        <div className='botRow'>
          <div className='fl'><Board /></div>
          <div className='fl bM'><Board /></div>
          <div className='fl'><Board /></div>
        </div>
        <div className='clear'></div>
      </div>
    )
  }
}

export default App

import React, {Component} from 'react'
import Board from './Board'

class MainBoard extends Component {
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
    let player = this.state.player
    return (
      <div onClick={this.handleClick} className='mainBoard'>
        <div className='topRow'>
          <div className='fl'>   <Board player={player} /></div>
          <div className='fl tM'><Board player={player} /></div>
          <div className='fl'>   <Board player={player} /></div>
        </div>
        <div className='clear'></div>
        <div className='midRow'>
          <div className='fl mL'><Board player={player} /></div>
          <div className='fl mM'><Board player={player} /></div>
          <div className='fl mR'><Board player={player} /></div>
        </div>
        <div className='clear'></div>
        <div className='botRow'>
          <div className='fl'>   <Board player={player} /></div>
          <div className='fl bM'><Board player={player} /></div>
          <div className='fl'>   <Board player={player} /></div>
        </div>
        <div className='clear'></div>
      </div>
    )
  }
}

export default MainBoard

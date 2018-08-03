import React, {Component} from 'react'
import MiniBoard from './MiniBoard'
import gameArr from '../../lib/gameArr'

class MainBoard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      gameArr: gameArr
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    if (this.props.player) {
      return (
        e.target.style.backgroundColor = 'red'
      )
    } else {
      return (
        e.target.style.backgroundColor = 'blue'
      )
    }
  }

  render () {
    return (
      <div className='mainBoard'>
        <div className='topRow'>
          <div className='c0'> <MiniBoard handleClick={this.handleClick} value={0} /></div>
          <div className='c1'><MiniBoard handleClick={this.handleClick} value={1} /></div>
          <div className='c2'> <MiniBoard handleClick={this.handleClick} value={2} /></div>
        </div>
        <div className='clear'></div>
        <div className='midRow'>
          <div className='c3'><MiniBoard handleClick={this.handleClick} value={3} /></div>
          <div className='c4'><MiniBoard handleClick={this.handleClick} value={4} /></div>
          <div className='c5'><MiniBoard handleClick={this.handleClick} value={5} /></div>
        </div>
        <div className='clear'></div>
        <div className='botRow'>
          <div className='c6'> <MiniBoard handleClick={this.handleClick} value={6} /></div>
          <div className='c7'><MiniBoard handleClick={this.handleClick} value={7} /></div>
          <div className='c8'> <MiniBoard handleClick={this.handleClick} value={8} /></div>
        </div>
        <div className='clear'></div>
      </div>
    )
  }
}

export default MainBoard

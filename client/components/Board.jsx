import React, {Component} from 'react'

class Board extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick (e) {
    if (this.props.player === false) {
      return (
        e.target.style.backgroundColor = 'red'
      )
    } else if (this.props.player === true) {
      return (
        e.target.style.backgroundColor = 'blue'
      )
    }
  }
  render () {
    return (
      <div className='miniBoard'>
        <div className='topRow'>
          <div onClick={this.handleClick} className='cell'></div>
          <div onClick={this.handleClick} className='tM cell'></div>
          <div onClick={this.handleClick} className='cell'></div>
        </div>
        <div className='clear'></div>
        <div className='midRow'>
          <div onClick={this.handleClick} className='mL cell'></div>
          <div onClick={this.handleClick} className='mM cell'></div>
          <div onClick={this.handleClick} className='mR cell'></div>
        </div>
        <div className='clear'></div>
        <div className='botRow'>
          <div onClick={this.handleClick} className='cell'></div>
          <div onClick={this.handleClick} className='bM cell'></div>
          <div onClick={this.handleClick} className='cell'></div>
        </div>
        <div className='clear'></div>
      </div>
    )
  }
}

export default Board

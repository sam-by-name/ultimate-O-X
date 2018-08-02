import React, {Component} from 'react'

class MiniBoard extends Component {
  constructor (props) {
    super(props)
    this.state = {

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
      <div className='miniBoard'>
        <div className='topRow'>
          <div onClick={this.handleClick} value={0} className='cell'></div>
          <div onClick={this.handleClick} value={1} className='tM cell'></div>
          <div onClick={this.handleClick} value={2} className='cell'></div>
        </div>
        <div className='clear'></div>
        <div className='midRow'>
          <div onClick={this.handleClick} value={3} className='mL cell'></div>
          <div onClick={this.handleClick} value={4} className='mM cell'></div>
          <div onClick={this.handleClick} value={5} className='mR cell'></div>
        </div>
        <div className='clear'></div>
        <div className='botRow'>
          <div onClick={this.handleClick} value={6} className='cell'></div>
          <div onClick={this.handleClick} value={7} className='bM cell'></div>
          <div onClick={this.handleClick} value={8} className='cell'></div>
        </div>
        <div className='clear'></div>
      </div>
    )
  }
}

export default MiniBoard

import React, {Component} from 'react'
import {gameArr} from '../../lib/gameArr'

class MainBoard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      gameArr: gameArr
    }
    this.handleClick = this.handleClick.bind(this)
    this.backgroundStyle = this.backgroundStyle.bind(this)
    this.gameArrEdit = this.gameArrEdit.bind(this)
    this.clearLastPlayed = this.clearLastPlayed.bind(this)
  }

  handleClick (e) {
    this.backgroundStyle(e)
    let state = this.props.state
    this.clearLastPlayed()
    if (this.props.state.player) {
      this.gameArrEdit(e, state.player1)
    } else {
      this.gameArrEdit(e, state.player2)
    }
  }

  clearLastPlayed () {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        gameArr[i][j].lastTaken = false
      }
    }
  }

  gameArrEdit (e, player) {
    let mini = e.target.getAttribute('name')
    let cell = e.target.getAttribute('value')
    gameArr[mini][cell] = {
      isAlive: false,
      isPlayable: false,
      takenBy: player,
      lastTaken: true
    }
  }

  backgroundStyle (e) {
    if (this.props.state.player) {
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
        <div className='c0'>
          <div className='miniBoard'>
            <div onClick={this.handleClick} name={0} value={0} className='cell c0'></div>
            <div onClick={this.handleClick} name={0} value={1} className='cell c1'></div>
            <div onClick={this.handleClick} name={0} value={2} className='cell c2'></div>
            <div className='clear'></div>
            <div onClick={this.handleClick} name={0} value={3} className='cell c3'></div>
            <div onClick={this.handleClick} name={0} value={4} className='cell c4'></div>
            <div onClick={this.handleClick} name={0} value={5} className='cell c5'></div>
            <div className='clear'></div>
            <div onClick={this.handleClick} name={0} value={6} className='cell c6'></div>
            <div onClick={this.handleClick} name={0} value={7} className='cell c7'></div>
            <div onClick={this.handleClick} name={0} value={8} className='cell c8'></div>
            <div className='clear'></div>
          </div>
        </div>
        <div className='c1'>
          <div className='miniBoard'>
            <div onClick={this.handleClick} name={1} value={0} className='cell c0'></div>
            <div onClick={this.handleClick} name={1} value={1} className='cell c1'></div>
            <div onClick={this.handleClick} name={1} value={2} className='cell c2'></div>
            <div className='clear'></div>
            <div onClick={this.handleClick} name={1} value={3} className='cell c3'></div>
            <div onClick={this.handleClick} name={1} value={4} className='cell c4'></div>
            <div onClick={this.handleClick} name={1} value={5} className='cell c5'></div>
            <div className='clear'></div>
            <div onClick={this.handleClick} name={1} value={6} className='cell c6'></div>
            <div onClick={this.handleClick} name={1} value={7} className='cell c7'></div>
            <div onClick={this.handleClick} name={1} value={8} className='cell c8'></div>
            <div className='clear'></div>
          </div>
        </div>
        <div className='c2'>
          <div className='miniBoard'>
            <div onClick={this.handleClick} name={2} value={0} className='cell c0'></div>
            <div onClick={this.handleClick} name={2} value={1} className='cell c1'></div>
            <div onClick={this.handleClick} name={2} value={2} className='cell c2'></div>
            <div className='clear'></div>
            <div onClick={this.handleClick} name={2} value={3} className='cell c3'></div>
            <div onClick={this.handleClick} name={2} value={4} className='cell c4'></div>
            <div onClick={this.handleClick} name={2} value={5} className='cell c5'></div>
            <div className='clear'></div>
            <div onClick={this.handleClick} name={2} value={6} className='cell c6'></div>
            <div onClick={this.handleClick} name={2} value={7} className='cell c7'></div>
            <div onClick={this.handleClick} name={2} value={8} className='cell c8'></div>
            <div className='clear'></div>
          </div>
        </div>
        <div className='clear'></div>
        <div className='c3'>
          <div className='miniBoard'>
            <div onClick={this.handleClick} name={3} value={0} className='cell c0'></div>
            <div onClick={this.handleClick} name={3} value={1} className='cell c1'></div>
            <div onClick={this.handleClick} name={3} value={2} className='cell c2'></div>
            <div className='clear'></div>
            <div onClick={this.handleClick} name={3} value={3} className='cell c3'></div>
            <div onClick={this.handleClick} name={3} value={4} className='cell c4'></div>
            <div onClick={this.handleClick} name={3} value={5} className='cell c5'></div>
            <div className='clear'></div>
            <div onClick={this.handleClick} name={3} value={6} className='cell c6'></div>
            <div onClick={this.handleClick} name={3} value={7} className='cell c7'></div>
            <div onClick={this.handleClick} name={3} value={8} className='cell c8'></div>
            <div className='clear'></div>
          </div>
        </div>
        <div className='c4'>
          <div className='miniBoard'>
            <div onClick={this.handleClick} name={4} value={0} className='cell c0'></div>
            <div onClick={this.handleClick} name={4} value={1} className='cell c1'></div>
            <div onClick={this.handleClick} name={4} value={2} className='cell c2'></div>
            <div className='clear'></div>
            <div onClick={this.handleClick} name={4} value={3} className='cell c3'></div>
            <div onClick={this.handleClick} name={4} value={4} className='cell c4'></div>
            <div onClick={this.handleClick} name={4} value={5} className='cell c5'></div>
            <div className='clear'></div>
            <div onClick={this.handleClick} name={4} value={6} className='cell c6'></div>
            <div onClick={this.handleClick} name={4} value={7} className='cell c7'></div>
            <div onClick={this.handleClick} name={4} value={8} className='cell c8'></div>
            <div className='clear'></div>
          </div>
        </div>
        <div className='c5'>
          <div className='miniBoard'>
            <div onClick={this.handleClick} name={5} value={0} className='cell c0'></div>
            <div onClick={this.handleClick} name={5} value={1} className='cell c1'></div>
            <div onClick={this.handleClick} name={5} value={2} className='cell c2'></div>
            <div className='clear'></div>
            <div onClick={this.handleClick} name={5} value={3} className='cell c3'></div>
            <div onClick={this.handleClick} name={5} value={4} className='cell c4'></div>
            <div onClick={this.handleClick} name={5} value={5} className='cell c5'></div>
            <div className='clear'></div>
            <div onClick={this.handleClick} name={5} value={6} className='cell c6'></div>
            <div onClick={this.handleClick} name={5} value={7} className='cell c7'></div>
            <div onClick={this.handleClick} name={5} value={8} className='cell c8'></div>
            <div className='clear'></div>
          </div>
        </div>
        <div className='clear'></div>
        <div className='c6'>
          <div className='miniBoard'>
            <div onClick={this.handleClick} name={6} value={0} className='cell c0'></div>
            <div onClick={this.handleClick} name={6} value={1} className='cell c1'></div>
            <div onClick={this.handleClick} name={6} value={2} className='cell c2'></div>
            <div className='clear'></div>
            <div onClick={this.handleClick} name={6} value={3} className='cell c3'></div>
            <div onClick={this.handleClick} name={6} value={4} className='cell c4'></div>
            <div onClick={this.handleClick} name={6} value={5} className='cell c5'></div>
            <div className='clear'></div>
            <div onClick={this.handleClick} name={6} value={6} className='cell c6'></div>
            <div onClick={this.handleClick} name={6} value={7} className='cell c7'></div>
            <div onClick={this.handleClick} name={6} value={8} className='cell c8'></div>
            <div className='clear'></div>
          </div>
        </div>
        <div className='c7'>
          <div className='miniBoard'>
            <div onClick={this.handleClick} name={7} value={0} className='cell c0'></div>
            <div onClick={this.handleClick} name={7} value={1} className='cell c1'></div>
            <div onClick={this.handleClick} name={7} value={2} className='cell c2'></div>
            <div className='clear'></div>
            <div onClick={this.handleClick} name={7} value={3} className='cell c3'></div>
            <div onClick={this.handleClick} name={7} value={4} className='cell c4'></div>
            <div onClick={this.handleClick} name={7} value={5} className='cell c5'></div>
            <div className='clear'></div>
            <div onClick={this.handleClick} name={7} value={6} className='cell c6'></div>
            <div onClick={this.handleClick} name={7} value={7} className='cell c7'></div>
            <div onClick={this.handleClick} name={7} value={8} className='cell c8'></div>
            <div className='clear'></div>
          </div>
        </div>
        <div className='c8'>
          <div className='miniBoard'>
            <div onClick={this.handleClick} name={8} value={0} className='cell c0'></div>
            <div onClick={this.handleClick} name={8} value={1} className='cell c1'></div>
            <div onClick={this.handleClick} name={8} value={2} className='cell c2'></div>
            <div className='clear'></div>
            <div onClick={this.handleClick} name={8} value={3} className='cell c3'></div>
            <div onClick={this.handleClick} name={8} value={4} className='cell c4'></div>
            <div onClick={this.handleClick} name={8} value={5} className='cell c5'></div>
            <div className='clear'></div>
            <div onClick={this.handleClick} name={8} value={6} className='cell c6'></div>
            <div onClick={this.handleClick} name={8} value={7} className='cell c7'></div>
            <div onClick={this.handleClick} name={8} value={8} className='cell c8'></div>
            <div className='clear'></div>
          </div>
        </div>
        <div className='clear'></div>
      </div>
    )
  }
}

export default MainBoard

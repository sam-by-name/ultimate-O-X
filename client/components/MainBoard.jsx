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
    this.clearLastTaken = this.clearLastTaken.bind(this)
    this.checkForWin = this.checkForWin.bind(this)
    this.checkForVictory = this.checkForVictory.bind(this)
    this.makesOutOfBounds = this.makesOutOfBounds.bind(this)
    this.miniGameWonBy = this.miniGameWonBy.bind(this)
  }

  handleClick (e) {
    let state = this.props.state
    this.clearLastTaken()
    if (state.player) {
      this.gameArrEdit(e, state.player1)
    } else {
      this.gameArrEdit(e, state.player2)
    }
  }

  clearLastTaken () {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        gameArr[i][j].lastTaken = false
      }
    }
  }

  gameArrEdit (e, player) {
    let mini = e.target.getAttribute('name')
    let cell = e.target.getAttribute('value')
    let arr = gameArr[mini][cell]
    if (arr.isAlive && arr.isPlayable && arr.wonBy === '') {
      gameArr[mini][cell] = {
        isAlive: false,
        isPlayable: true,
        takenBy: player.name,
        wonBy: '',
        lastTaken: true
      }
      this.props.handleClick()
      this.backgroundStyle(e)
      this.checkForWin(mini, player)
      this.makesOutOfBounds(cell)
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

  checkForWin (mini, player) {
    const win = ['012', '048', '036', '345', '147', '258', '246', '678']
    let temp = ''
    for (let i = 0; i < win.length; i++) {
      for (let j = 0; j < 9; j++) {
        if ((gameArr[mini][j].takenBy === player.name) &&
          (j === win[i][0] || win[i][1] || win[i][2])) {
          temp += `${j}`
        }
      }
      if (temp === win[i]) {
        this.miniGameWonBy(mini, player)
        this.checkForVictory(player, win, temp)
        return (document.getElementsByClassName(`w${mini}`)[0].style.backgroundColor =
          `dark${player.color}`)
      } else { temp = '' }
    }
  }

  miniGameWonBy (mini, player) {
    this.props.handleScore(player)
    for (let i = 0; i < 9; i++) {
      gameArr[mini][i].wonBy = player.name
    }
  }

  checkForVictory (player, win, temp) {
    for (let i = 0; i < win.length; i++) {
      for (let j = 0; j < 9; j++) {
        if ((gameArr[j][0].wonBy === player.name) &&
          (j === win[i][0] || win[i][1] || win[i][2])) {
          temp += `${j}`
        }
      }
      if (temp === win[i]) {
        return (document.getElementsByClassName('mainBoard')[0].style.backgroundColor =
          `dark${player.color}`)
      } else { temp = '' }
    }
  }

  makesOutOfBounds (cell) {
    let boo1 = false
    let boo2 = true
    if (gameArr[cell][0].wonBy !== '') {
      boo1 = true
      boo2 = false
    }
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (i !== Number(cell)) {
          gameArr[i][j].isPlayable = boo1
        } else {
          gameArr[i][j].isPlayable = boo2
        }
      }
    }
  }

  render () {
    return (
      <div className='mainBoard'>
        <div className='c0 w0'>
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
        <div className='c1 w1'>
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
        <div className='c2 w2'>
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
        <div className='c3 w3'>
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
        <div className='c4 w4'>
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
        <div className='c5 w5'>
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
        <div className='c6 w6'>
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
        <div className='c7 w7'>
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
        <div className='c8 w8'>
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

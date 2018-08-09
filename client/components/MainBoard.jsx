import React, {Component} from 'react'
import {mainArr, cloneArr} from '../../lib/mainArr'

class MainBoard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cloneArr: cloneArr
    }
  }
  
  handleClick = (e) => {
    let state = this.props.state
    this.clearLastTaken()
    if (state.player) {
      this.cloneArrEdit(e, state.player1)
    } else {
      this.cloneArrEdit(e, state.player2)
    }
  }

  clearLastTaken = () => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        this.state.cloneArr[i][j].lastTaken = false
      }
    }
  }

  cloneArrEdit = (e, player) => {
    let mini = e.target.getAttribute('name')
    let cell = e.target.getAttribute('value')
    let arr = this.state.cloneArr[mini][cell]
    if (arr.isAlive && arr.isPlayable && arr.wonBy === '') {
      this.state.cloneArr[mini][cell] = {
        bigGrid: Number(mini),
        littleGrid: Number(cell),
        isAlive: false,
        isPlayable: true,
        takenBy: player.name,
        playerSymbol: player.symbol,
        wonBy: '',
        winColor: {backgroundColor: 'white'},
        lastTaken: true,
        style: {backgroundColor: player.color, color: `dark${player.color}`}
      }
      this.props.handleClick()
      this.checkForWin(mini, player)
      this.makesOutOfBounds(cell)
    }
  }

  checkForWin = (mini, player) => {
    const win = ['012', '048', '036', '345', '147', '258', '246', '678']
    let temp = ''
    for (let i = 0; i < win.length; i++) {
      for (let j = 0; j < 9; j++) {
        if ((this.state.cloneArr[mini][j].takenBy === player.name) &&
          (j === win[i][0] || win[i][1] || win[i][2])) {
          temp += `${j}`
        }
      }
      if (temp === win[i]) {
        this.miniGameWonBy(mini, player)
        this.checkForVictory(player, win, temp)
      } else { temp = '' }
    }
  }

  miniGameWonBy = (mini, player) => {
    this.props.handleScore(player)
    for (let i = 0; i < 9; i++) {
      this.state.cloneArr[mini][i].wonBy = player.name
      this.state.cloneArr[mini][i].winColor = {backgroundColor: `dark${player.color}`}
    }
  }

  checkForVictory = (player, win, temp) => {
    for (let i = 0; i < win.length; i++) {
      for (let j = 0; j < 9; j++) {
        if ((this.state.cloneArr[j][0].wonBy === player.name) &&
          (j === win[i][0] || win[i][1] || win[i][2])) {
          temp += `${j}`
        }
      }
      if (temp === win[i]) {
        document.getElementsByClassName('mainBoard')[0].style.backgroundColor =
          `dark${player.color}`
        this.props.handleVictory(player, this.clearBoard)
      } else { temp = '' }
    }
  }

  clearBoard = () => {
    let newClone = JSON.parse(JSON.stringify(mainArr))
    this.setState({
      cloneArr: newClone
    })
      document.getElementsByClassName('mainBoard')[0].style.backgroundColor =
      'white'
  }

  makesOutOfBounds = (cell) => {
    let boo1 = false
    let boo2 = true
    if (this.state.cloneArr[cell][0].wonBy !== '') {
      boo1 = true
      boo2 = false
    }
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (i !== Number(cell)) {
          this.state.cloneArr[i][j].isPlayable = boo1
        } else {
          this.state.cloneArr[i][j].isPlayable = boo2
        }
      }
    }
  }

  render () {
    return (
      <div className='mainBoard'>
        {this.state.cloneArr.map((miniBoard) => {
          return [
            <div key ={miniBoard[0].bigGrid} style={miniBoard[0].winColor}
            className={`c${miniBoard[0].bigGrid} w${miniBoard[0].bigGrid}`}>
              <div key= {miniBoard[0].bigGrid} className='miniBoard'>
                {miniBoard.map((cell) => {
                  return [
                    <div
                      key= {cell.littleGrid}
                      style={cell.style}
                      onClick={this.handleClick}
                      name={cell.bigGrid}
                      value={cell.littleGrid}
                      className={`cell c${cell.littleGrid}`}
                    >{cell.playerSymbol}</div>,
                    cell.littleGrid === 2 && <div className='clear'/>,
                    cell.littleGrid === 5 && <div className='clear'/>,
                    cell.littleGrid === 8 && <div className='clear'/>
                  ]
                })}
              </div>
            </div>,
            miniBoard[0].bigGrid === 2 && <div className='clear'/>,
            miniBoard[0].bigGrid === 5 && <div className='clear'/>,
            miniBoard[0].bigGrid === 8 && <div className='clear'/>
          ]
        })
        }
      </div>
    )
  }
}

export default MainBoard

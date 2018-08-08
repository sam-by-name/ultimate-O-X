import React, {Component} from 'react'
import {gameArr} from '../../lib/gameArr'

class MainBoard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      gameArr: gameArr
    }
  }

  handleClick = (e) => {
    let state = this.props.state
    this.clearLastTaken()
    if (state.player) {
      this.gameArrEdit(e, state.player1)
    } else {
      this.gameArrEdit(e, state.player2)
    }
  }

  clearLastTaken = () => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        gameArr[i][j].lastTaken = false
      }
    }
  }

  gameArrEdit = (e, player) => {
    let mini = e.target.getAttribute('name')
    let cell = e.target.getAttribute('value')
    let arr = gameArr[mini][cell]
    if (arr.isAlive && arr.isPlayable && arr.wonBy === '') {
      gameArr[mini][cell] = {
        bigGrid: Number(mini),
        littleGrid: Number(cell),
        isAlive: false,
        isPlayable: true,
        takenBy: player.name,
        wonBy: '',
        lastTaken: true
      }
      this.props.handleClick()
      this.backgroundStyle(e, player)
      this.checkForWin(mini, player)
      this.makesOutOfBounds(cell)
    }
  }

  backgroundStyle = (e, player) => {
    let symbol = 'O'
    if (this.props.state.player) {
      symbol = 'X'
    }
    e.target.innerHTML = symbol
    e.target.style.color = `dark${player.color}`
    e.target.style.backgroundColor = player.color
  }

  checkForWin = (mini, player) => {
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

  miniGameWonBy = (mini, player) => {
    this.props.handleScore(player)
    for (let i = 0; i < 9; i++) {
      gameArr[mini][i].wonBy = player.name
    }
  }

  checkForVictory = (player, win, temp) => {
    for (let i = 0; i < win.length; i++) {
      for (let j = 0; j < 9; j++) {
        if ((gameArr[j][0].wonBy === player.name) &&
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
    this.setState({gameArr: gameArr})
    for (let i = 0; i < 9; i++) {
      document.getElementsByClassName(`w${i}`)[0].style.backgroundColor =
      'white'
    }
  }

  makesOutOfBounds = (cell) => {
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
        {this.state.gameArr.map((miniBoard) => {
          return [
            <div key ={miniBoard[0].bigGrid} className={`c${miniBoard[0].bigGrid} w${miniBoard[0].bigGrid}`}>
              <div className='miniBoard'>
                {miniBoard.map((cell) => {
                  return [
                    <div
                      key= {cell.littleGrid}
                      onClick={this.handleClick}
                      name={cell.bigGrid}
                      value={cell.littleGrid}
                      className={`cell c${cell.littleGrid}`}
                    />,
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

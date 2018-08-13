import React, {Component} from 'react'
import {mainArr} from '../../lib/mainArr'

class MainBoard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cloneArr: this.createArr(),
      previousArr: [],
      lastLatLong: {big: 0, small: 0},
      lastTaken: 'white'
    }
  }

  backTrack = () => {
    let previous =  JSON.parse(JSON.stringify(this.state.previousArr))
    let lastState = previous[0]
    previous.shift()
    this.setState({
      cloneArr: lastState,
      previousArr: previous
    })
  }

  createArr = () => {
    return JSON.parse(JSON.stringify(mainArr))
  }
  
  handleClick = (e) => {
    let state = this.props.state
    this.previousArr()
    this.clearLastTaken()
    if (state.player) {
      this.cloneArrEdit(e, state.player1)
    } else {
      this.cloneArrEdit(e, state.player2)
    }
  }
  previousArr = () => {
    let currentArr = JSON.parse(JSON.stringify(this.state.cloneArr))
    let backUpArr = this.state.previousArr
    backUpArr.unshift(currentArr)
    this.setState({
      previousArr: backUpArr
    })
  }

  clearLastTaken = () => {
    let i = this.state.lastLatLong.big
    let j = this.state.lastLatLong.small
      this.state.cloneArr[i][j].style = {
        backgroundColor: this.state.lastTaken,
        color: `dark${this.state.lastTaken}`}
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
        style: {backgroundColor: player.color,
          color: `lime`}
      }
      this.props.handleClick(this.backTrack)
      this.checkForWin(mini, player)
      this.makeOutOfBounds(cell)
      this.lastTaken(mini, cell)
    }
  }

  lastTaken(mini, cell) {
    let lastColor = this.state.cloneArr[mini][cell].style
    this.setState({
      lastLatLong: {big: mini, small: cell},
      lastTaken: lastColor.backgroundColor
    })
  }

  checkForWin = (mini, player) => {
    const win = ['012', '048', '036', '147', '258', '246', '345', '678']
    let temp = ''
    for (let i = 0; i < 9; i++) {
      if (this.state.cloneArr[mini][i].takenBy === player.name) {
        temp += `${i}`
      }
    }
    for (let j = 0; j < win.length; j++) {
      if (temp.includes(win[j][0]) 
        && temp.includes(win[j][1])
        && temp.includes(win[j][2])) {
        this.miniGameWonBy(mini, player)
        this.checkForVictory(player, win)
      }
    }
  }

  miniGameWonBy = (mini, player) => {
    this.props.handleScore(player)
    for (let i = 0; i < 9; i++) {
      this.state.cloneArr[mini][i].wonBy = player.name
      this.state.cloneArr[mini][i].winColor = {backgroundColor: `dark${player.color}`}
      this.state.cloneArr[mini][i].boundaryStyle = {border: `10px solid ${player.color}`}
    }
  }

  checkForVictory = (player, win) => {
    let temp = ''
    for (let i = 0; i < 9; i++) {
      if (this.state.cloneArr[i][0].wonBy === player.name) {
        temp += `${i}`
      }
    }
    for (let j = 0; j < win.length; j++) {
      if (temp.includes(win[j][0]) 
      && temp.includes(win[j][1])
      && temp.includes(win[j][2])) {
        document.getElementsByClassName('mainBoard')[0].style.border =
        `10px solid ${player.color}`
      this.props.handleVictory(player, this.clearBoard)
      }
    }
  }

  clearBoard = () => {
    this.setState({
      cloneArr: this.createArr(),
      lastLatLong: {bigGrid: 0, littleGrid: 0},
      lastTaken: 0
    })
    document.getElementsByClassName('mainBoard')[0].style.border =
    `10px solid white`
  }

  makeOutOfBounds = (cell) => { // makes me cry on the inside, begs for refactor
    let boo1 = false
    let boo2 = true
    let style1 = {border: '10px solid lime'}
    let style2 = {border: '10px solid white'}
    if (this.state.cloneArr[cell][0].wonBy !== '') {
      boo1 = true
      boo2 = false
      style1 = {border: '10px solid white'}
      style2 = {border: '10px solid lime'}
    }
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (i == cell) {
          this.state.cloneArr[i][j].isPlayable = boo2
          this.state.cloneArr[i][j].boundaryStyle = style1
        } else if (this.state.cloneArr[i][j].wonBy !== '') {
          this.state.cloneArr[i][j].isPlayable = boo1
          this.state.cloneArr[i][j].boundaryStyle = {border: '10px solid white'}
        } else {
          this.state.cloneArr[i][j].isPlayable = boo1
          this.state.cloneArr[i][j].boundaryStyle = style2
        }
      }
    }
  }

  render () {
    return (
      <div className='mainBoardCont'>
        <div className='mainBoard'>
          {this.state.cloneArr.map((miniBoard) => {
            return [
              <div key={miniBoard[0].bigGrid} style={miniBoard[0].winColor}
              className={`c${miniBoard[0].bigGrid} w${miniBoard[0].bigGrid} border`}>
                <div key={miniBoard[0].bigGrid} style={miniBoard[0].boundaryStyle} className='miniBoard'>
                  {miniBoard.map((cell) => {
                    return [
                      <div
                        key={cell.littleGrid}
                        style={cell.style}
                        onClick={this.handleClick}
                        name={cell.bigGrid}
                        value={cell.littleGrid}
                        className={`cell c${cell.littleGrid}`}>
                      {cell.playerSymbol}
                      </div>,
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
      </div>
    )
  }
}

export default MainBoard

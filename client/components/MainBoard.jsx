import React, {Component} from 'react'
import {mainArr} from '../../lib/mainArr'

class MainBoard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cloneArr: this.createArr(),
      previousArr: []
    }
  }

  backTrack = () => {
    if (this.state.previousArr.length) { 
      let previous =  JSON.parse(JSON.stringify(this.state.previousArr))
      let lastState = previous[0]
      previous.shift()
      this.props.handleClick(this.backTrack)
      this.setState({
        cloneArr: lastState,
        previousArr: previous
      })
    }
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
    for(let i = 0; i < 9; i++) {
      for(let j = 0; j < 9; j++) {
        if (this.state.cloneArr[i][j].lastTaken)
          return this.state.cloneArr[i][j].lastTaken = false
      }
    }
  }

  cloneArrEdit = (e, player) => {
    let mini = e.target.getAttribute('name')
    let cell = e.target.getAttribute('value')
    let arr = this.state.cloneArr[mini][cell]
    if (arr.isAlive && arr.isPlayable && arr.wonBy === '') {
      this.state.cloneArr[mini][cell] = {
        big: Number(mini),
        small: Number(cell),
        isAlive: false,
        isPlayable: true,
        lastTaken: true,
        lastTakenStyle: {backgroundColor: player.color, color: 'lime'},
        takenBy: player.name,
        playerSymbol: player.symbol,
        wonBy: '',
        style: {backgroundColor: player.color,
          color: `dark${player.color}`}
      }
      this.props.handleClick(this.backTrack)
      this.checkForWin(mini, player)
      this.makeOutOfBounds(cell)
    }
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
      lastLatLong: {big: 0, small: 0},
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
          {this.state.cloneArr.map((mini) => {
            return [
              <div key={mini[0].big} style={mini[0].winColor}
              className={`c${mini[0].big} w${mini[0].big} border`}>
                <div key={mini[0].big} style={mini[0].boundaryStyle} className='miniBoard'>
                  {mini.map((cell) => {
                    return [
                      <div
                        key={cell.small}
                        style={cell.lastTaken ? cell.lastTakenStyle : cell.style}
                        onClick={this.handleClick}
                        name={cell.big}
                        value={cell.small}
                        className={`cell c${cell.small}`}>
                      {cell.playerSymbol}
                      </div>,
                      cell.small === 2 && <div className='clear'/>,
                      cell.small === 5 && <div className='clear'/>,
                      cell.small === 8 && <div className='clear'/>
                    ]
                  })}
                </div>
              </div>,
              mini[0].big === 2 && <div className='clear'/>,
              mini[0].big === 5 && <div className='clear'/>,
              mini[0].big === 8 && <div className='clear'/>
            ]
          })
          }
        </div>
      </div>
    )
  }
}

export default MainBoard

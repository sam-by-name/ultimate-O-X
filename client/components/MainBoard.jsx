import React, {Component} from 'react'
import {createArr, win} from '../../lib/mainArr'

class MainBoard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      clonedArr: createArr(),
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
        clonedArr: lastState,
        previousArr: previous
      })
    }
  }
  
  handleClick = (e) => {
    let mini = e.target.getAttribute('name')
    let cell = e.target.getAttribute('value')
    let state = this.props.state
    let player = {}
    state.player 
      ? player = state.player1
      : player = state.player2
    this.clonedArrEdit(mini, cell, player)
  }
  
  previousArr = () => {
    let currentArr = JSON.parse(JSON.stringify(this.state.clonedArr))
    let backUpArr = this.state.previousArr
    backUpArr.unshift(currentArr)
    this.setState({
      previousArr: backUpArr
    })
  }

  clearLastTaken = () => {
    for(let i = 0; i < 9; i++) {
      for(let j = 0; j < 9; j++) {
        if (this.state.clonedArr[i][j].lastTaken)
          return this.state.clonedArr[i][j].lastTaken = false
      }
    }
  }

  clonedArrEdit = (mini, cell, player) => {
    let arr = this.state.clonedArr[mini][cell]
    if (arr.isAlive && arr.isPlayable && arr.wonBy === '') {
      this.previousArr()
      this.clearLastTaken()
      this.state.clonedArr[mini][cell] = {
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
      this.decideBoundaries(cell)
    }
  }

  checkForWin = (mini, player) => {
    let temp = ''
    for (let i = 0; i < 9; i++) {
      if (this.state.clonedArr[mini][i].takenBy === player.name) {
        temp += `${i}`
      }
    }
    for (let j = 0; j < win.length; j++) {
      if (temp.includes(win[j][0]) 
        && temp.includes(win[j][1])
        && temp.includes(win[j][2])) {
        this.miniGameWonBy(mini, player)
        this.checkForVictory(player)
      }
    }
  }

  miniGameWonBy = (mini, player) => {
    this.props.handleScore(player)
    let arr = this.state.clonedArr[mini]
    for (let i = 0; i < 9; i++) {
      arr[i].wonBy = player.name
      arr[i].winColor = {backgroundColor: `dark${player.color}`}
      arr[i].boundaryStyle = {border: `10px solid ${player.color}`}
    }
  }

  checkForVictory = (player) => {
    let temp = ''
    for (let i = 0; i < 9; i++) {
      if (this.state.clonedArr[i][0].wonBy === player.name) {
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
      clonedArr: createArr()
    })
    document.getElementsByClassName('mainBoard')[0].style.border =
    `10px solid white`
  }

  decideBoundaries = (cell) => {
    let boo1 = false
    let boo2 = true
    let style1 = {border: '10px solid lime'}
    let style2 = {border: '10px solid white'}
    if (this.state.clonedArr[cell][0].wonBy !== '') {
      boo1 = true
      boo2 = false
      style1 = {border: '10px solid white'}
      style2 = {border: '10px solid lime'}
    }
    this.setBoundaries(cell, boo1, boo2, style1, style2)
  }

  setBoundaries = (cell, boo1, boo2, style1, style2) => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (i == cell) {
          this.state.clonedArr[i][j].isPlayable = boo2
          this.state.clonedArr[i][j].boundaryStyle = style1
        } else if (this.state.clonedArr[i][j].wonBy !== '') {
          this.state.clonedArr[i][j].isPlayable = boo1
          this.state.clonedArr[i][j].boundaryStyle = {border: '10px solid white'}
        } else {
          this.state.clonedArr[i][j].isPlayable = boo1
          this.state.clonedArr[i][j].boundaryStyle = style2
        }
      }
    }
  }

  render () {
    return (
      <div className='mainBoardCont'>
        <div className='mainBoard'>
          {this.state.clonedArr.map((mini) => {
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

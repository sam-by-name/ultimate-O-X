import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {generateBoard, win} from '../../lib/gameArrays'
import {easyAi} from '../../lib/ai/easyAi'
import {mediumAiV2} from '../../lib/medAiV2/medAiV2'
import {createObj} from '../../lib/gameFunctions'
import {deepClone} from '../../lib/medAiV2/lib/deepClone'

class MainBoard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      clonedArr: generateBoard(),
      previousArr: []
    }
    this.backTrack = this.backTrack.bind(this)
    this.theGame = this.theGame.bind(this)
    this.orderOfProcess = this.orderOfProcess.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.previousArr = this.previousArr.bind(this)
    this.clearLastTaken = this.clearLastTaken.bind(this)
    this.arrEdit = this.arrEdit.bind(this)
    this.checkForWin = this.checkForWin.bind(this)
    this.checkForDraw = this.checkForDraw.bind(this)
    this.checkForTotalDraw = this.checkForTotalDraw.bind(this)
    this.checkForVictory = this.checkForVictory.bind(this)
    this.miniGameWonBy = this.miniGameWonBy.bind(this)
    this.clearBoard = this.clearBoard.bind(this)
    this.setBoundaries = this.setBoundaries.bind(this)
    this.gameOver = this.gameOver.bind(this)
    this.computersTurn = this.computersTurn.bind(this)
  }

  componentDidMount () {
    this.props.undoRedirect('redirect', this.backTrack)
  }

  backTrack () {
    if (this.state.previousArr.length) {
      let previous = deepClone(this.state.previousArr)
      let lastState = previous[0]
      previous.shift()
      this.props.handleClick(this.backTrack)
      this.setState({
        clonedArr: lastState,
        previousArr: previous
      })
    }
  }

  handleClick (e) {
    let mini = e.target.getAttribute('name')
    let cell = e.target.getAttribute('value')
    let state = this.props.state
    let player = {}
    !state.ai
      ? state.player
        ? player = state.player1
        : player = state.player2
      : player = state.player1
    this.theGame(mini, cell, player, state)
  }

  theGame (mini, cell, player, state) {
    let arr = this.state.clonedArr[mini][cell]
    if (arr.isAlive && arr.isPlayable && arr.wonBy === '') {
      this.props.handleClick()
      this.orderOfProcess(mini, cell, player)
      if (state.ai && state.aiDifficulty === 'easy' && !this.state.clonedArr[0][0].gameOver) {
        setTimeout(() => {
          this.computersTurn(state, easyAi)
        }, 100)
      } else if (state.ai && state.aiDifficulty === 'medium' && !this.state.clonedArr[0][0].gameOver) {
        setTimeout(() => {
          this.computersTurn(state, mediumAiV2)
        }, 100)
      }
    }
  }

  orderOfProcess (mini, cell, player) {
    this.previousArr()
    this.arrEdit(mini, cell, player)
    this.checkForWin(mini, player)
    this.setBoundaries(cell)
  }

  computersTurn (state, ai) {
    let {mini, cell} = ai(this.state.clonedArr,
      state.player2, state.player1)
    this.props.handleClick()
    this.orderOfProcess(mini, cell, state.player2)
  }

  arrEdit (mini, cell, player) {
    let last = this.clearLastTaken()
    let obj = createObj(mini, cell, player)
    let newArr = this.state.clonedArr
    newArr[mini][cell] = obj
    if (last.length) { newArr[last[0]][last[1]].lastTaken = false }
    this.setState({
      clonedArr: newArr
    })
  }

  previousArr () {
    let currentArr = deepClone(this.state.clonedArr)
    let backUpArr = this.state.previousArr
    backUpArr.unshift(currentArr)
    this.setState({
      previousArr: backUpArr
    })
  }

  clearLastTaken () {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (this.state.clonedArr[i][j].lastTaken) {
          return [i, j]
        }
      }
    }
    return [0, 0]
  }

  checkForWin (mini, player) {
    let temp = ''
    let arr = this.state.clonedArr[mini]
    for (let i = 0; i < 9; i++) {
      if (arr[i].takenBy === player.name) {
        temp += `${i}`
      }
    }
    for (let j = 0; j < 8; j++) {
      if (temp.includes(win[j][0]) &&
          temp.includes(win[j][1]) &&
          temp.includes(win[j][2])) {
        this.miniGameWonBy(mini, player)
        this.checkForVictory(player)
      }
    }
    this.checkForDraw(arr, player)
    this.checkForTotalDraw(player)
  }

  checkForDraw (arr) {
    let drawPool = 0
    for (let i = 0; i < 9; i++) {
      if (arr[i].takenBy !== '' && arr[i].wonBy === '') {
        drawPool += 1
      }
    }
    if (drawPool === 9) {
      for (let j = 0; j < 9; j++) {
        arr[j].wonBy = 'DRAW'
        arr[j].isPlayable = false
        arr[j].boundaryStyle = {border: '5px solid orange'}
      }
    }
  }

  checkForTotalDraw (player) {
    let drawPool = 0
    for (let i = 0; i < 9; i++) {
      if (!this.state.clonedArr[i][0].gameOver &&
        this.state.clonedArr[i][0].wonBy !== '') {
        drawPool += 1
      }
    }
    if (drawPool === 9) {
      document.getElementsByClassName('mainBoard')[0].style.border =
        '5px solid orange'
      this.props.handleVictory("It's a DRAW!", this.clearBoard)
      this.gameOver()
    }
  }

  miniGameWonBy (mini, player) {
    this.props.handleScore(player)
    let arr = this.state.clonedArr[mini]
    for (let i = 0; i < 9; i++) {
      arr[i].wonBy = player.name
      arr[i].isPlayable = false
      arr[i].isAlive = false // just added this in, unsure if needed.
      arr[i].winColor = {backgroundColor: `dark${player.color}`}
      arr[i].boundaryStyle = {border: `5px solid ${player.color}`}
    }
  }

  checkForVictory (player) {
    let temp = ''
    for (let i = 0; i < 9; i++) {
      if (this.state.clonedArr[i][0].wonBy === player.name) {
        temp += `${i}`
      }
    }
    for (let j = 0; j < win.length; j++) {
      if (temp.includes(win[j][0]) &&
          temp.includes(win[j][1]) &&
          temp.includes(win[j][2])) {
        document.getElementsByClassName('mainBoard')[0].style.border =
        `2px solid ${player.color}`
        this.props.handleVictory(`${player.name.toUpperCase()} WINS`, this.clearBoard)
        this.gameOver()
      }
    }
  }

  gameOver () {
    let last = this.clearLastTaken()
    let arr = this.state.clonedArr
    arr[last[0]][last[1]].lastTaken = false
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        arr[i][j].isPlayable = false
        arr[i][j].gameOver = true
      }
    }
  }

  clearBoard () {
    this.setState({
      clonedArr: generateBoard()
    })
    document.getElementsByClassName('mainBoard')[0].style.border =
    `5px solid #0E0B16`
  }

  setBoundaries (cell) {
    let arr = this.state.clonedArr
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (arr[cell][j].wonBy === '' && i === Number(cell) && !arr[i][j].gameOver) { // .wonBy can lose ===
          arr[cell][j].isPlayable = true
          arr[cell][j].boundaryStyle = {border: '5px solid lime'}
        } else if (arr[cell][j].wonBy !== '' && arr[i][j].wonBy === '' && !arr[i][j].gameOver) {
          arr[i][j].isPlayable = true
          arr[i][j].boundaryStyle = {border: '5px solid lime'}
        } else if (arr[cell][j].wonBy === '' && i !== Number(cell) && arr[i][j].wonBy === '' && !arr[i][j].gameOver) {
          arr[i][j].isPlayable = false
          arr[i][j].boundaryStyle = {border: '5px solid #0E0B16'}
        } else if (arr[i][j].wonBy === '' && arr[i][j].gameOver) {
          arr[i][j].boundaryStyle = {border: '5px solid #0E0B16'}
        }
      }
    }
    this.setState({
      clonedArr: arr
    })
  }

  render () {
    if (this.props.state.victoryRedirect) {
      return <Redirect to='/menu/player-select' />
    }
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

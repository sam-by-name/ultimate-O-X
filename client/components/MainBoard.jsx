import React, {Component} from 'react'
import {createArr, win, couldWin, willWin} from '../../lib/gameArrays'
import {createObj} from '../../lib/gameFunctions'

class MainBoard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      clonedArr: createArr(),
      previousArr: []
    }
    this.backTrack = this.backTrack.bind(this)
    this.theGame = this.theGame.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.previousArr = this.previousArr.bind(this)
    this.clearLastTaken = this.clearLastTaken.bind(this)
    this.clonedArrEdit = this.clonedArrEdit.bind(this)
    this.checkForWin = this.checkForWin.bind(this)
    this.checkForDraw = this.checkForDraw.bind(this)
    this.checkForVictory = this.checkForVictory.bind(this)
    this.miniGameWonBy = this.miniGameWonBy.bind(this)
    this.clearBoard = this.clearBoard.bind(this)
    this.setBoundaries = this.setBoundaries.bind(this)
    this.gameOver = this.gameOver.bind(this)
    this.computersTurn = this.computersTurn.bind(this)
    this.theAiGame = this.theAiGame.bind(this)
  }

  backTrack () {
    if (this.state.previousArr.length) {
      let previous = JSON.parse(JSON.stringify(this.state.previousArr))
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
    this.theGame(mini, cell, state.player1)
  }

  computersTurn (ai) {
    let arr = this.state.clonedArr
    let mini = []
    let aiOwns = ''
    let playable = ''
    for (let i = 0; i < 9; i++) { // finds miniGame available
      if (arr[i][0].isPlayable) {
        mini.push(i)
      }
    }
    for (let j = 0; j < 9; j++) { // finds cells available
      if (arr[mini[0]][j].takenBy === ai.name) {
        aiOwns += `${j}`
      }
      if (arr[mini[0]][j].isAlive) {
        playable += `${j}`
      }
    }
    let coOrds = [mini[0]]
    let index = Math.floor(Math.random() * playable.length)
   
    for (let j = 0; j < couldWin.length; j++) { // search's for 2/3 and completes if it can
      if (aiOwns.includes(couldWin[j][0]) &&
       aiOwns.includes(couldWin[j][1]) &&
       playable.includes(willWin[j])) {
        coOrds.push(Number(willWin[j]))
      }
    }

    // if player can be denied ...

    if (aiOwns.length >= 1 && coOrds.length < 2) { // if one is taken check to continue line if available
      let posCoOrds = ''
      for (let i = 0; i < win.length; i++) {
        let newWin = ''
        for (let j = 0; j < 3; j++) { // adapt to fid if there is a space that makes to lines possible
          if (aiOwns.includes(win[i][j])) {
            for (let g = 0; g < 3; g++) {
              if (win[i][g] !== win[i][j]) {
                newWin += win[i][g]
              }
            }
          }
        }
        if (newWin.length === 2) {
          if (playable.includes(newWin[0]) &&
              playable.includes(newWin[1])) {
            for (let x = 0; x < playable.length; x++) {
              if (newWin.includes(playable[x])) {
                posCoOrds += playable[x]
              }
            }
            coOrds.push(
              posCoOrds[Math.floor(Math.random() * 2)]
            )
          }
        }
      }
    }

    if (coOrds.length < 2) {
      for (let i = 0; i < win.length; i++) {
        if (playable.includes(win[i][0]) &&
            playable.includes(win[i][1]) &&
            playable.includes(win[i][2])) {
          for (let j = 0; j < playable.length; j++) {
            if (win[i].includes(playable[j])) {
              coOrds.push(Number(playable[j]))
            }
          }
        }
      }
    }
    if (playable.includes('4') && coOrds.length < 2) {
      coOrds.push(4)
    } else {
      coOrds.push(Number(playable[index]))
    }
    this.theAiGame(coOrds[0], coOrds[1], ai)
  }

  theAiGame (mini, cell, player) {
    let arr = this.state.clonedArr[mini][cell]
    if (arr.isAlive && arr.isPlayable && arr.wonBy === '') {
      this.props.handleClick(this.backTrack)
      this.previousArr()
      this.clonedArrEdit(mini, cell, player)
      this.checkForWin(mini, player)
      this.setBoundaries(cell)
    }
  }

  theGame (mini, cell, player) {
    let arr = this.state.clonedArr[mini][cell]
    if (arr.isAlive && arr.isPlayable && arr.wonBy === '') {
      this.props.handleClick(this.backTrack)
      this.previousArr()
      this.clonedArrEdit(mini, cell, player)
      this.checkForWin(mini, player)
      this.setBoundaries(cell)
      // setTimeout(() => {
      this.computersTurn(this.props.state.player2)
      // }, 1000)
    }
  }

  clonedArrEdit (mini, cell, player) {
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
    let currentArr = JSON.parse(JSON.stringify(this.state.clonedArr))
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
    for (let j = 0; j < win.length; j++) {
      if (temp.includes(win[j][0]) &&
          temp.includes(win[j][1]) &&
          temp.includes(win[j][2])) {
        this.miniGameWonBy(mini, player)
        this.checkForVictory(player)
      } else {
        this.checkForDraw(arr)
      }
    }
  }

  checkForDraw (arr) {
    let drawPool = 0
    for (let i = 0; i < 9; i++) {
      if (arr[i].takenBy !== '') {
        drawPool += 1
      }
    }
    if (drawPool === 9) {
      for (let j = 0; j < 9; j++) {
        arr[j].wonBy = 'DRAW'
        arr[j].isPlayable = false
        arr[j].boundaryStyle = {border: '10px solid orange'}
      }
    }
  }

  miniGameWonBy (mini, player) {
    this.props.handleScore(player)
    let arr = this.state.clonedArr[mini]
    for (let i = 0; i < 9; i++) {
      arr[i].wonBy = player.name
      arr[i].isPlayable = false
      arr[i].winColor = {backgroundColor: `dark${player.color}`}
      arr[i].boundaryStyle = {border: `10px solid ${player.color}`}
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
        `10px solid ${player.color}`
        this.props.handleVictory(player, this.clearBoard)
        this.gameOver(player.name)
      }
    }
  }

  gameOver (player) {
    let last = this.clearLastTaken()
    let newArr = this.state.clonedArr
    newArr[last[0]][last[1]].lastTaken = false
    let arr = this.state.clonedArr
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        arr[i][j].wonBy = player
      }
    }
  }

  clearBoard () {
    this.setState({
      clonedArr: createArr()
    })
    document.getElementsByClassName('mainBoard')[0].style.border =
    `10px solid #0E0B16`
  }

  setBoundaries (cell) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        let arr = this.state.clonedArr[i][j]
        let cellArr = this.state.clonedArr[cell][j]
        if (cellArr.wonBy === '' && i === Number(cell)) {
          cellArr.isPlayable = true
          cellArr.boundaryStyle = {border: '10px solid lime'}
        } else if (cellArr.wonBy !== '' && arr.wonBy === '') { // whats going on here? cellArr.wonBy !== '' &&
          arr.isPlayable = true
          arr.boundaryStyle = {border: '10px solid lime'}
        } else if (cellArr.wonBy === '' && i !== Number(cell) && arr.wonBy === '') {
          arr.isPlayable = false
          arr.boundaryStyle = {border: '10px solid #0E0B16'}
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

import React, {Component} from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'

import Menu from './Menu'
import PlayerSelect from './PlayerSelect'
import MainBoard from './MainBoard'
import Victory from './Victory'
import Title from './Title'
import ScoreBoard from './ScoreBoard'
import Footer from './Footer'

class TheGame extends Component {
  constructor (props) {
    super(props)
    this.state = {
      player: false,
      player1: {name: '', color: 'red', symbol: 'X', score: 0},
      player2: {name: '', color: 'blue', symbol: 'O', score: 0},
      style1: {},
      style2: {},
      victor: '',
      victory: false,
      redirect: false,
      victoryRedirect: false,
      backTrack: '',
      clearBoard: '',
      ai: false
    }
    this.playAgain = this.playAgain.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleScore = this.handleScore.bind(this)
    this.handleVictory = this.handleVictory.bind(this)
    this.playerSelect = this.playerSelect.bind(this)
    this.undoRedirect = this.undoRedirect.bind(this)
    this.opponentChoice = this.opponentChoice.bind(this)
  }

  playAgain (boolean, player1, player2) {
    this.state.clearBoard()
    this.setState({
      player: false,
      player1: player1 || {name: '', color: 'red', symbol: 'X', score: 0},
      player2: player2 || {name: '', color: 'blue', symbol: 'O', score: 0},
      style1: {},
      style2: {},
      victor: '',
      victory: false,
      redirect: false,
      victoryRedirect: boolean,
      clearBoard: ''
    })
    this.handleClick(true)
  }

  handleClick (boo) {
    if (boo || !this.state.player) {
      this.setState({
        player: true,
        style1: {backgroundColor: this.state.player1.color},
        style2: {backgroundColor: '#0E0B16'}
      })
    } else {
      this.setState({
        player: false,
        style1: {backgroundColor: '#0E0B16'},
        style2: {backgroundColor: this.state.player2.color}
      })
    }
  }

  handleScore (player) {
    this.setState({
      [player]: {
        score: player.score += 1
      }
    })
  }

  handleVictory (endGameMsg, clearBoard) {
    this.setState({
      victor: endGameMsg,
      victory: true,
      redirect: false,
      victoryRedirect: false,
      clearBoard: clearBoard
    })
  }

  playerSelect (playerPicks) {
    const {player1, p1Color, player2, p2Color} = playerPicks
    this.setState({
      player1: {name: player1, color: p1Color, symbol: 'X', score: 0},
      player2: {name: player2, color: p2Color, symbol: 'O', score: 0},
      redirect: true
    })
    this.handleClick(false)
  }

  undoRedirect (redirectType, backTrack) {
    this.setState({
      [redirectType]: false,
      backTrack: backTrack
    })
  }

  opponentChoice (opponent) {
    if (opponent === 'pVai') {
      this.setState({ai: true})
    } else if (opponent === 'pVp') {
      this.setState({ai: false})
    }
  }

  render () {
    return (
      <Router>
        <div>
          <Route path='/menu/player-select' component={Title} />
          <Route exact path='/menu' render={() =>
            <Menu opponentChoice={this.opponentChoice}/>} />
          <Route exact path='/menu/player-select' render={() =>
            <PlayerSelect state={this.state}
              undoRedirect={this.undoRedirect}
              playerSelect={this.playerSelect}/>} />
          <Route exact path='/menu/player-select/game' render={() =>
            <MainBoard
              state={this.state}
              undoRedirect={this.undoRedirect}
              handleScore={this.handleScore}
              handleClick={this.handleClick}
              handleVictory={this.handleVictory}/>}
          />
          {this.state.victory && <Victory
            playAgain={this.playAgain} state={this.state}/>}
          <Route exact path='/menu/player-select/game' render={() =>
            <ScoreBoard mainState={this.state}/>}
          />
          <Footer />
        </div>
      </Router>
    )
  }
}

export default TheGame

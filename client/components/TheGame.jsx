import React, {Component} from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'

import PlayerSelect from './PlayerSelect'
import MainBoard from './MainBoard'
import Victory from './Victory'
import Title from './Title'
import ScoreBoard from './ScoreBoard'

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
      clearBoard: '' 
    }
  }
  
  playAgain = (player1, player2) => {
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
      clearBoard: '' 
    })
    this.handleClick()
  }

  handleClick = () => {
    if (!this.state.player) {
      this.setState({
        player: true,
        style1: {backgroundColor: this.state.player1.color},
        style2: {backgroundColor: 'white'}
      })
    } else {
      this.setState({
        player: false,
        style1: {backgroundColor: 'white'},
        style2: {backgroundColor: this.state.player2.color}
      })
    }
  }

  handleScore = (player) => {
    this.setState({
      [player]: {
        score: player.score += 1
      }
    })
  }

  handleVictory = (player, clearBoard) => {
    this.setState({
      victor: player.name.toUpperCase(),
      victory: true,
      redirect: false, 
      clearBoard: clearBoard
    })
  }

  playerSelect = (playerPicks) => {
    const {player1, p1Color, player2, p2Color} = playerPicks
    this.setState({
      player1: {name: player1, color: p1Color, symbol: 'X', score: 0},
      player2: {name: player2, color: p2Color, symbol: 'O', score: 0},
      redirect: true
    })
    this.handleClick()
  }

  render () {
    return (
      <Router>
        <div>
          <Title />
          <Route exact path='/' render={() =>
            <PlayerSelect state={this.state} playerSelect={this.playerSelect}/>} />
          <Route exact path='/game' render={() =>
            <MainBoard
              state={this.state}
              handleScore={this.handleScore}
              handleClick={this.handleClick}
              handleVictory={this.handleVictory}/>}
          />
          {this.state.victory && <Victory
            playAgain={this.playAgain} state={this.state}/>}
          <ScoreBoard mainState={this.state}/>
        </div>
      </Router>
    )
  }
}

export default TheGame

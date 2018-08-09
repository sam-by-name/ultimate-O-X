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
  
  newGame = () => {
    this.setState({
      player: false,
      player1: {name: '', color: 'red', symbol: 'X', score: 0},
      player2: {name: '', color: 'blue', symbol: 'O', score: 0},
      style1: {},
      style2: {},
      victor: '',
      victory: false,
      redirect: false,
      clearBoard: '' 
    })
  }

  rematch = () => {
    this.setState({
      player: false,
      player1: {name: this.state.player1.name,
        color: this.state.player1.color,
        symbol: 'X',
        score: 0},
      player2: {name: this.state.player2.name,
        color: this.state.player2.color,
        symbol: 'O',
        score: 0},
      style1: this.state.style1,
      style2: this.state.style2,
      victor: '',
      victory: false,
      redirect: false,
      clearBoard: '' 
    })
  }

  componentDidMount = () => { // fix this unnecessary nonsense
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
        name: player.name,
        color: player.color,
        score: player.score += 1
      }
    })
  }

  handleVictory = (player, clearBoard) => {
    this.setState({
      victor: player.name.toUpperCase(),
      victory: true,
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
            rematch={this.rematch} newGame={this.newGame} state={this.state}/>}
            {/* <Victory
            rematch={this.rematch} newGame={this.newGame} state={this.state}/>} */}
          <ScoreBoard mainState={this.state}/>
        </div>
      </Router>
    )
  }
}

export default TheGame

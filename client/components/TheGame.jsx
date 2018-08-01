import React, {Component} from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'

import PlayerSelect from './PlayerSelect'
import MainBoard from './MainBoard'
// import Title from './Title'
import ScoreBoard from './ScoreBoard'

class TheGame extends Component {
  constructor (props) {
    super(props)
    this.state = {
      player: false,
      player1: '',
      player2: ''
    }
    this.handleClick = this.handleClick.bind(this)
    this.nameCallback = this.nameCallback.bind(this)
  }

  handleClick () {
    if (!this.state.player) {
      this.setState({
        player: true
      })
    } else {
      this.setState({
        player: false
      })
    }
  }

  nameCallback (playerNames) {
    let {player1, player2} = playerNames
    this.setState({
      player1: player1,
      player2: player2
    })
  }

  render () {
    let player = this.state.player
    return (
      <Router>
        <div>
          <h1 className='title' >Ultimate noughts and crosses</h1>
          <Route exact path='/' render={() =>
            <PlayerSelect callback={this.nameCallback}/>} />
          <div onClick={this.handleClick}>
            <Route path='/game' render={() =>
              <MainBoard player={player}/>} />
          </div>
          <ScoreBoard mainState={this.state}/>
        </div>
      </Router>
    )
  }
}

export default TheGame

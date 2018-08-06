import React, {Component} from 'react'
import {HashRouter as Router, Route, Link} from 'react-router-dom'

import PlayerSelect from './PlayerSelect'
import MainBoard from './MainBoard'
// import Title from './Title'
import ScoreBoard from './ScoreBoard'

class TheGame extends Component {
  constructor (props) {
    super(props)
    this.state = {
      player: false,
      player1: {name: '', score: 0, color: 'red'},
      player2: {name: '', score: 0, color: 'blue'},
      style1: {},
      style2: {}
    }
    this.handleClick = this.handleClick.bind(this)
    this.nameCallback = this.nameCallback.bind(this)
    this.handleScore = this.handleScore.bind(this)
  }

  componentDidMount () {
    this.handleClick()
  }

  handleClick () {
    if (!this.state.player) {
      this.setState({
        player: true,
        style1: {backgroundColor: 'red'},
        style2: {backgroundColor: 'white'}
      })
    } else {
      this.setState({
        player: false,
        style1: {backgroundColor: 'white'},
        style2: {backgroundColor: 'blue'}
      })
    }
  }
  handleScore (player) {
    this.setState({
      player: {
        name: player.name,
        score: player.score += 1,
        color: player.color}
    })
  }

  nameCallback (playerNames) {
    let {player1, player2} = playerNames
    this.setState({
      player1: {name: player1, score: 0, color: 'red'},
      player2: {name: player2, score: 0, color: 'blue'}
    })
  }

  render () {
    return (
      <Router>
        <div>
          <Link to='/'><h1 className='title' >Ultimate noughts and crosses</h1></Link>
          <Route exact path='/' render={() =>
            <PlayerSelect callback={this.nameCallback}/>} />
          <Route path='/game' render={() =>
            <MainBoard
              state={this.state}
              handleScore={this.handleScore}
              handleClick={this.handleClick}/>}
          />
          <ScoreBoard mainState={this.state}/>
        </div>
      </Router>
    )
  }
}

export default TheGame

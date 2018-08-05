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
      player: true,
      player1: {name: '', color: 'red'},
      player2: {name: '', color: 'blue'},
      style1: {},
      style2: {}
    }
    this.handleClick = this.handleClick.bind(this)
    this.nameCallback = this.nameCallback.bind(this)
    this.changeStyle = this.changeStyle.bind(this)
  }

  componentDidMount () {
    this.changeStyle()
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
    this.changeStyle()
  }

  changeStyle () {
    if (this.state.player) {
      this.setState({
        style1: {backgroundColor: 'red'},
        style2: {backgroundColor: 'white'}
      })
    } else {
      this.setState({
        style1: {backgroundColor: 'white'},
        style2: {backgroundColor: 'blue'}
      })
    }
  }

  nameCallback (playerNames) {
    let {player1, player2} = playerNames
    this.setState({
      player1: {name: player1, color: 'red'},
      player2: {name: player2, color: 'blue'}
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
            <MainBoard state={this.state} handleClick={this.handleClick}/>} />
          <ScoreBoard mainState={this.state}/>
        </div>
      </Router>
    )
  }
}

export default TheGame

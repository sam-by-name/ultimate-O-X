import React, {Component} from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'

import PlayerSelect from './PlayerSelect'
import MainBoard from './MainBoard'
// import Title from './Title'
// import ScoreBoard from './ScoreBoard'

class TheGame extends Component {
  constructor (props) {
    super(props)
    this.state = {
      player: false
      // player1: name1,
      // player2: name2
    }
    this.handleClick = this.handleClick.bind(this)
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

  nameCallback (nameFromPlayerSelect) {

  }

  render () {
    let player = this.state.player
    return (
      <Router>
        <div>
          <h1 className='title' >Ultimate noughts and crosses</h1>
          <Route exact path='/' component={PlayerSelect} />
          <div onClick={this.handleClick}>
            <Route path='/game' render={() => <MainBoard player={player}/>} />
          </div>
          {/* <ScoreBoard player={player}/> */}
        </div>
      </Router>
    )
  }
}

export default TheGame

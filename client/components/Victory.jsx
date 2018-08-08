import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {generateBoard} from '../../lib/gameArr'

class Victory extends Component {
  constructor (props) {
    super(props)
    this.state = {
      redirect: false,
      rematch: false,
      newGame: false
    }
    this.rematch = this.rematch.bind(this)
    this.newGame = this.newGame.bind(this)
    this.noMore = this.noMore.bind(this)
    this.redirect = this.redirect.bind(this)
  }
  redirect (to) {
    this.setState({
      redirect: true,
      [to]: true
    })
  }

  rematch () {
    //this.redirect('rematch')
    this.props.refreshState()
  }

  newGame () {
   generateBoard()
    this.redirect('newGame')
  }

  noMore () {
    return alert("What's wrong ... you chicken?")
  }
  render () {
    if (this.state.redirect && this.state.rematch) {
      return (
        <Redirect push to='/game' />
      )
    } else if (this.state.redirect && this.state.newGame) {
      return (
        <Redirect push to='/' />
      )
    }
    return (
      <div>
        <span>{`${this.props.state.victor} WINS!`}</span>
        <button onClick={this.rematch}>Rematch</button>
        <button onClick={this.newGame}>New Game</button>
        <button onClick={this.noMore}>No More</button>
      </div>
    )
  }
}

export default Victory

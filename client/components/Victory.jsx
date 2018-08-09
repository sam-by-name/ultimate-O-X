import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

class Victory extends Component {
  constructor (props) {
    super(props)
    this.state = {
      redirect: false
    }
  }

  redirect = () => {
    if (this.state.redirect) {
      this.setState({redirect: false})
    } else {
      this.setState({redirect: true})
    }
  }

  rematch = () => {
    let state = this.props.state
    let player1 = {
      name: state.player1.name,
      color: state.player1.color,
      symbol: 'X',
      score: 0}
    let player2 = {
      name: state.player2.name,
      color: state.player2.color,
      symbol: 'O',
      score: 0}
    this.props.playAgain(player1, player2)
  }

  newGame = () => {
    this.props.playAgain(this.redirect())
    this.redirect()
  }

  noMore = () => {
    return alert("What's wrong ... you chicken?")
  }
  render () {
    if (this.state.redirect) {
      return (
        <Redirect to='/' />
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

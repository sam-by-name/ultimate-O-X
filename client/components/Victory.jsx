import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

class Victory extends Component {
  constructor (props) {
    super(props)
    this.state = {
      redirect: false
    }
  }

  // redirect = () => {
  //   this.setState({redirect: false})
  // }

  rematch = () => {
    this.props.state.clearBoard()
    this.props.rematch()
  }

  newGame = () => {
    this.props.state.clearBoard()
    this.props.newGame()
    this.setState({redirect: true})
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

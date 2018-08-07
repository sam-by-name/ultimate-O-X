import React, {Component} from 'react'

class Victory extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
    this.rematch = this.rematch.bind(this)
    this.newGame = this.newGame.bind(this)
    this.noMore = this.noMore.bind(this)
  }
  // rematch () {

  // }

  // newGame () {

  // }

  noMore () {
    return alert("What's wrong ... you chicken?")
  }
  render () {
    return (
      <div>
        <span>{`${this.props.state.victor} WINS!`}</span>
        <button onClick={this.rematch()}>Rematch</button>
        <button onClick={this.newGame()}>New Game</button>
        <button onClick={this.noMore()}>No More</button>
      </div>
    )
  }
}

export default Victory

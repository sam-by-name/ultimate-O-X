import React, {Component} from 'react'

class ScoreBoard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      player: this.props.mainState.player
    }
  }
  render () {
    let state = this.props.mainState
    return (
      <div>
        <h2 style={state.style1}>
          {state.player1}
        </h2>
        <h2 style={state.style2}>
          {state.player2}
        </h2>
      </div>
    )
  }
}

export default ScoreBoard

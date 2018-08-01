import React, {Component} from 'react'

class ScoreBoard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      player: this.props.player
    }
  }
  render () {
    let style1 = (this.state.player && {backgroundColor: 'red'})
    let style2 = (!this.state.player && {backgroundColor: 'blue'})
    return (
      <div>
        <h2 style={style1}>
          {this.state.player1}
        </h2>
        <h2 style={style2}>
          {this.state.player2}
        </h2>
      </div>
    )
  }
}

export default ScoreBoard

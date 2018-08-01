import React, {Component} from 'react'

class ScoreBoard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      player: this.props.mainState.player
    }
  }
  // componentDidUpdate () {
  //   this.setState({
  //     player: this.props.mainState.player
  //   })
  // }
  render () {
    // let style1 = {}
    // if (this.state.player) {
    //   style1 = {backgroundColor: 'red'}
    // } else {
    //   style1 = {backgroundColor: 'white'}
    // }
    // let style2 = {}
    // if (!this.state.player) {
    //   style2 = {backgroundColor: 'blue'}
    // } else {
    //   style2 = {backgroundColor: 'white'}
    // }
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

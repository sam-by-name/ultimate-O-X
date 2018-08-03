import React, {Component} from 'react'
import {gameArr} from '../../lib/gameArr'

class MainBoard extends Component {
  constructor(props){
    super(props)
    this.state = {
      gameArr: gameArr
    }
  }
  render () {
    let player = this.props.player
    return (
      <div>
      {this.state.gameArr.map(miniBoard => {
        return(
        <div>
          {miniboard.map(cell => {
            return (
              <div />
            )
          })}
        </div>
        )
      })}

      </div>
    )
  }
}

export default MainBoard

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
    return (
      <div>
      {this.state.gameArr.map((miniBoard) => {
        return miniBoard.map((cell) => {
          return (
          <div 
            key= {cell.littleGrid} 
            onClick={this.handleClick} 
            name={cell.bigGrid} 
            value={cell.littleGrid} 
            className={`c${cell.littleGrid}`}>
          </div>
          )
        })}
      )}
      </div>
    )
  }
}

export default MainBoard

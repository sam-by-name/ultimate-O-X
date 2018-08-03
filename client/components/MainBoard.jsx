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
        return (
          <div className={`miniboard c${miniboard[0].bigGrid}`}>
          {miniBoard.map((cell) => {
            return (
              <div 
                key= {cell.littleGrid} 
                onClick={this.handleClick} 
                name={cell.bigGrid} 
                value={cell.littleGrid} 
                className={`cell c${cell.littleGrid}`}>
              </div>
              if (cell.littleGrid === 3,){
                <div className='clear'/>
              }
            )
          })}
        </div>
        )
      })
    }
      </div>
    )
  }
}

export default MainBoard

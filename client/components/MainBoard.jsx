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
          <div className={`c${miniBoard[0].bigGrid}`}>
            <div className="miniBoard">
              {miniBoard.map((cell) => {
                return (
                  <div>
                    <div 
                      key= {cell.littleGrid} 
                      onClick={this.handleClick} 
                      name={cell.bigGrid} 
                      value={cell.littleGrid} 
                      className={`cell c${cell.littleGrid}`}/>
                    {cell.littleGrid ===2 && <div className='clear'/> }
                    {cell.littleGrid ===5 && <div className='clear'/> }
                    {cell.littleGrid ===8 && <div className='clear'/> }
                  </div>
                )
              })}
            </div>
            {miniBoard[0].bigGrid ===2 && <div className='clear'/> }
            {miniBoard[0].bigGrid ===5 && <div className='clear'/> }
            {miniBoard[0].bigGrid ===8 && <div className='clear'/> }
          </div>
        )
      })
    }
      </div>
    )
  }
}

export default MainBoard

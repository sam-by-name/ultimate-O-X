import React, {Component} from '../../../../.cache/typescript/2.9/node_modules/@types/react'
import Board from './Board'

class MainBoard extends Component {
  render () {
    let player = this.props.player
    return (
      <div className='mainBoard'>
        <div className='topRow'>
          <div className='fl'>   <Board player={player} value={0} /></div>
          <div className='fl tM'><Board player={player} value={1} /></div>
          <div className='fl'>   <Board player={player} value={2} /></div>
        </div>
        <div className='clear'></div>
        <div className='midRow'>
          <div className='fl mL'><Board player={player} value={3} /></div>
          <div className='fl mM'><Board player={player} value={4} /></div>
          <div className='fl mR'><Board player={player} value={5} /></div>
        </div>
        <div className='clear'></div>
        <div className='botRow'>
          <div className='fl'>   <Board player={player} value={6} /></div>
          <div className='fl bM'><Board player={player} value={7} /></div>
          <div className='fl'>   <Board player={player} value={8} /></div>
        </div>
        <div className='clear'></div>
      </div>
    )
  }
}

export default MainBoard

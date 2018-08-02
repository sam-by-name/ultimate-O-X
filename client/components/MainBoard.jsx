import React, {Component} from 'react'
import MiniBoard from './MiniBoard'

class MainBoard extends Component {
  render () {
    let player = this.props.player
    return (
      <div className='mainBoard'>
        <div className='topRow'>
          <div className='fl'>   <MiniBoard player={player} value={0} /></div>
          <div className='fl tM'><MiniBoard player={player} value={1} /></div>
          <div className='fl'>   <MiniBoard player={player} value={2} /></div>
        </div>
        <div className='clear'></div>
        <div className='midRow'>
          <div className='fl mL'><MiniBoard player={player} value={3} /></div>
          <div className='fl mM'><MiniBoard player={player} value={4} /></div>
          <div className='fl mR'><MiniBoard player={player} value={5} /></div>
        </div>
        <div className='clear'></div>
        <div className='botRow'>
          <div className='fl'>   <MiniBoard player={player} value={6} /></div>
          <div className='fl bM'><MiniBoard player={player} value={7} /></div>
          <div className='fl'>   <MiniBoard player={player} value={8} /></div>
        </div>
        <div className='clear'></div>
      </div>
    )
  }
}

export default MainBoard

import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {colorArr} from '../../lib/gameArrays'

class PlayerSelect extends Component {
  constructor (props) {
    super(props)
    this.state = {
      player1: '',
      p1Color: 'red',
      player2: '',
      p2Color: 'blue'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    this.props.undoRedirect('victoryRedirect')
  }

  handleChange (e) {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit (e) {
    let a = this.state
    let playerChoice = {
      player1: a.player1 || 'Player1',
      p1Color: a.p1Color,
      player2: a.player2 || 'Player2',
      p2Color: a.p2Color
    }
    this.props.playerSelect(
      playerChoice
    )
    e.preventDefault()
  }

  render () {
    if (this.props.state.redirect) {
      return (
        <Redirect to='/menu/player-select/game' />
      )
    }
    return (
      <div>
        <form className='playerDiv'>
          <div className='playerSelect'>
            <div className='p1'>
              <p><label>Player1 is ... ?</label></p>
              <p><i className="down downL"></i></p>
              <input
                className='playerName pWidth'
                type='text'
                name='player1'
                placeholder='Player one'
                onChange={this.handleChange}
                value={this.state.player1.name} />
              <select className='playerName pName1' onChange={this.handleChange} name='p1Color'>
                {colorArr.map((color) => {
                  return (
                    <option key={color} value={color}>{color}</option>
                  )
                })}
              </select>
            </div>
            <div className='p2'>
              <p><label>Player2 is ... ?</label></p>
              <p><i className='down downR'></i></p>
              <span>
                <input
                  className='playerName pName2 pWidth'
                  type='text'
                  name='player2'
                  placeholder='Player two'
                  onChange={this.handleChange}
                  value={this.state.player2.name} />
              </span>
              <p className='rSelectPos'>
                <select className='playerName rSelect' onChange={this.handleChange} name='p2Color'>
                  {colorArr.map((color) => {
                    return (
                      <option key={color} value={color}>{color}</option>
                    )
                  })}
                </select>
              </p>
            </div>
          </div>
          <button className='btn playBtn' onClick={this.handleSubmit}>Play</button>
        </form>
      </div>
    )
  }
}

export default PlayerSelect

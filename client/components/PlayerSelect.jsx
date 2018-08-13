import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {colorArr} from '../../lib/mainArr'

class PlayerSelect extends Component {
  constructor (props) {
    super(props)
    this.state = {
      player1: '',
      p1Color: 'red',
      player2: '',
      p2Color: 'blue'
    }
  }

  handleChange = (e) => {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (e) => {
    this.props.playerSelect(
      this.state
    )
    e.preventDefault()
  }

  render () {
    if (this.props.state.redirect) {
      return (
        <Redirect to='/game' />
      )
    }
    return (
      <div>
        <form>
          <fieldset className='playerSelect'>
            <label>Player1 is ... ?</label>
            <input
              type='text'
              name='player1'
              placeholder='Player one'
              onChange={this.handleChange}
              value={this.state.player1.name} />
            <select onChange={this.handleChange} name='p1Color'>
              {colorArr.map((color) => {
                return (
                  <option key={color} value={color}>{color}</option>
                )
              })}
            </select>
            <label>Player2 is ... ?</label>
            <input
              type='text'
              name='player2'
              placeholder='Player two'
              onChange={this.handleChange}
              value={this.state.player2.name} />
            <select onChange={this.handleChange} name='p2Color'>
              {colorArr.map((color) => {
                return (
                  <option key={color} value={color}>{color}</option>
                )
              })}
            </select>
            <button onClick={this.handleSubmit}>Play</button>
          </fieldset>
        </form>
      </div>
    )
  }
}

export default PlayerSelect

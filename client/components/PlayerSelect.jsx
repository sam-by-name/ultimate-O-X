import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {colorArr} from '../../lib/gameArr'

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

  handleChange (e) {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit (e) {
    this.props.playerSelect(
      this.state
    )
    e.preventDefault()
  }

  render () {
    return (
      <div>
        <form>
          <fieldset>
            <label>Player1 is ... ?</label>
            <input
              type='text'
              name='player1'
              id=''
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
              id=''
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
            <button onClick={this.handleSubmit} />
            <Link to='/game' type='button'>Play</Link>
          </fieldset>
        </form>
      </div>
    )
  }
}

export default PlayerSelect

import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class PlayerSelect extends Component {
  constructor (props) {
    super(props)
    this.state = {
      player1: '',
      player2: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
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
              value={this.state.player1} />
            <label>Player2 is ... ?</label>
            <input
              type='text'
              name='player2'
              id=''
              placeholder='Player two'
              onChange={this.handleChange}
              value={this.state.player2} />
            <Link to='/game' type='button'>Play</Link>
          </fieldset>
        </form>
      </div>
    )
  }
}

export default PlayerSelect

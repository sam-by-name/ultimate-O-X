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
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit (e) {
    this.props.callback(
      {
        player1: this.state.player1,
        player2: this.state.player2
      }
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
              value={this.state.player1} />
            <label>Player2 is ... ?</label>
            <input
              type='text'
              name='player2'
              id=''
              placeholder='Player two'
              onChange={this.handleChange}
              value={this.state.player2} />
            <button onClick={this.handleSubmit} />
            <Link to='/game' type='button'>Play</Link>
          </fieldset>
        </form>
      </div>
    )
  }
}

export default PlayerSelect

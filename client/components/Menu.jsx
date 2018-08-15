import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Title from './Title'

class Menu extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
    this.mouseOver = this.mouseOver.bind(this)
    this.mouseOver2 = this.mouseOver2.bind(this)
  }

  mouseOver () {
    document.querySelector('.button').onmousemove = (e) => {
      const x = e.pageX - e.target.offsetLeft
      const y = e.pageY - e.target.offsetTop

      e.target.style.setProperty('--x', `${x}px`)
      e.target.style.setProperty('--y', `${y}px`)
    }
  }

  mouseOver2 () {
    document.querySelector('.button').onmousemove = (e) => {
      const x = e.pageX - e.target.offsetLeft
      const y = e.pageY - e.target.offsetTop

      e.target.style.setProperty('--x', `${x}px`)
      e.target.style.setProperty('--y', `${y}px`)
    }
  }
  render () {
    return (
      <div className='menu'>
        <div className='mainTitle'>
          <Title />
        </div>
        <div className='options'>
          <div className='btn'>
            <Link to='/menu/player-select'>
              <button className='button' onMouseMove={this.mouseOver}>
                <span>P vs P</span>
              </button>
            </Link>
          </div>
          <div className='btn'>
            <Link to='/menu'>
              <button className='button' onMouseMove={this.mouseOver2}>
                <span>P vs Ai</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Menu

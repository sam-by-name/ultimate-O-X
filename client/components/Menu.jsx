import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Title from './Title'

class Menu extends Component {
  constructor () {
    super()
    this.mouseOver = this.mouseOver.bind(this)
    this.mouseOver2 = this.mouseOver2.bind(this)
    this.mouseOver3 = this.mouseOver3.bind(this)
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
    document.querySelector('.button2').onmousemove = (e) => {
      const x = e.pageX - e.target.offsetLeft
      const y = e.pageY - e.target.offsetTop

      e.target.style.setProperty('--x', `${x}px`)
      e.target.style.setProperty('--y', `${y}px`)
    }
  }
  mouseOver3 () {
    document.querySelector('.button3').onmousemove = (e) => {
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
        <div>
          <div className='square'></div>
          <div className='diamond'></div>
          <section className='circle'></section>
          <div className='homeBtn'>
            <Link to='/menu/player-select'>
              <button className='button' onMouseMove={this.mouseOver}>
                <span>P vs P</span>
              </button>
            </Link>
          </div>
          <div className='homeBtn'>
            <Link to='/menu'>
              <button className='button2' onMouseMove={this.mouseOver2}>
                <span>P vs Ai</span>
              </button>
            </Link>
          </div>
          <div className='homeBtn'>
            <Link to='/menu'>
              <button className='button3' onMouseMove={this.mouseOver3}>
                <span>Tutorial</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Menu

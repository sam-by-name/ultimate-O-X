import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Title from './Title'

class Menu extends Component {
  constructor (props) {
    super(props)
    this.mouseOver = this.mouseOver.bind(this)
    this.mouseOver2 = this.mouseOver2.bind(this)
    this.mouseOver3 = this.mouseOver3.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    this.props.opponentChoice(e.target.name)
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
        <div className='options'>
          <div className='square'></div>
          <div className='diamond'></div>
          <section className='circle'></section>
          <div className='homeBtn'>
            <Link to='/menu/player-select'>
              <button name='pVp' className='button' onMouseMove={this.mouseOver} onClick={this.handleClick}>
                <span>P vs P</span>
              </button>
            </Link>
          </div>
          <div className='homeBtn'>
            <Link to='/menu/player-select'>
              <button name='pVai' className='button2' onMouseMove={this.mouseOver2} onClick={this.handleClick}>
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

import React, {Component} from 'react'
import Title from './Title'
import MenuBtns from './MenuBtns'
import AiChoice from './AiChoice'

class Menu extends Component {
  constructor (props) {
    super(props)
    this.state = {
      menuToggle: false
    }
    this.mouseOver = this.mouseOver.bind(this)
    this.mouseOver2 = this.mouseOver2.bind(this)
    this.mouseOver3 = this.mouseOver3.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.menuToggle = this.menuToggle.bind(this)
  }
  handleClick (e) {
    if (e.target.name === 'pVai') {
      this.setState({
        menuToggle: true
      })
    } else {
      this.props.opponentChoice(e.target.name)
      this.menuToggle()
    }
  }

  menuToggle () {
    this.setState({
      menuToggle: false
    })
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
          {!this.state.menuToggle && <MenuBtns
            handleClick={this.handleClick}
            mouseOver={this.mouseOver}
            mouseOver2={this.mouseOver2}
            mouseOver3={this.mouseOver3}
          />}
          {this.state.menuToggle && <AiChoice
            handleClick={this.handleClick}
            menuToggle={this.menuToggle}
            mouseOver={this.mouseOver}
            mouseOver2={this.mouseOver2}
            mouseOver3={this.mouseOver3}
          />}
        </div>
      </div>
    )
  }
}

export default Menu

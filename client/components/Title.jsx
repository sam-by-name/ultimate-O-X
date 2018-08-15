import React from 'react'
import {Link} from 'react-router-dom'

const Title = () => {
  return (
    <div className='titleCont'>
      <Link to='/menu'><h1 className='title' >Ultimate Naughts and Crosses</h1></Link>
    </div>
  )
}

export default Title

import React from 'react'
import {Link} from 'react-router-dom'

const Title = () => {
  return (
    <div className='titleCont'>
      <Link to='/menu'>
        <span className='title1' >Ultimate </span>
        <span className='title2' >O</span>
        <span className='title1' >-</span>
        <span className='title3' >X</span>
      </Link>
    </div>
  )
}

export default Title

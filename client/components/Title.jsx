import React from 'react'
import {Link} from 'react-router-dom'

const Title = () => {
  return (
    <div className='titleCont'>
      <Link to='/'><h1 className='title' >Ultimate noughts and crosses</h1></Link>
    </div>
  )
}

export default Title

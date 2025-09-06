import React from 'react'
import CanvasOverveiw from './Explore/CanvasOverview'

function Explore() {
  return (
    <div id="explore" className='hidden md:block px-4 md:px-24 lg:px-36 '>
      <div className='flex items-center justify-center w-full'>
        <CanvasOverveiw />
      </div>

    </div>
  )
}

export default Explore

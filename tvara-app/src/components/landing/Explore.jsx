import React from 'react'
import CanvasOverveiw from './Explore/CanvasOverview'

function Explore() {
  return (
    <div id="explore" className='hidden md:block px-4 md:px-24 lg:px-34 translate-y-[-30px]'>
      {/* <div className='text-[#fff] flex flex-col gap-2'>
        <h1 className='text-4xl font-bold leading-tight'>Explore, Design, Deploy</h1>
        <p className='text-xl font-light leading-tight'>You workflows, Made simple</p>
      </div> */}

      <div className='flex items-center justify-center w-full'>
        <CanvasOverveiw />
      </div>

    </div>
  )
}

export default Explore

import React from 'react'
import ExtendedNavbar from '../components/elements/ExtendedNavbar'

function Blog() {
  return (
    <div className='bg-background h-screen flex flex-col'>
      <ExtendedNavbar />
        <div className='flex-1 flex flex-col gap-8 px-20 py-10 overflow-y-auto text-saj'>  
            <span className='text-4xl font-bold text-white'>Blog Page Coming Soon!</span>
            <span className='text-xl font-light text-gray-300'>Stay tuned for updates.</span>
        </div>
    </div>
  )
}

export default Blog

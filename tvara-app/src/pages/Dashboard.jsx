import React from 'react'
import Topbar from '../components/playground/Topbar'
import DefaultSideBar from '../components/common/DefaultSideBar'

export default function Dashboard() {
  return (
    <div className='bg-canvas-bg w-full h-screen'>
      <Topbar page_name={"Dashboard"}/>
      <div className=''>
        <DefaultSideBar />
      </div>
    </div>
  )
}

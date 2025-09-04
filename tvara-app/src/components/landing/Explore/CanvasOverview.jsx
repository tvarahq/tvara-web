import React from 'react'
import Canvas from './Canvas';
import { buttons } from '../../../utils/landing';

export default function CanvasOverview() {

  return (
    <div id='canvas-overview' className=' w-[85%] h-[90vh]'>
      <div className='w-full h-[93%] bg-[#726D6D2E]/80 mt-6 rounded-[10px] flex items-center justify-center p-6 gap-6 shadow-xl shadow-[#0031343c] border-2 border-gray-800'>
        <div className='w-[25%] flex flex-col items-center justify-center gap-3'>
          {buttons.map((button) => (
          <div className='flex gap-4 items-center bg-[#726D6D2E]/80 rounded-[10px] p-2 h-[79px] shadow-sm shadow-[#373d3d] w-full' key={button.id}>
            <button.icon color={button.icon_color} size={50} />
            <div>
              <h3 className='text-[17px] font-bold leading-6'>{button.title}</h3>
              <p className='text-[10px] font-light'>{button.description}</p>
            </div>
          </div>
          ))}
        </div>
        <div className='bg-white w-[75%] h-full rounded-[10px] overflow-hidden border-2 border-gray-800 shadow-sm shadow-[#373d3d]'>
          <div className='bg-[#000]'></div>
          <Canvas />
        </div>
      </div>
    </div>
  )
}

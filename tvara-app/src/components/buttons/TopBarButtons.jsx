import React from 'react'

export default function TopBarButtons({ icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex justify-center gap-2 p-2 rounded-lg text-canvas-text text-[13px] font-semibold border-canvas-text border-solid border-2 ${label === "" ? "px-2" : "px-4"}`}
    >
      <Icon size={16} />
      {
        label === "" ? <span className='hidden'></span> : <span>{label}</span>
      }
      
    </button>
  )
}

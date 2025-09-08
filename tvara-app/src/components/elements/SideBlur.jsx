import React from 'react'

export default function SideBlur() {
  return (
    <div className="fixed min-h-screen w-full h-full pointer-events-none z-0">
      <div className="absolute top-0 left-0 w-[20%] h-full bg-gradient-to-r from-primary/60 to-transparent opacity-20 blur-[70px]"></div>
      <div className="absolute top-0 right-0 w-[20%] h-full bg-gradient-to-l from-primary/60 to-transparent opacity-20 blur-[70px]"></div>
    </div>
  )
}

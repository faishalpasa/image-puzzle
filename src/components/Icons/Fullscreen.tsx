import React from 'react'

interface IconProps {
  width?: number
  fill?: string
  className?: string
  style?: any
}

const Fullscreen = ({ width = 24, fill, className, style }: IconProps) => {
  return (
    <svg
      style={{
        ...style,
        width,
        fill
      }}
      className={className}
      viewBox="0 0 24 24"
    >
      <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"></path>
    </svg>
  )
}

export default Fullscreen

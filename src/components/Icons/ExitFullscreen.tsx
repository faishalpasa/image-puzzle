import React from 'react'

interface IconProps {
  width?: number
  fill?: string
  className?: string
  style?: any
}

const ExitFullscreen = ({ width = 24, fill, className, style }: IconProps) => {
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
      <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"></path>
    </svg>
  )
}

export default ExitFullscreen
import React, { memo } from 'react'

import styles from './BoardBlock.module.css'

interface BoardBlockProps {
  imageMultiple: number
  positionX: number
  positionY: number
  onClick: (x: number, y: number) => void
  reveal?: boolean
  active?: boolean
  imageWidth?: number
  withBorder?: boolean
  selectedImage: string
  borderRadius?: string
}

const BoardBlock = ({
  imageMultiple,
  positionX,
  positionY,
  onClick,
  selectedImage,
  reveal = true,
  active = false,
  imageWidth = 150,
  withBorder = false,
  borderRadius = ''
}: BoardBlockProps) => {
  return (
    <div
      onClick={() => onClick(positionX, positionY)}
      className={styles.boardBlock}
      style={{
        border: withBorder ? '1px solid #fff' : 'unset',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${selectedImage})`,
        backgroundSize: `calc(${imageWidth}px * ${imageMultiple})`,
        backgroundPosition: `${imageWidth * (positionX || 0)}px ${imageWidth * (positionY || 0)}px`,
        transform: active ? 'scale(1.5)' : 'scale(1)',
        zIndex: active ? 999 : 0,
        borderRadius
      }}
    >
      <div className={styles.curtain} style={{ opacity: reveal ? 0 : 0.8 }}></div>
    </div>
  )
}

export default memo(BoardBlock)

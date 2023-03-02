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
}

const BoardBlock = ({
  imageMultiple,
  positionX,
  positionY,
  onClick,
  reveal = true,
  active = false,
  imageWidth = 150,
  withBorder = false
}: BoardBlockProps) => {
  return (
    <div
      onClick={() => onClick(positionX, positionY)}
      className={styles.boardBlock}
      style={{
        border: withBorder ? '1px solid #fff' : 'unset',
        backgroundRepeat: 'no-repeat',
        backgroundImage:
          "url('https://i.guim.co.uk/img/media/b36430b7589dd3d9ec000865e5f6451dfa7b344a/0_138_4288_2573/master/4288.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=b9d1da68965ddd2b6125368b06073538')",
        backgroundSize: `calc(${imageWidth}px * ${imageMultiple})`,
        backgroundPosition: `${imageWidth * (positionX || 0)}px ${imageWidth * (positionY || 0)}px`,
        transform: active ? 'scale(1.5)' : 'scale(1)',
        zIndex: active ? 999 : 0
      }}
    >
      <div className={styles.curtain} style={{ opacity: reveal ? 0 : 0.8 }}></div>
    </div>
  )
}

export default memo(BoardBlock)

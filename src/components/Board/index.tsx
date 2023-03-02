import React, { memo, useState } from 'react'

import BoardBlock from 'components/BoardBlock'
import styles from './Board.module.css'

interface BoardProps {
  imageMultiple: number
  blocks: { id: number; x: number; y: number; borderRadius: string }[]
  selectedBlock: { x: number | null; y: number | null }
  onClickBlock: (index: number, x: number, y: number) => void
  revealedBlocks: { index: number; x: number | null; y: number | null }[]
  imageWidth: number
  end: boolean
  selectedImage: string
}

const Board = ({
  blocks,
  imageMultiple,
  selectedBlock,
  onClickBlock,
  revealedBlocks,
  imageWidth,
  end,
  selectedImage
}: BoardProps) => {
  const handleClickBoard = (index: number, x: number, y: number) => {
    if (x === selectedBlock.x && y === selectedBlock.y) {
      onClickBlock(index, x, y)
    }
  }

  return (
    <div className={styles.board} style={{ gridTemplateColumns: `repeat(3, ${imageWidth}px)` }}>
      {blocks.map((block, index) => (
        <BoardBlock
          key={block.id}
          imageMultiple={imageMultiple}
          positionX={block.x}
          positionY={block.y}
          onClick={(x, y) => handleClickBoard(index, x, y)}
          reveal={
            !!revealedBlocks.find(
              (revealedBlock) => revealedBlock.x === block.x && revealedBlock.y === block.y
            )
          }
          imageWidth={imageWidth}
          withBorder={!end}
          selectedImage={selectedImage}
          borderRadius={block.borderRadius}
        />
      ))}
    </div>
  )
}

export default memo(Board)

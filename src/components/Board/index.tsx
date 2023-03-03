import React, { memo, useEffect, useState } from 'react'

import BoardBlock from 'components/BoardBlock'
import styles from './Board.module.css'

const cheerSound = new Audio(`${process.env.REACT_APP_IMAGE_URL}/sounds/cheers.mp3`)
const wrongBlockSound = new Audio(`${process.env.REACT_APP_IMAGE_URL}/sounds/wrong-block.mp3`)

const playSFXSound = (type: 'finish' | 'wrong') => {
  if (type === 'finish') {
    if (cheerSound) {
      cheerSound.volume = 1
      cheerSound.currentTime = 0
      cheerSound.play()
    }
  }
  if (type === 'wrong') {
    if (wrongBlockSound) {
      wrongBlockSound.volume = 1
      wrongBlockSound.currentTime = 0
      wrongBlockSound.play()
    }
  }
}

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
  const [wrongBlock, setWrongBlock] = useState<{ index: null | number; isWrongBlock: boolean }>({
    index: null,
    isWrongBlock: false
  })
  const handleClickBoard = (index: number, x: number, y: number) => {
    if (selectedBlock.x !== null && selectedBlock.y !== null) {
      if (x === selectedBlock.x && y === selectedBlock.y) {
        onClickBlock(index, x, y)
      } else {
        setWrongBlock({ index, isWrongBlock: true })
        playSFXSound('wrong')
      }
    }
  }

  useEffect(() => {
    if (wrongBlock.index) {
      setTimeout(() => setWrongBlock({ index: null, isWrongBlock: false }), 500)
    }
  }, [wrongBlock])

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
          wrong={wrongBlock.index === index}
        />
      ))}
    </div>
  )
}

export default memo(Board)

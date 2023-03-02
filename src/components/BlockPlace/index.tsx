import React, { memo, useState, useEffect } from 'react'

import BoardBlock from 'components/BoardBlock'

import styles from './BlockPlace.module.css'
import useWindowSize from 'hooks/useWindowSize'

const shuffle = (array: any[]) => {
  return array.sort(() => 0.5 - Math.random())
}

interface BlockPlaceProps {
  imageMultiple: number
  blocks: { id: number; x: number; y: number; borderRadius: string }[]
  onClickBlock: (x: number, y: number) => void
  revealedBlocks: { index: number; x: number | null; y: number | null }[]
  imageWidth: number
  selectedImage: string
}

const BlockPlace = ({
  blocks,
  imageMultiple,
  onClickBlock,
  revealedBlocks,
  imageWidth,
  selectedImage
}: BlockPlaceProps) => {
  const windowSize = useWindowSize()
  const [activeBlock, setActiveBlock] = useState<null | number>(null)
  const [shuffledBlocks, setShuffledBlocks] = useState<any[]>([])

  const handleClickBlock = (index: number, x: number, y: number) => {
    onClickBlock(x, y)
    setActiveBlock(index)
  }

  let row = 9
  let scale = 0.75
  if (windowSize.width < 768) {
    row = 3
    scale = 0.75
  }

  useEffect(() => {
    setShuffledBlocks(shuffle([...blocks]))
  }, [])

  return (
    <div
      className={styles.blockPlace}
      style={{ gridTemplateColumns: `repeat(${row}, ${imageWidth * scale}px)` }}
    >
      {shuffledBlocks.map((block, index) => (
        <BoardBlock
          key={block.id}
          imageMultiple={imageMultiple}
          positionX={block.x}
          positionY={block.y}
          onClick={(x, y) => handleClickBlock(index, x, y)}
          active={
            index === activeBlock &&
            !revealedBlocks.find(
              (revealedBlock) => revealedBlock.x === block.x && revealedBlock.y === block.y
            )
          }
          reveal={
            !revealedBlocks.find(
              (revealedBlock) => revealedBlock.x === block.x && revealedBlock.y === block.y
            )
          }
          imageWidth={imageWidth * scale}
          selectedImage={selectedImage}
          withBorder
          borderRadius={block.borderRadius.replace('16', 16 * scale)}
        />
      ))}
    </div>
  )
}

export default memo(BlockPlace)

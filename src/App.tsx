import React, { useState, memo, useEffect } from 'react'
import Confetti from 'react-confetti'

import './App.css'
import Board from 'components/Board'
import BlockPlace from 'components/BlockPlace'
import { IMAGE_SETS } from 'constants/images'
import useWindowSize from 'hooks/useWindowSize'

const blocks = [
  { id: 1, x: 0, y: 0 },
  { id: 2, x: -1, y: 0 },
  { id: 3, x: -2, y: 0 },
  { id: 4, x: 0, y: -1 },
  { id: 5, x: -1, y: -1 },
  { id: 6, x: -2, y: -1 },
  { id: 7, x: 0, y: -2 },
  { id: 8, x: -1, y: -2 },
  { id: 9, x: -2, y: -2 }
]

const imageMultiple = 3
let imageWidth = 150

const App = () => {
  const windowSize = useWindowSize()
  const [selectedImageSet, setSelectedImageSet] = useState('')
  const [selectedImage, setSelectedImage] = useState('')
  const [selectedBlock, setSelectedBlock] = useState<{ x: number | null; y: number | null }>({
    x: null,
    y: null
  })
  const [revealedBlocks, setRevealedBlock] = useState<
    { index: number; x: number | null; y: number | null }[]
  >([])
  const [isGameFinish, setIsGameFinish] = useState(false)

  const handleSelectBlockPlace = (x: number, y: number) => {
    setSelectedBlock({ x, y })
  }

  const handleSelectedBlockBoard = (index: number, x: number, y: number) => {
    setRevealedBlock((prevProps) => [...prevProps, { index, x, y }])
  }

  const handleClickImageSet = (value: string) => {
    setSelectedImageSet(value)
  }

  const handleClickClearImageSet = () => {
    setSelectedImageSet('')
    handleClickPlayAgainButton()
  }

  const handleClickPlayAgainButton = () => {
    setIsGameFinish(false)
    setSelectedBlock({ x: null, y: null })
    setRevealedBlock([])
    setSelectedImage('')
  }

  if (windowSize.width <= 1024) {
    imageWidth = 115
  }

  useEffect(() => {
    setIsGameFinish(revealedBlocks.length === blocks.length)
  }, [revealedBlocks])

  useEffect(() => {
    if (!selectedImage && selectedImageSet) {
      const randomNo = Math.floor(Math.random() * 10) + 1
      const randomImage = `${process.env.REACT_APP_IMAGE_URL}/images/${selectedImageSet}/${randomNo}.jpg`
      setSelectedImage(randomImage)
    }
  }, [selectedImage, selectedImageSet])

  return (
    <div className="App">
      {selectedImageSet ? (
        <>
          <Board
            blocks={blocks}
            imageMultiple={imageMultiple}
            selectedBlock={selectedBlock}
            onClickBlock={handleSelectedBlockBoard}
            revealedBlocks={revealedBlocks}
            imageWidth={imageWidth}
            end={isGameFinish}
            selectedImage={selectedImage}
          />
          {isGameFinish ? (
            <div className="actionButtons">
              <button className="playButton" onClick={handleClickPlayAgainButton}>
                Main Lagi
              </button>

              <button className="playButton" onClick={handleClickClearImageSet}>
                Ubah Set Gambar
              </button>
            </div>
          ) : (
            <BlockPlace
              blocks={blocks}
              imageMultiple={imageMultiple}
              onClickBlock={handleSelectBlockPlace}
              revealedBlocks={revealedBlocks}
              imageWidth={imageWidth}
              selectedImage={selectedImage}
            />
          )}
        </>
      ) : (
        <div className="actionButtons">
          {IMAGE_SETS.map((set) => (
            <button
              className="playButton"
              key={set.value}
              onClick={() => handleClickImageSet(set.value)}
            >
              {set.label}
            </button>
          ))}
        </div>
      )}

      {isGameFinish && (
        <Confetti height={windowSize.height} width={windowSize.width} recycle={false} />
      )}
    </div>
  )
}

export default memo(App)

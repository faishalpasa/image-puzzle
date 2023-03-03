import React, { useState, memo, useEffect } from 'react'
import Confetti from 'react-confetti'

import './App.css'
import packageVariable from '../package.json'
import Board from 'components/Board'
import BlockPlace from 'components/BlockPlace'
import { IMAGE_SETS } from 'constants/images'
import useWindowSize from 'hooks/useWindowSize'

const backgroundSound = new Audio(`${process.env.REACT_APP_IMAGE_URL}/sounds/background.mp3`)
const cheerSound = new Audio(`${process.env.REACT_APP_IMAGE_URL}/sounds/cheers.mp3`)
const wrongBlockSound = new Audio(`${process.env.REACT_APP_IMAGE_URL}/sounds/wrong-block.mp3`)

const blocks = [
  { id: 1, x: 0, y: 0, borderRadius: '16px 0px 0px 0px' },
  { id: 2, x: -1, y: 0, borderRadius: '0px 0px 0px 0px' },
  { id: 3, x: -2, y: 0, borderRadius: '0px 16px 0px 0px' },
  { id: 4, x: 0, y: -1, borderRadius: '0px 0px 0px 0px' },
  { id: 5, x: -1, y: -1, borderRadius: '0px 0px 0px 0px' },
  { id: 6, x: -2, y: -1, borderRadius: '0px 0px 0px 0px' },
  { id: 7, x: 0, y: -2, borderRadius: '0px 0px 0px 16px' },
  { id: 8, x: -1, y: -2, borderRadius: '0px 0px 0px 0px' },
  { id: 9, x: -2, y: -2, borderRadius: '0px 0px 16px 0px' }
]

const imageMultiple = 3
let imageWidth = 150

let randomNo = Math.floor(Math.random() * 10) + 1

const playBackgroundSound = () => {
  if (backgroundSound) {
    backgroundSound.volume = 1
    backgroundSound.loop = true
    backgroundSound.currentTime = 0
    backgroundSound.play()
  }
}

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
  const [isPlayed, setIsPlayed] = useState(false)

  const handleSelectBlockPlace = (x: number, y: number) => {
    setSelectedBlock({ x, y })
  }

  const handleSelectBlockBoard = (index: number, x: number, y: number) => {
    setRevealedBlock((prevProps) => [...prevProps, { index, x, y }])
    setSelectedBlock({ x: null, y: null })
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

  const handleClickPlayButton = () => {
    setIsPlayed(true)
    playBackgroundSound()
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }

  if (windowSize.width <= 1024) {
    imageWidth = 115
  }

  useEffect(() => {
    if (revealedBlocks.length === blocks.length) {
      if (randomNo < 10) {
        randomNo += 1
      } else {
        randomNo = 1
      }
      setIsGameFinish(true)
      playSFXSound('finish')
    }
  }, [revealedBlocks])

  useEffect(() => {
    if (!selectedImage && selectedImageSet) {
      const randomImage = `${process.env.REACT_APP_IMAGE_URL}/images/${selectedImageSet}/${randomNo}.jpg`
      setSelectedImage(randomImage)
    }
  }, [selectedImage, selectedImageSet])

  return (
    <div className="App">
      {!isPlayed ? (
        <div className="intro">
          <img
            src={`${process.env.REACT_APP_IMAGE_URL}/images/logo.png`}
            alt="logo"
            className="logo"
          ></img>
          <button className="playButton" onClick={handleClickPlayButton}>
            Main
          </button>
          <p className="version">version {packageVariable.version}</p>
          <p className="copyright">uje was here</p>
        </div>
      ) : (
        <>
          {selectedImageSet ? (
            <>
              <Board
                blocks={blocks}
                imageMultiple={imageMultiple}
                selectedBlock={selectedBlock}
                onClickBlock={handleSelectBlockBoard}
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
            <div className="mainMenu">
              <img
                src={`${process.env.REACT_APP_IMAGE_URL}/images/logo.png`}
                alt="logo"
                className="logo"
              ></img>
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
            </div>
          )}
        </>
      )}

      {isGameFinish && (
        <Confetti height={windowSize.height} width={windowSize.width} recycle={false} />
      )}
    </div>
  )
}

export default memo(App)

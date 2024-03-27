import { useState, useRef, useMemo, MouseEventHandler } from 'react'
import React from 'react'
import './style.scss'

type RectCoord = {
  startX: number
  startY: number
  endX: number
  endY: number
}

const CutWrapper: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false)

  const isDraw = useRef<boolean>(false)

  const [showToolbar, setShowToolbar] = useState<boolean>(false)

  const [rectPos, setRectPos] = useState<RectCoord>({
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
  })

  const clipPath = useMemo(() => {
    const { startX, startY, endX, endY } = rectPos
    const x0 = startX > endX ? endX : startX
    const y0 = startY > endY ? endY : startY
    const x1 = startX > endX ? startX : endX
    const y1 = startY > endY ? startY : endY

    const paths = [
      '0% 0%',
      '0% 100%',
      `${x0}px 100%`,
      `${x0}px ${y0}px`,
      `${x1}px ${y0}px`,
      `${x1}px ${y1}px`,
      `${x0}px ${y1}px`,
      `${x0}px 100%`,
      `100% 100%`,
      `100% 0`,
    ]

    return `polygon(${paths.join(',')})`
  }, [rectPos])

  const rectStyle = useMemo(() => {
    const { startX, startY, endX, endY } = rectPos

    const x0 = startX > endX ? endX : startX
    const y0 = startY > endY ? endY : startY
    const x1 = startX > endX ? startX : endX
    const y1 = startY > endY ? startY : endY

    return {
      left: `${x0}px`,
      top: `${y0}px`,
      width: `${x1 - x0}px`,
      height: `${y1 - y0}px`,
    }
  }, [rectPos])

  const onMouseDown: MouseEventHandler = (event) => {
    isDraw.current = true
    const { pageX, pageY } = event
    setRectPos((pos) => {
      return {
        ...pos,
        startX: pageX,
        startY: pageY,
      }
    })
  }

  const onMouseMove: MouseEventHandler = (event) => {
    if (!isDraw.current) {
      return
    }

    const { pageX, pageY } = event

    setRectPos((pos) => {
      return {
        ...pos,
        endX: pageX,
        endY: pageY,
      }
    })
  }

  const onMouseUp: MouseEventHandler = (event) => {
    const { pageX, pageY } = event
    setRectPos((pos) => {
      return {
        ...pos,
        endX: pageX,
        endY: pageY,
      }
    })
    isDraw.current = false
  }

  return (
    <div
      className="cut-wrapper"
      style={{ clipPath }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      <div className="cut-container" style={rectStyle}></div>
    </div>
  )
}

export default CutWrapper

import { useState, useEffect, useRef, useMemo } from 'react'
import { listener } from 'story-tools'
import React from 'react'
import './style.scss'

type RectCoord = {
  startX: number
  startY: number
  endX: number
  endY: number
}

export default function () {
  const [visible, setVisible] = useState<boolean>(false)

  const containerRef = useRef<HTMLDivElement>(null)

  const isDraw = useRef<boolean>(false)

  const [rectPos, setRectPos] = useState<RectCoord>({
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
  })

  useEffect(() => {
    const off = listener(document.body, 'keyup', (e) => {
      if ((e as KeyboardEvent).keyCode === 112) {
        console.log('说明是F1')
        setVisible(true)
      }
    })
    return () => {
      off()
    }
  }, [])

  useEffect(() => {
    let closeMouseDown: () => void
    let closeMouseUp: () => void
    let closeMouseMove: () => void
    if (visible && containerRef.current) {
      closeMouseDown = listener(
        containerRef.current,
        'mousedown',
        (downEvent) => {
          const { clientX, clientY } = downEvent as MouseEvent

          setRectPos((pos) => ({
            ...pos,
            startX: clientX,
            startY: clientY,
          }))

          if (containerRef.current) {
            closeMouseMove = listener(
              containerRef.current,
              'mousemove',
              (moveEvent) => {
                const { clientX, clientY } = moveEvent as MouseEvent
                isDraw.current = true
                setRectPos((pos) => ({
                  ...pos,
                  endX: clientX,
                  endY: clientY,
                }))
              }
            )
          }
        }
      )

      closeMouseUp = listener(containerRef.current, 'mouseup', (upEvent) => {
        const { clientX, clientY } = upEvent as MouseEvent

        setRectPos((pos) => ({
          ...pos,
          endX: clientX,
          endY: clientY,
        }))

        // isDraw.current = false

        closeMouseMove?.()
      })
    }

    return () => {
      closeMouseDown?.()
      closeMouseUp?.()
    }
  }, [visible])

  const clipPath = useMemo(() => {
    const { startX, startY, endX, endY } = rectPos

    if (!isDraw.current) {
      return ''
    }

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

  return (
    visible && (
      <div className="cut-wrapper" ref={containerRef} style={{ clipPath }}>
        <div className="cut-container" style={rectStyle}></div>
      </div>
    )
  )
}

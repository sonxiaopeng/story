import { useState, useEffect } from 'react'
import React from 'react'

export default function () {
  const [num, setNum] = useState<number>(0)

  const onAdd = () => {
    setNum(num + 1)
  }

  useEffect(() => {
    console.log('开始执行')
  }, [])

  return (
    <div>
      <h1 className="title">this is a cut component</h1>
      <h2>{num}</h2>
      <button onClick={onAdd}>+1</button>
    </div>
  )
}

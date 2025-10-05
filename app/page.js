'use client'
import { useState, useRef, useEffect } from 'react'

export default function FloorPlanDesigner() {
  const [mode, setMode] = useState('after')
  const [prompt, setPrompt] = useState('')
  const [rooms, setRooms] = useState([])
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, 800, 600)
    
    // Draw grid
    ctx.strokeStyle = '#e0e0e0'
    for (let x = 0; x < 800; x += 20) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, 600)
      ctx.stroke()
    }
    for (let y = 0; y < 600; y += 20) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(800, y)
      ctx.stroke()
    }

    // Draw rooms
    rooms.forEach(room => {
      const colors = { bedroom: '#e3f2fd', bathroom: '#f3e5f5', kitchen: '#fff3e0', living: '#f5f5f5' }
      ctx.fillStyle = colors[room.type] || '#f5f5f5'
      ctx.fillRect(room.x, room.y, room.width, room.height)
      ctx.strokeStyle = '#666'
      ctx.lineWidth = 2
      ctx.strokeRect(room.x, room.y, room.width, room.height)
      ctx.fillStyle = '#000'
      ctx.font = '12px sans-serif'
      ctx.fillText(room.name, room.x + 10, room.y + 20)
    })
  }, [rooms])

  const generate = () => {
    const newRooms = []
    const text = prompt.toLowerCase()
    let x = 50, y = 50

    if (text.includes('bedroom')) {
      const count = (text.match(/bedroom/g) || []).length
      for (let i = 0; i < count; i++) {
        newRooms.push({ 
          type: 'bedroom', 
          name: 'Bedroom ' + String.fromCharCode(65 + i), 
          x: x + (i % 2) * 250, 
          y: y + Math.floor(i / 2) * 200, 
          width: 200, 
          height: 180 
        })
      }
    }
    if (text.includes('bathroom')) {
      newRooms.push({ type: 'bathroom', name: 'Bathroom', x: x + 300, y: y + 200, width: 150, height: 120 })
    }
    if (text.includes('kitchen')) {
      newRooms.push({ type: 'kitchen', name: 'Kitchen', x: x, y: y + 250, width: 240, height: 180 })
    }
    if (text.includes('living')) {
      newRooms.push({ type: 'living', name: 'Living Room', x: x + 250, y: y, width: 280, height: 200 })
    }
    setRooms(newRooms)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-2xl">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">AI Floor Plan Designer</h1>
            <div className="flex gap-2">
              <button onClick={() => setMode('before')} className={mode === 'before' ? 'px-6 py-2 rounded-lg bg-white text-blue-600 font-semibold' : 'px-6 py-2 rounded-lg bg-blue-500 text-white'}>Before</button>
              <button onClick={() => setMode('after')} className={mode === 'after' ? 'px-6 py-2 rounded-lg bg-white text-indigo-600 font-semibold' : 'px-6 py-2 rounded-lg bg-indigo-500 text-white'}>After</button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          <div>
            <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200">
              <h3 className="font-bold mb-3">AI Description</h3>
              <textarea 
                value={prompt} 
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="3 bedroom, 2 bathroom, kitchen, living room"
                className="w-full h-32 p-3 border rounded-lg"
              />
              <button onClick={generate} className="w-full mt-3 bg-purple-600 text-white py-2 rounded-lg font-semibold">Generate Floor Plan</button>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="border-2 rounded-lg overflow-hidden">
              <div className="bg-gray-800 text-white p-2 text-sm">Floor Plan - {mode}</div>
              <canvas ref={canvasRef} width={800} height={600} className="w-full bg-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

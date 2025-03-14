"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import HomeButton from "@/components/HomeButton"

// Vintage color palette
const vintageColors = [
  "#c23616", // Vintage red
  "#e67e22", // Vintage orange
  "#f1c40f", // Vintage yellow
  "#27ae60", // Vintage green
  "#2980b9", // Vintage blue
  "#8e44ad", // Vintage purple
  "#d35400", // Vintage burnt orange
  "#16a085", // Vintage teal
  "#7f8c8d", // Vintage gray
  "#c0392b", // Vintage dark red
]

export default function RoulettePage() {
  const [optionCount, setOptionCount] = useState(4)
  const [options, setOptions] = useState<string[]>(Array(4).fill(""))
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [rotationAngle, setRotationAngle] = useState(0)
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null)
  const [activeOptionIndex, setActiveOptionIndex] = useState<number | null>(null)
  const wheelRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Check if all options have content
  const allOptionsHaveContent = options.every((option) => option.trim() !== "")

  // Handle changing option count
  const handleOptionCountChange = (change: number) => {
    const newCount = Math.min(Math.max(optionCount + change, 2), 10)
    setOptionCount(newCount)

    // Adjust options array
    if (newCount > options.length) {
      // Add empty options
      setOptions([...options, ...Array(newCount - options.length).fill("")])
    } else if (newCount < options.length) {
      // Remove options
      setOptions(options.slice(0, newCount))
    }
  }

  // Handle updating an option
  const handleUpdateOption = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  // Reset the roulette
  const handleReset = () => {
    if (spinning) return // 돌아가는 중에는 초기화 방지

    setOptions(Array(optionCount).fill(""))
    setResult(null)
    setRotationAngle(0)
    setSelectedOptionIndex(null)
    setActiveOptionIndex(null)
  }

  // Draw the wheel on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 15

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw wheel segments
    const anglePerSegment = (2 * Math.PI) / optionCount

    for (let i = 0; i < optionCount; i++) {
      // Draw segment
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, i * anglePerSegment, (i + 1) * anglePerSegment)
      ctx.closePath()

      // Fill segment with color
      ctx.fillStyle = vintageColors[i % vintageColors.length]
      ctx.fill()

      // Highlight active segment
      if (i === activeOptionIndex) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
        ctx.fill()
      }

      // Add border
      ctx.lineWidth = 3
      ctx.strokeStyle = "#ffffff"
      ctx.stroke()

      // Add text or placeholder
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(i * anglePerSegment + anglePerSegment / 2)
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 18px Arial"

      // Position text in the middle of the segment
      const textRadius = radius * 0.65 // 텍스트 위치를 약간 안쪽으로 조정
      ctx.translate(textRadius, 0)
      ctx.rotate(Math.PI / 2) // Rotate text to be readable

      // 텍스트 정렬을 중앙으로 설정
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      // Wrap text if needed
      const maxWidth = radius * 0.5
      const displayText = options[i] || `옵션 ${i + 1}`
      ctx.fillText(displayText, 0, 0, maxWidth)

      ctx.restore()
    }

    // Draw center circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, 22, 0, 2 * Math.PI) // Increased center circle size
    ctx.fillStyle = "#333333"
    ctx.fill()
    ctx.lineWidth = 3
    ctx.strokeStyle = "#ffffff"
    ctx.stroke()

    // Draw outer border
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    ctx.lineWidth = 6 // Increased border width
    ctx.strokeStyle = "#333333"
    ctx.stroke()
  }, [options, optionCount, activeOptionIndex])

  // Handle canvas click to select segment
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (spinning) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    // Calculate distance from center
    const dx = x - centerX
    const dy = y - centerY
    const distance = Math.sqrt(dx * dx + dy * dy)

    // Check if click is within wheel radius
    const radius = Math.min(centerX, centerY) - 15
    if (distance > 22 && distance < radius) {
      // Adjusted for larger center circle
      // Calculate angle
      let angle = Math.atan2(dy, dx)
      if (angle < 0) angle += 2 * Math.PI

      // Determine segment
      const anglePerSegment = (2 * Math.PI) / optionCount
      const segmentIndex = Math.floor(angle / anglePerSegment) % optionCount

      // Set active segment
      setActiveOptionIndex(segmentIndex)

      // Focus input
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }
  }

  // Spin the wheel
  const spinWheel = () => {
    if (spinning || !allOptionsHaveContent) return

    setSpinning(true)
    setResult(null)
    setSelectedOptionIndex(null)
    setActiveOptionIndex(null)

    // Random number of full rotations (5-10) for longer spin
    const spinAngle = 360 * (5 + Math.random() * 5) + Math.random() * 360
    const totalAngle = rotationAngle + spinAngle
    setRotationAngle(totalAngle)

    // Calculate which option is selected after spinning
    setTimeout(() => {
      const normalizedAngle = totalAngle % 360
      const optionAngle = 360 / optionCount
      const selectedIndex = Math.floor((360 - normalizedAngle) / optionAngle) % optionCount
      setSelectedOptionIndex(selectedIndex)
      setResult(options[selectedIndex])
      setSpinning(false)
    }, 3500) // 3.5 seconds spin time
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <HomeButton />
      <main className="container mx-auto p-4 flex-grow">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-center mb-6">돌려 돌려 나만 아니면 되는 돌림판</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Roulette Wheel */}
            <div className="flex flex-col items-center">
              <div className="relative w-80 h-80 md:w-[480px] md:h-[480px] mb-6">
                {/* Wheel */}
                <div
                  ref={wheelRef}
                  className="absolute w-full h-full rounded-full overflow-hidden shadow-lg"
                  style={{
                    transform: `rotate(${rotationAngle}deg)`,
                    transition: spinning ? "transform 3.5s cubic-bezier(0.2, 0.8, 0.2, 1)" : "none",
                  }}
                >
                  <canvas
                    ref={canvasRef}
                    width="480" // Increased canvas size
                    height="480" // Increased canvas size
                    className="w-full h-full cursor-pointer"
                    onClick={handleCanvasClick}
                  />
                </div>
                {/* Pointer */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-16 z-10">
                  <div className="w-0 h-0 border-l-[24px] border-r-[24px] border-t-[36px] border-l-transparent border-r-transparent border-t-red-600"></div>
                </div>
              </div>

              <button
                onClick={spinWheel}
                disabled={spinning || !allOptionsHaveContent}
                className={`px-8 py-4 text-lg rounded-full text-white font-bold shadow-lg transition-all ${
                  spinning || !allOptionsHaveContent
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700 hover:shadow-xl"
                }`}
              >
                {spinning ? "돌아가는 중..." : allOptionsHaveContent ? "룰렛 돌리기" : "입력하는 중..."}
              </button>

              {result && (
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
                  <h3 className="text-lg font-semibold mb-1">결과:</h3>
                  <p className="text-3xl font-bold text-red-600">{result}</p>
                </div>
              )}
            </div>

            {/* Options Management */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">룰렛 설정</h2>
                <button
                  onClick={handleReset}
                  disabled={spinning}
                  className={`px-3 py-1 text-sm rounded font-medium ${
                    spinning
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  모든 옵션 초기화
                </button>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <label className="font-medium">룰렛 옵션 개수 추가하기 👉👉 </label>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleOptionCountChange(-1)}
                      disabled={optionCount <= 2}
                      className={`w-10 h-10 flex items-center justify-center rounded-l ${
                        optionCount <= 2 ? "bg-gray-200 text-gray-400" : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                    >
                      -
                    </button>
                    <div className="w-12 h-10 flex items-center justify-center bg-gray-100 border-t border-b">
                      {optionCount}
                    </div>
                    <button
                      onClick={() => handleOptionCountChange(1)}
                      disabled={optionCount >= 10}
                      className={`w-10 h-10 flex items-center justify-center rounded-r ${
                        optionCount >= 10 ? "bg-gray-200 text-gray-400" : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                    >
                      +
                    </button>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mb-4">룰렛 속 옵션을 클릭하면 입력할 수 있어요</p>

                {activeOptionIndex !== null && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg border">
                    <div className="flex justify-between items-center mb-2">
                      <label className="font-medium">옵션 {activeOptionIndex + 1} 내용:</label>
                      <button
                        onClick={() => handleUpdateOption(activeOptionIndex, "")}
                        className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                      >
                        지우기
                      </button>
                    </div>
                    <input
                      ref={inputRef}
                      type="text"
                      value={options[activeOptionIndex] || ""}
                      onChange={(e) => handleUpdateOption(activeOptionIndex, e.target.value)}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={`옵션 ${activeOptionIndex + 1} 내용 입력`}
                      maxLength={20}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2 max-h-[320px] overflow-y-auto">
                {options.map((option, index) => (
                  <div
                    key={index}
                    className={`flex items-center p-3 rounded cursor-pointer ${
                      activeOptionIndex === index ? "bg-blue-50 border border-blue-200" : "bg-gray-50"
                    }`}
                    onClick={() => setActiveOptionIndex(index)}
                  >
                    <div
                      className="w-5 h-5 rounded-full mr-3" // Slightly larger color indicator
                      style={{ backgroundColor: vintageColors[index % vintageColors.length] }}
                    ></div>
                    <div className="flex-1 truncate text-lg">
                      {option ? option : <span className="text-gray-400">옵션 {index + 1} (비어있음)</span>}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100 text-sm">
                <h3 className="font-semibold mb-2 text-base">사용 방법</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>+/- 버튼으로 옵션 개수를 조절하세요 (최소 2개 ~ 최대 10개).</li>
                  <li>룰렛 위에서 옵션을 클릭하여 내용을 입력하세요.</li>
                  <li>선택한 모든 옵션을 입력해야 룰렛을 돌릴 수 있어요.</li>
                  <li>초기화 버튼을 누르면 모든 옵션과 결과가 초기화됩니다.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}


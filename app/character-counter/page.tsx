"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import HomeButton from "@/components/HomeButton"

export default function CharacterCounter() {
  const [text, setText] = useState("")
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    lines: 0,
  })

  useEffect(() => {
    // Calculate statistics
    const characters = text.length
    const charactersNoSpaces = text.replace(/\s/g, "").length
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length
    const sentences = text.trim() === "" ? 0 : text.split(/[.!?]+/).filter(Boolean).length
    const paragraphs = text.trim() === "" ? 0 : text.split(/\n+/).filter(Boolean).length
    const lines = text.trim() === "" ? 0 : text.split("\n").length

    setStats({
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      lines,
    })
  }, [text])

  const handleClear = () => {
    setText("")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <HomeButton />
      <main className="container mx-auto p-4 flex-grow">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-center mb-6">글자수 세기</h1>

          <div className="mb-6">
            <label htmlFor="text-input" className="block mb-2 font-medium">
              텍스트를 입력하세요:
            </label>
            <textarea
              id="text-input"
              className="w-full h-64 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="여기에 텍스트를 입력하세요..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
            <div className="flex justify-end mt-2">
              <button
                onClick={handleClear}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
              >
                지우기
              </button>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-3">텍스트 통계</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded shadow-sm">
                <div className="text-sm text-gray-600">문자 (공백 포함)</div>
                <div className="text-2xl font-bold">{stats.characters}</div>
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <div className="text-sm text-gray-600">문자 (공백 제외)</div>
                <div className="text-2xl font-bold">{stats.charactersNoSpaces}</div>
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <div className="text-sm text-gray-600">단어</div>
                <div className="text-2xl font-bold">{stats.words}</div>
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <div className="text-sm text-gray-600">문장</div>
                <div className="text-2xl font-bold">{stats.sentences}</div>
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <div className="text-sm text-gray-600">문단</div>
                <div className="text-2xl font-bold">{stats.paragraphs}</div>
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <div className="text-sm text-gray-600">줄</div>
                <div className="text-2xl font-bold">{stats.lines}</div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-sm text-gray-600">
            <h3 className="font-semibold mb-2">글자수 세기 도구 사용법</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>텍스트 영역에 분석하고 싶은 텍스트를 입력하거나 붙여넣으세요.</li>
              <li>문자 수, 단어 수, 문장 수 등의 통계가 자동으로 계산됩니다.</li>
              <li>공백을 포함한 문자 수와 공백을 제외한 문자 수를 모두 확인할 수 있습니다.</li>
              <li>문단은 빈 줄로 구분된 텍스트 블록을 의미합니다.</li>
              <li>지우기 버튼을 클릭하여 텍스트를 초기화할 수 있습니다.</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}


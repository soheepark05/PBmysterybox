"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

// Expanded unit conversion data
const unitTypes = [
  {
    name: "길이 / 거리",
    units: [
      { name: "나노미터 (nm)", factor: 0.000000001 },
      { name: "마이크로미터 (μm)", factor: 0.000001 },
      { name: "밀리미터 (mm)", factor: 0.001 },
      { name: "센티미터 (cm)", factor: 0.01 },
      { name: "데시미터 (dm)", factor: 0.1 },
      { name: "미터 (m)", factor: 1 },
      { name: "킬로미터 (km)", factor: 1000 },
      { name: "인치 (in)", factor: 0.0254 },
      { name: "피트 (ft)", factor: 0.3048 },
      { name: "야드 (yd)", factor: 0.9144 },
      { name: "마일 (mi)", factor: 1609.344 },
      { name: "해리 (nmi)", factor: 1852 },
      { name: "광년 (ly)", factor: 9.461e15 },
      { name: "천문단위 (AU)", factor: 1.496e11 },
      { name: "파섹 (pc)", factor: 3.086e16 },
    ],
  },
  {
    name: "무게 / 질량",
    units: [
      { name: "나노그램 (ng)", factor: 0.000000000001 },
      { name: "마이크로그램 (μg)", factor: 0.000000001 },
      { name: "밀리그램 (mg)", factor: 0.000001 },
      { name: "그램 (g)", factor: 0.001 },
      { name: "킬로그램 (kg)", factor: 1 },
      { name: "톤 (t)", factor: 1000 },
      { name: "온스 (oz)", factor: 0.02835 },
      { name: "파운드 (lb)", factor: 0.45359 },
      { name: "스톤 (st)", factor: 6.35029 },
      { name: "미국 톤 (short ton)", factor: 907.185 },
      { name: "영국 톤 (long ton)", factor: 1016.05 },
      { name: "카라트 (ct)", factor: 0.0002 },
      { name: "원자질량단위 (u)", factor: 1.66053886e-27 },
    ],
  },
  {
    name: "면적",
    units: [
      { name: "제곱 밀리미터 (mm²)", factor: 0.000001 },
      { name: "제곱 센티미터 (cm²)", factor: 0.0001 },
      { name: "제곱 데시미터 (dm²)", factor: 0.01 },
      { name: "제곱 미터 (m²)", factor: 1 },
      { name: "아르 (a)", factor: 100 },
      { name: "헥타르 (ha)", factor: 10000 },
      { name: "제곱 킬로미터 (km²)", factor: 1000000 },
      { name: "제곱 인치 (in²)", factor: 0.00064516 },
      { name: "제곱 피트 (ft²)", factor: 0.092903 },
      { name: "제곱 야드 (yd²)", factor: 0.836127 },
      { name: "에이커 (acre)", factor: 4046.86 },
      { name: "제곱 마일 (mi²)", factor: 2589988.11 },
    ],
  },
  {
    name: "부피",
    units: [
      { name: "세제곱 밀리미터 (mm³)", factor: 0.000000001 },
      { name: "세제곱 센티미터 (cm³)", factor: 0.000001 },
      { name: "밀리리터 (mL)", factor: 0.000001 },
      { name: "센티리터 (cL)", factor: 0.00001 },
      { name: "데시리터 (dL)", factor: 0.0001 },
      { name: "리터 (L)", factor: 0.001 },
      { name: "세제곱 미터 (m³)", factor: 1 },
      { name: "세제곱 인치 (in³)", factor: 0.000016387 },
      { name: "세제곱 피트 (ft³)", factor: 0.028317 },
      { name: "세제곱 야드 (yd³)", factor: 0.764555 },
      { name: "갤런 (미국) (gal)", factor: 0.003785 },
      { name: "갤런 (영국) (gal)", factor: 0.00454609 },
      { name: "쿼트 (미국) (qt)", factor: 0.000946353 },
      { name: "파인트 (미국) (pt)", factor: 0.000473176 },
      { name: "온스 (미국 액체) (fl oz)", factor: 0.0000295735 },
      { name: "배럴 (석유) (bbl)", factor: 0.158987 },
    ],
  },
  {
    name: "속도",
    units: [
      { name: "미터/초 (m/s)", factor: 1 },
      { name: "킬로미터/시 (km/h)", factor: 0.277778 },
      { name: "마일/시 (mph)", factor: 0.44704 },
      { name: "노트 (knot)", factor: 0.514444 },
      { name: "피트/초 (ft/s)", factor: 0.3048 },
      { name: "마하 (해수준) (Mach)", factor: 340.29 },
      { name: "광속 (c)", factor: 299792458 },
    ],
  },
  {
    name: "온도",
    units: [
      { name: "섭씨 (°C)", factor: 1, offset: 0 },
      { name: "화씨 (°F)", factor: 5 / 9, offset: -32 },
      { name: "켈빈 (K)", factor: 1, offset: -273.15 },
      { name: "랭킨 (°R)", factor: 5 / 9, offset: -491.67 },
    ],
  },
  {
    name: "시간",
    units: [
      { name: "나노초 (ns)", factor: 1e-9 },
      { name: "마이크로초 (μs)", factor: 1e-6 },
      { name: "밀리초 (ms)", factor: 0.001 },
      { name: "초 (s)", factor: 1 },
      { name: "분 (min)", factor: 60 },
      { name: "시간 (h)", factor: 3600 },
      { name: "일 (day)", factor: 86400 },
      { name: "주 (week)", factor: 604800 },
      { name: "월 (30일) (month)", factor: 2592000 },
      { name: "년 (365일) (year)", factor: 31536000 },
      { name: "세기 (century)", factor: 3153600000 },
    ],
  },
  {
    name: "압력",
    units: [
      { name: "파스칼 (Pa)", factor: 1 },
      { name: "킬로파스칼 (kPa)", factor: 1000 },
      { name: "메가파스칼 (MPa)", factor: 1000000 },
      { name: "바 (bar)", factor: 100000 },
      { name: "밀리바 (mbar)", factor: 100 },
      { name: "대기압 (atm)", factor: 101325 },
      { name: "토르 (Torr)", factor: 133.322 },
      { name: "수은 밀리미터 (mmHg)", factor: 133.322 },
      { name: "수은 인치 (inHg)", factor: 3386.39 },
      { name: "물 인치 (inH2O)", factor: 249.089 },
      { name: "파운드/제곱인치 (psi)", factor: 6894.76 },
    ],
  },
  {
    name: "에너지",
    units: [
      { name: "줄 (J)", factor: 1 },
      { name: "킬로줄 (kJ)", factor: 1000 },
      { name: "메가줄 (MJ)", factor: 1000000 },
      { name: "칼로리 (cal)", factor: 4.184 },
      { name: "킬로칼로리 (kcal)", factor: 4184 },
      { name: "와트시 (Wh)", factor: 3600 },
      { name: "킬로와트시 (kWh)", factor: 3600000 },
      { name: "전자볼트 (eV)", factor: 1.602176634e-19 },
      { name: "영국 열량 단위 (BTU)", factor: 1055.06 },
      { name: "석유 배럴 (boe)", factor: 6.1178632e9 },
      { name: "톤 TNT (tTNT)", factor: 4.184e9 },
    ],
  },
  {
    name: "전력",
    units: [
      { name: "와트 (W)", factor: 1 },
      { name: "킬로와트 (kW)", factor: 1000 },
      { name: "메가와트 (MW)", factor: 1000000 },
      { name: "기가와트 (GW)", factor: 1000000000 },
      { name: "마력 (hp)", factor: 745.7 },
      { name: "마력 (영국) (bhp)", factor: 745.7 },
      { name: "마력 (미터법) (PS)", factor: 735.5 },
      { name: "줄/초 (J/s)", factor: 1 },
      { name: "BTU/시간 (BTU/h)", factor: 0.2930711 },
    ],
  },
  {
    name: "데이터",
    units: [
      { name: "비트 (bit)", factor: 1 },
      { name: "바이트 (B)", factor: 8 },
      { name: "킬로비트 (Kbit)", factor: 1000 },
      { name: "킬로바이트 (KB)", factor: 8000 },
      { name: "메가비트 (Mbit)", factor: 1000000 },
      { name: "메가바이트 (MB)", factor: 8000000 },
      { name: "기가비트 (Gbit)", factor: 1000000000 },
      { name: "기가바이트 (GB)", factor: 8000000000 },
      { name: "테라비트 (Tbit)", factor: 1000000000000 },
      { name: "테라바이트 (TB)", factor: 8000000000000 },
      { name: "페타비트 (Pbit)", factor: 1000000000000000 },
      { name: "페타바이트 (PB)", factor: 8000000000000000 },
      { name: "키비바이트 (KiB)", factor: 8192 },
      { name: "메비바이트 (MiB)", factor: 8388608 },
      { name: "기비바이트 (GiB)", factor: 8589934592 },
      { name: "테비바이트 (TiB)", factor: 8796093022208 },
    ],
  },
]

export default function UnitConverter() {
  const [selectedType, setSelectedType] = useState(unitTypes[0])
  const [inputValue, setInputValue] = useState("")
  const [fromUnit, setFromUnit] = useState(selectedType.units[0])
  const [toUnit, setToUnit] = useState(selectedType.units[1])
  const [result, setResult] = useState("")
  const [showHistory, setShowHistory] = useState(false)
  const [conversionHistory, setConversionHistory] = useState<string[]>([])

  // Update units when type changes
  useEffect(() => {
    setFromUnit(selectedType.units[0])
    setToUnit(selectedType.units[1])
  }, [selectedType])

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = unitTypes.find((type) => type.name === e.target.value)
    if (selected) setSelectedType(selected)
  }

  const handleConvert = () => {
    if (!inputValue) return

    let convertedValue: number

    // Special case for temperature
    if (selectedType.name === "온도") {
      // Convert to base unit (Celsius) first
      let baseValue: number
      if (fromUnit.name.includes("화씨")) {
        baseValue = ((Number.parseFloat(inputValue) - 32) * 5) / 9
      } else if (fromUnit.name.includes("켈빈")) {
        baseValue = Number.parseFloat(inputValue) - 273.15
      } else if (fromUnit.name.includes("랭킨")) {
        baseValue = ((Number.parseFloat(inputValue) - 491.67) * 5) / 9
      } else {
        baseValue = Number.parseFloat(inputValue)
      }

      // Convert from base unit to target unit
      if (toUnit.name.includes("화씨")) {
        convertedValue = (baseValue * 9) / 5 + 32
      } else if (toUnit.name.includes("켈빈")) {
        convertedValue = baseValue + 273.15
      } else if (toUnit.name.includes("랭킨")) {
        convertedValue = ((baseValue + 273.15) * 9) / 5
      } else {
        convertedValue = baseValue
      }
    } else {
      // For other unit types, use simple ratio conversion
      const baseValue = Number.parseFloat(inputValue) * fromUnit.factor
      convertedValue = baseValue / toUnit.factor
    }

    const formattedResult = convertedValue.toLocaleString("ko-KR", {
      maximumFractionDigits: 10,
      minimumFractionDigits: 0,
    })

    setResult(formattedResult)

    // Add to history
    const historyItem = `${inputValue} ${fromUnit.name} = ${formattedResult} ${toUnit.name}`
    setConversionHistory((prev) => [historyItem, ...prev.slice(0, 9)])
  }

  // Generate list of all supported units
  const generateUnitsList = () => {
    const categories = unitTypes.map((type) => {
      // Extract unit names with their symbols
      const unitNames = type.units
        .map((unit) => {
          const fullName = unit.name
          const match = fullName.match(/(.+) $$(.+)$$/)
          if (match) {
            return `${match[1]}(${match[2]})`
          }
          return fullName
        })
        .join(", ")

      return `${type.name}: ${unitNames}`
    })

    return categories
  }

  const unitsList = generateUnitsList()

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto p-4 flex-grow">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-center mb-6">오영이의 단위 환산 계산기</h1>

          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h2 className="text-lg font-semibold mb-4">빠른 단위 변환기</h2>
            <div className="mb-4">
              <label className="block mb-2">원래 값:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="예제: 300cm 또는 3x10^2cm"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            <div className="flex justify-center">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleConvert}>
                변환
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">측정 단위를 기본 계산기로:</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-2">측정 방식:</label>
                <select className="w-full p-2 border rounded" value={selectedType.name} onChange={handleTypeChange}>
                  {unitTypes.map((type) => (
                    <option key={type.name} value={type.name}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-2">원래 값:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="예제: 3 m 또는 cm"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-2">원래 단위:</label>
                <select
                  className="w-full p-2 border rounded"
                  value={fromUnit.name}
                  onChange={(e) => {
                    const unit = selectedType.units.find((u) => u.name === e.target.value)
                    if (unit) setFromUnit(unit)
                  }}
                >
                  {selectedType.units.map((unit) => (
                    <option key={unit.name} value={unit.name}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2">대상 단위:</label>
                <select
                  className="w-full p-2 border rounded"
                  value={toUnit.name}
                  onChange={(e) => {
                    const unit = selectedType.units.find((u) => u.name === e.target.value)
                    if (unit) setToUnit(unit)
                  }}
                >
                  {selectedType.units.map((unit) => (
                    <option key={unit.name} value={unit.name}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="showHistory"
                className="mr-2"
                checked={showHistory}
                onChange={() => setShowHistory(!showHistory)}
              />
              <label htmlFor="showHistory">과학적 기수법에 따른 출력</label>
            </div>

            <div className="flex justify-center">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleConvert}>
                변환
              </button>
            </div>
          </div>

          {result && (
            <div className="bg-green-50 p-4 rounded-lg mb-6 border border-green-200">
              <h3 className="font-semibold mb-2">변환 결과:</h3>
              <p className="text-lg">
                {inputValue} {fromUnit.name} = <span className="font-bold">{result}</span> {toUnit.name}
              </p>
            </div>
          )}

          {showHistory && conversionHistory.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">최근 변환 기록:</h3>
              <ul className="bg-gray-50 p-2 rounded border">
                {conversionHistory.map((item, index) => (
                  <li key={index} className="py-1 border-b last:border-b-0">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 text-sm text-gray-600">
            <h3 className="font-semibold mb-2">지원하는 단위 목록</h3>
            <ul className="list-disc pl-5 space-y-1">
              {unitsList.map((category, index) => (
                <li key={index}>{category}</li>
              ))}
            </ul>
            <p className="mt-4 text-blue-600">추가로 변환하고 싶은 단위는 master@puplebean.co.kr 로 문의주세요.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}


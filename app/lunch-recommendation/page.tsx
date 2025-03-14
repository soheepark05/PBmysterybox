"use client"

import { useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import HomeButton from "@/components/HomeButton"

// 카테고리별 음식 데이터
const foodCategories = {
  한식: [
    "김치찌개",
    "된장찌개",
    "순두부찌개",
    "부대찌개",
    "비빔밥",
    "돌솥비빔밥",
    "육회비빔밥",
    "불고기",
    "제육볶음",
    "닭갈비",
    "삼겹살",
    "감자탕",
    "뼈해장국",
    "설렁탕",
    "곰탕",
    "낙곱새",
    "쭈꾸미볶음",
    "알탕",
    "아구찜",
    "전복죽",
    "호박죽",
    "팥죽",
    "해물파전",
    "김치전",
    "부추전",
    "빈대떡",
    "찜닭",
    "간장게장",
    "양념게장",
    "콩나물국밥",
    "순대국밥",
    "돼지국밥",
    "족발",
    "보쌈",
    "도토리묵",
    "닭한마리",
    "닭곰탕",
    "오리백숙",
  ],
  중식: [
    "짜장면",
    "짬뽕",
    "우육면",
    "탄탄면",
    "볶음밥",
    "마파두부 덮밥",
    "유린기 덮밥",
    "깐풍기",
    "유린기",
    "라조기",
    "마라샹궈",
    "양장피",
    "고추잡채",
    "깐쇼새우",
    "마라탕",
    "마라샹궈",
    "훠궈",
    "딤섬",
    "샤오롱바오",
    "춘권(춘권튀김)",
    "동파육",
    "오향장육",
    "북경오리",
  ],
  일식: [
    "초밥(연어초밥, 참치초밥, 장어초밥)",
    "사시미(모둠회, 참치회, 연어회)",
    "돈카츠",
    "치킨카츠",
    "가츠동",
    "오야코동",
    "규동",
    "장어덮밥",
    "사케동(연어덮밥)",
    "라멘(쇼유라멘, 미소라멘, 돈코츠라멘)",
    "우동(튀김우동, 카레우동, 냉우동)",
    "소바(자루소바, 텐자루소바, 카케소바)",
    "오코노미야끼",
    "다코야끼",
    "나베요리(스키야키, 샤브샤브, 오뎅나베)",
  ],
  양식: [
    "스테이크(안심, 등심, 립아이, 토마호크)",
    "파스타(크림파스타, 토마토파스타, 봉골레파스타)",
    "피자(페퍼로니, 고르곤졸라, 마르게리타)",
    "햄버거(치즈버거, 더블패티버거, 불고기버거)",
    "리조또(치킨리조또, 버섯크림리조또, 해산물리조또)",
    "뇨끼",
    "라자냐",
    "카프레제",
    "수프(양송이수프, 브로콜리수프, 감자수프)",
    "핫도그",
    "샌드위치(클럽샌드위치, BLT, 바게트샌드위치)",
    "오믈렛",
    "프렌치토스트",
    "팬케이크",
  ],
  아시안: [
    "베트남 쌀국수(소고기쌀국수, 해산물쌀국수)",
    "분짜",
    "반미",
    "반쎄오",
    "팟타이",
    "똠얌꿍",
    "카오팟(태국 볶음밥)",
    "나시고랭",
    "미고랭",
    "바비굴링(인도네시아)",
    "카레(인도카레, 일본카레, 태국식 레드카레)",
    "스프링롤",
    "딤섬",
    "만두류",
  ],
  멕시칸: [
    "타코(소고기타코, 치킨타코, 새우타코)",
    "부리또",
    "퀘사디아",
    "파히타",
    "나초",
    "살사 & 과카몰리",
    "치폴레 샐러드",
    "엘로테(멕시칸 길거리 옥수수)",
    "치미창가",
    "또르띠야 수프",
    "칠리 콘 카르네(멕시코식 스튜)",
  ],
  다이어트식: [
    "닭가슴살 샐러드",
    "연어 샐러드",
    "아보카도 토스트",
    "오트밀",
    "현미밥",
    "두부 스테이크",
    "병아리콩 샐러드",
    "닭가슴살 브리또",
    "곤약볶음밥",
    "스무디볼",
    "그릭요거트볼",
    "단백질 쉐이크",
    "바나나 오트밀 팬케이크",
    "오트밀 팬케이크",
    "고구마 스틱",
  ],
  분식: [
    "떡볶이(국물떡볶이, 로제떡볶이, 짜장떡볶이)",
    "김밥(참치김밥, 치즈김밥, 제육김밥)",
    "라면(진라면, 너구리, 신라면, 짜파게티)",
    "튀김(오징어튀김, 김말이, 고구마튀김)",
    "순대",
    "어묵",
    "핫바",
    "토스트(길거리 토스트, 햄치즈토스트)",
    "호떡",
    "붕어빵",
    "계란빵",
  ],
}

export default function LunchRecommendation() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [recommendedFood, setRecommendedFood] = useState<string | null>(null)

  // 카테고리 선택 핸들러
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)

    // 해당 카테고리에서 무작위로 음식 선택
    const foods = foodCategories[category as keyof typeof foodCategories]
    const randomIndex = Math.floor(Math.random() * foods.length)
    setRecommendedFood(foods[randomIndex])
  }

  // 다시 추천받기 핸들러
  const handleRecommendAgain = () => {
    if (selectedCategory) {
      const foods = foodCategories[selectedCategory as keyof typeof foodCategories]
      const randomIndex = Math.floor(Math.random() * foods.length)
      setRecommendedFood(foods[randomIndex])
    }
  }

  // 처음으로 돌아가기 핸들러
  const handleReset = () => {
    setSelectedOption(null)
    setSelectedCategory(null)
    setRecommendedFood(null)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <HomeButton />
      <main className="container mx-auto p-4 flex-grow">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-center mb-6">오늘의 점메추 for 김스마트</h1>

          {!selectedOption ? (
            // 초기 화면 - 옵션 선택
            <div className="flex flex-col items-center justify-center space-y-8 py-12">
              <p className="text-xl text-center">오늘 점심 뭐 먹을지 고민되시나요?</p>

              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <button
                  onClick={() => setSelectedOption("random")}
                  className="flex-1 py-4 px-6 bg-[#e5e7eb] hover:bg-gray-300 text-gray-800 rounded-lg shadow-md transition-colors duration-200 text-lg font-medium"
                >
                  무작위로 골라주기
                </button>

                <button
                  onClick={() => setSelectedOption("location")}
                  className="flex-1 py-4 px-6 bg-[#4ade80] hover:bg-[#22c55e] text-white rounded-lg shadow-md transition-colors duration-200 text-lg font-medium"
                >
                  내 위치에 있는 식당 골라주기
                </button>
              </div>
            </div>
          ) : selectedOption === "random" && !selectedCategory ? (
            // 무작위 추천 - 카테고리 선택 화면
            <div className="py-6">
              <h2 className="text-xl font-semibold text-center mb-6">어떤 종류의 음식을 드시고 싶으신가요?</h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {Object.keys(foodCategories).map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className="p-4 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-lg shadow-sm transition-colors duration-200 font-medium"
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="flex justify-center mt-4">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                >
                  처음으로 돌아가기
                </button>
              </div>
            </div>
          ) : selectedOption === "random" && selectedCategory && recommendedFood ? (
            // 무작위 추천 - 결과 화면
            <div className="py-6 flex flex-col items-center">
              <h2 className="text-xl font-semibold text-center mb-2">오늘의 점심 추천 메뉴</h2>
              <p className="text-sm text-gray-500 mb-8">선택하신 카테고리: {selectedCategory}</p>

              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 w-full max-w-md mb-8">
                <p className="text-center text-3xl font-bold text-yellow-800">{recommendedFood}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleRecommendAgain}
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-colors"
                >
                  다른 메뉴 추천받기
                </button>

                <button
                  onClick={() => setSelectedCategory(null)}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg shadow-md transition-colors"
                >
                  다른 카테고리 선택하기
                </button>

                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg shadow-md transition-colors"
                >
                  처음으로 돌아가기
                </button>
              </div>
            </div>
          ) : selectedOption === "location" ? (
            // 위치 기반 추천 (아직 구현되지 않음)
            <div className="py-6 flex flex-col items-center">
              <p className="text-center text-lg mb-6">위치 기반 식당 추천 기능이 곧 추가될 예정입니다.</p>

              <button
                onClick={handleReset}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
              >
                처음으로 돌아가기
              </button>
            </div>
          ) : null}

          <div className="mt-8 text-sm text-gray-600">
            <h3 className="font-semibold mb-2">사용 방법</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>무작위로 골라주기: 다양한 점심 메뉴 중에서 무작위로 추천해 드립니다.</li>
              <li>내 위치에 있는 식당 골라주기: 현재 위치를 기반으로 주변 식당을 추천해 드립니다.</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}


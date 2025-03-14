import ExpandingCard from "../components/ExpandingCard"
import Header from "../components/Header"
import Footer from "../components/Footer"

const cards = [
  {
    title: "오영이의 단위 환산계산기",
    description: "오영이가 요청하는 단위 환산계산기",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/km-81yZuUwlylJ1R8QzzJsWgJ57C6e0Ia.svg",
    link: "/unit-converter",
  },
  {
    title: "글자수 세기",
    description: "텍스트의 글자 수, 단어 수, 문장 수 등을 셀 수 있어요.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/person-using-retro-computer.jpg-gcOYuBqtvAk9OtELgHtCCH2u6NoPl6.jpeg",
    link: "/character-counter",
  },
  {
    title: "룰렛 돌리기",
    description: "돌려~ 돌려~ 나만 안걸리면 되는 룰렛 돌리기",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%EB%A3%B0%EB%A0%9B%EB%8F%8C%EB%A6%AC%EA%B8%B0-62oUyRofQf6GSUqhtSw0CBfvgCDDW6.png",
    link: "/roulette",
  },
  {
    title: "오늘의 점메추 for 김스마트",
    description: "오늘 점심 뭐 먹지? 고민될 때 추천해 드립니다.",
    image: "/placeholder.svg?height=200&width=400&text=오늘의+점메추",
    link: "/lunch-recommendation",
  },
  {
    title: "웹페이지 5",
    description: "클릭하면 웹페이지로 이동합니다.",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "웹페이지 6",
    description: "클릭하면 웹페이지로 이동합니다.",
    image: "/placeholder.svg?height=200&width=400",
  },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto p-4 flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-6">
          {cards.map((card, index) => (
            <ExpandingCard
              key={index}
              title={card.title}
              description={card.description}
              image={card.image}
              link={card.link}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}


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
    title: "웹페이지 2",
    description: "클릭하면 웹페이지로 이동합니다.",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "웹페이지 3",
    description: "클릭하면 웹페이지로 이동합니다.",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "웹페이지 4",
    description: "클릭하면 웹페이지로 이동합니다.",
    image: "/placeholder.svg?height=200&width=400",
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


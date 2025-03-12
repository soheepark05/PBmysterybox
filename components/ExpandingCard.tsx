import Image from "next/image"
import Link from "next/link"

interface ExpandingCardProps {
  title: string
  description: string
  image: string
  link?: string
}

export default function ExpandingCard({ title, description, image, link = "#" }: ExpandingCardProps) {
  return (
    <Link href={link}>
      <div className="relative overflow-hidden h-[300px] rounded-lg shadow-md group cursor-pointer">
        <div className="relative h-full">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 transition-all duration-300 ease-in-out h-[100px] group-hover:h-[70%] overflow-hidden">
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <div className="transition-all duration-300 ease-in-out max-h-[40px] group-hover:max-h-[calc(100%-40px)] overflow-hidden">
              <p>{description}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}


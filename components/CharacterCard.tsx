import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface CharacterCardProps {
  id: number
  name: string
  species: string
  origin: string
  image: string
}

export function CharacterCard({ id, name, species, origin, image }: CharacterCardProps) {
  return (
    <Link href={`/character/${id}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105">
        <div className="relative h-64">
          <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h2 className="text-xl font-bold mb-1 truncate">{name}</h2>
            <p className="text-sm opacity-90 truncate">Species: {species}</p>
            <p className="text-sm opacity-90 truncate">Origin: {origin}</p>
          </div>
        </div>
      </Card>
    </Link>
  )
}

export function CharacterCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="h-64 w-full" />
      <CardContent className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-1" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
    </Card>
  )
}


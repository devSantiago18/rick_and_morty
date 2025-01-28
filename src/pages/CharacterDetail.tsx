import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface Character {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  image: string
  episode: string[]
  url: string
  created: string
}

export default function CharacterDetail() {
  const [character, setCharacter] = useState<Character | null>(null)
  const [loading, setLoading] = useState(true)
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchCharacter() {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
        const data = await response.json()
        setCharacter(data)
      } catch (error) {
        console.error("Error fetching character:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCharacter()
  }, [id])

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!character) {
    return <div className="flex justify-center items-center h-screen">Character not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row">
            <img
              src={character.image || "/placeholder.svg"}
              alt={character.name}
              className="w-full md:w-1/3 rounded-lg mb-4 md:mb-0 md:mr-6"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-4">{character.name}</h1>
              <p className="mb-2">
                <strong>Status:</strong> {character.status}
              </p>
              <p className="mb-2">
                <strong>Species:</strong> {character.species}
              </p>
              <p className="mb-2">
                <strong>Type:</strong> {character.type || "N/A"}
              </p>
              <p className="mb-2">
                <strong>Gender:</strong> {character.gender}
              </p>
              <p className="mb-2">
                <strong>Origin:</strong> {character.origin.name}
              </p>
              <p className="mb-2">
                <strong>Location:</strong> {character.location.name}
              </p>
              <p className="mb-2">
                <strong>First appearance:</strong> {new Date(character.created).toLocaleDateString()}
              </p>
              <p className="mb-2">
                <strong>Episodes:</strong> {character.episode.length}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Button
        onClick={() => navigate("/")}
        className="fixed bottom-8 right-8 bg-[#97ce4c] hover:bg-[#86b743] text-white"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Home
      </Button>
    </div>
  )
}


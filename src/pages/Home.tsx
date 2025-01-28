import { useRickAndMortyCharacters } from "../hooks/useRickAndMortyCharacters"
import { CharacterCard, CharacterCardSkeleton } from "../components/CharacterCard"
import { Pagination } from "../components/Pagination"
import { Navbar } from "../components/Navbar"

export default function Home() {
  const { characters, loading, error, currentPage, totalPages, changePage } = useRickAndMortyCharacters()

  if (error) return <div className="flex justify-center items-center h-screen">Error: {error}</div>

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {loading
            ? Array(20)
                .fill(0)
                .map((_, index) => <CharacterCardSkeleton key={index} />)
            : characters.map((character) => (
                <CharacterCard
                  key={character.id}
                  id={character.id}
                  name={character.name}
                  species={character.species}
                  origin={character.origin.name}
                  image={character.image}
                />
              ))}
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={changePage} />
      </main>
    </div>
  )
}


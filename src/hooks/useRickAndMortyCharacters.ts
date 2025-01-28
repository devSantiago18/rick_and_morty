import { useState, useEffect, useCallback } from "react"

interface Character {
  id: number
  name: string
  species: string
  origin: {
    name: string
  }
  image: string
}

interface ApiResponse {
  results: Character[]
  info: {
    count: number
    pages: number
    next: string | null
    prev: string | null
  }
}

export function useRickAndMortyCharacters() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const fetchCharacters = useCallback(async (page: number) => {
    setLoading(true)
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
      const data: ApiResponse = await response.json()
      setCharacters(data.results)
      setTotalPages(data.info.pages)
    } catch (err) {
      setError("Error fetching characters")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCharacters(currentPage)
  }, [fetchCharacters, currentPage])

  const changePage = (page: number) => {
    setCurrentPage(page)
  }

  return {
    characters,
    loading,
    error,
    currentPage,
    totalPages,
    changePage,
  }
}


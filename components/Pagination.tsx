import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex justify-between items-center mt-8">
      <Button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} variant="outline">
        <ChevronLeft className="h-4 w-4 mr-2" />
        Previous
      </Button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <Button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} variant="outline">
        Next
        <ChevronRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  )
}


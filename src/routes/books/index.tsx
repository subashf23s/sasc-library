
import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Search } from 'lucide-react'
import { getBooks } from '@/data/books'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const Route = createFileRoute('/books/')({
  component: BooksPage,
  loader: () => getBooks(),
})

function BooksPage() {
  const books = Route.useLoaderData()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'All' | 'Available' | 'Checked Out'>('All')

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'All' || book.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Library Catalog</h1>
          <p className="text-muted-foreground">
            Browse our collection of {books.length} books.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search books..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
             <Button 
                variant={statusFilter === 'All' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('All')}
                size="sm"
             >
                All
             </Button>
             <Button 
                variant={statusFilter === 'Available' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('Available')}
                size="sm"
             >
                Available
             </Button>
          </div>
        </div>
      </div>

      {filteredBooks.length === 0 ? (
        <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">No books found matching your criteria.</p>
            <Button variant="link" onClick={() => {setSearchQuery(''); setStatusFilter('All')}}>Clear filters</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <Card key={book.id} className="overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
              <div className="relative aspect-[2/3] overflow-hidden bg-muted group">
                 <img
                  src={book.cover}
                  alt={book.title}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
                 <Badge
                    variant={book.status === 'Available' ? 'default' : 'secondary'}
                    className="absolute top-2 right-2"
                >
                    {book.status}
                </Badge>
              </div>
              <CardContent className="flex-1 p-4">
                <div className="flex justify-between items-start gap-2 mb-2">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{book.category}</p>
                    <div className="flex items-center text-yellow-500 text-xs">
                        <span className="font-bold mr-1">★</span>{book.rating}
                    </div>
                </div>
                <h3 className="font-semibold text-lg line-clamp-1 mb-1" title={book.title}>{book.title}</h3>
                <p className="text-sm text-muted-foreground">{book.author}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button asChild className="w-full" variant="secondary">
                  <Link to={`/books/${book.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

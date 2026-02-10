import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, Clock, RotateCcw } from 'lucide-react'

export const Route = createFileRoute('/dashboard/my-books')({
  component: MyBooksPage,
})

// Mock data — replace with real data from your database
const borrowedBooks = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300&h=400',
    borrowedDate: '2026-02-08',
    dueDate: '2026-02-22',
    status: 'borrowed' as const,
  },
  {
    id: '4',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    cover: 'https://images.unsplash.com/photo-1614544048536-0d28caf77f41?auto=format&fit=crop&q=80&w=300&h=400',
    borrowedDate: '2026-02-01',
    dueDate: '2026-02-15',
    status: 'borrowed' as const,
  },
]

const historyBooks = [
  {
    id: '3',
    title: 'Atomic Habits',
    author: 'James Clear',
    cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=300&h=400',
    borrowedDate: '2026-01-15',
    returnedDate: '2026-02-05',
    status: 'returned' as const,
  },
]

function MyBooksPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Books</h1>
        <p className="text-muted-foreground mt-1">Track your borrowed and returned books.</p>
      </div>

      {/* Currently Borrowed */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Currently Borrowed</h2>
          <Badge variant="secondary" className="ml-auto">{borrowedBooks.length}</Badge>
        </div>

        {borrowedBooks.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              You haven't borrowed any books. <Link to="/books" className="text-primary underline">Browse the catalog</Link>.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {borrowedBooks.map((book) => {
              const daysLeft = Math.ceil((new Date(book.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
              return (
                <Card key={book.id} className="overflow-hidden">
                  <CardContent className="flex gap-4 p-4">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-16 h-24 object-cover rounded-md flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{book.title}</h3>
                      <p className="text-sm text-muted-foreground">{book.author}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Due: {book.dueDate}</span>
                        <Badge variant={daysLeft <= 5 ? 'destructive' : 'secondary'} className="text-xs">
                          {daysLeft} days left
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <Button size="sm" variant="outline">
                        <RotateCcw className="h-3 w-3 mr-1" /> Renew
                      </Button>
                      <Button size="sm" variant="secondary">Return</Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </section>

      {/* History */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-xl font-semibold">History</h2>
        </div>

        <div className="grid gap-4">
          {historyBooks.map((book) => (
            <Card key={book.id} className="overflow-hidden opacity-75">
              <CardContent className="flex gap-4 p-4">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-16 h-24 object-cover rounded-md flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{book.title}</h3>
                  <p className="text-sm text-muted-foreground">{book.author}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">Returned {book.returnedDate}</Badge>
                  </div>
                </div>
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <Button size="sm" variant="outline" asChild>
                    <Link to="/books/$bookId" params={{ bookId: book.id }}>View</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}


import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import {
  Book,
  Search,
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would navigate to a search results page
    console.log('Searching for:', searchQuery)
  }

  // Placeholder data for featured books
  const featuredBooks = [
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300&h=400',
      status: 'Available',
      category: 'Classic Literature',
    },
    {
      id: 2,
      title: 'Dune',
      author: 'Frank Herbert',
      cover: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=300&h=400',
      status: 'Checked Out',
      category: 'Science Fiction',
    },
    {
      id: 3,
      title: 'Atomic Habits',
      author: 'James Clear',
      cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=300&h=400',
      status: 'Available',
      category: 'Self Help',
    },
    {
      id: 4,
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      cover: 'https://images.unsplash.com/photo-1614544048536-0d28caf77f41?auto=format&fit=crop&q=80&w=300&h=400',
      status: 'Available',
      category: 'Science Fiction',
    },
  ]

    const newArrivals = [
    {
      id: 5,
      title: 'Tomorrow, and Tomorrow, and Tomorrow',
      author: 'Gabrielle Zevin',
      added: '2 days ago',
    },
    {
      id: 6,
      title: 'Yellowface',
      author: 'R.F. Kuang',
      added: '5 days ago',
    },
    {
      id: 7,
      title: 'Fourth Wing',
      author: 'Rebecca Yarros',
      added: '1 week ago',
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-6 sm:px-12 lg:px-24 bg-gradient-to-br from-primary/10 via-background to-background dark:from-primary/5">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Badge variant="secondary" className="mb-4">
            New & Improved Catalog
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
            Welcome to the <span className="text-primary">SASC Library</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover your next favorite book. Browse our extensive collection, manage your loans, and explore new worlds.
          </p>

          <form onSubmit={handleSearch} className="flex w-full max-w-md mx-auto items-center space-x-2">
            <Input 
                type="text" 
                placeholder="Search by title, author, or ISBN..." 
                className="h-12 text-lg shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" size="lg" className="h-12 px-6">
              <Search className="mr-2 h-5 w-5" /> Search
            </Button>
          </form>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
             <Button variant="outline" asChild>
                <Link to="/demo/start/server-funcs">Browse Collection</Link>
             </Button>
             <Button variant="ghost" asChild>
                <Link to="/login">My Account <ArrowRight className="ml-2 h-4 w-4"/></Link>
             </Button>
          </div>
        </div>
      </section>

      {/* Main Content Info */}
      <section className="py-12 px-6 sm:px-12 lg:px-24 bg-muted/30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="flex gap-4 items-start">
                <div className="bg-primary/10 p-3 rounded-lg">
                    <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h3 className="font-semibold text-lg mb-1">Extensive Collection</h3>
                    <p className="text-muted-foreground text-sm">Access thousands of books across various genres and formats.</p>
                </div>
            </div>
            <div className="flex gap-4 items-start">
                <div className="bg-primary/10 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h3 className="font-semibold text-lg mb-1">24/7 Access</h3>
                    <p className="text-muted-foreground text-sm">Manage your account, renew loans, and reserve books anytime online.</p>
                </div>
            </div>
             <div className="flex gap-4 items-start">
                <div className="bg-primary/10 p-3 rounded-lg">
                    <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h3 className="font-semibold text-lg mb-1">Events & Workshops</h3>
                    <p className="text-muted-foreground text-sm">Join our regular reading sessions, author talks, and community events.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-16 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Featured Books</h2>
                <p className="text-muted-foreground mt-1">Curated picks for this month.</p>
            </div>
            <Button variant="ghost" className="text-primary hover:text-primary/80">View All</Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBooks.map((book) => (
            <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-[3/4] overflow-hidden bg-muted relative group">
                <img 
                    src={book.cover} 
                    alt={`Cover of ${book.title}`}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
                 <Badge 
                    variant={book.status === 'Available' ? 'default' : 'secondary'} 
                    className="absolute top-2 right-2"
                >
                    {book.status}
                </Badge>
              </div>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground mb-1">{book.category}</p>
                <h3 className="font-semibold text-lg line-clamp-1">{book.title}</h3>
                <p className="text-sm text-muted-foreground">{book.author}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full" variant="secondary" size="sm">Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Recent Arrivals */}
      <section className="py-16 px-6 sm:px-12 lg:px-24 bg-muted/30">
         <div className="max-w-4xl mx-auto">
             <div className="text-center mb-10">
                <h2 className="text-3xl font-bold tracking-tight">Just Arrived</h2>
                <p className="text-muted-foreground mt-2">The latest additions to our shelves.</p>
             </div>
             
             <div className="grid gap-4">
                {newArrivals.map((book) => (
                    <div key={book.id} className="flex items-center justify-between p-4 bg-background rounded-lg border shadow-sm hover:border-primary/50 transition-colors">
                        <div className="flex items-center gap-4">
                             <div className="bg-primary/10 p-2 rounded-full">
                                <Book className="h-5 w-5 text-primary" />
                             </div>
                             <div>
                                <h4 className="font-medium">{book.title}</h4>
                                <p className="text-sm text-muted-foreground">by {book.author}</p>
                             </div>
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                             <span>Added {book.added}</span>
                             <Badge variant="outline">New</Badge>
                        </div>
                    </div>
                ))}
             </div>
             <div className="mt-8 text-center">
                 <Button variant="outline">View Full Catalog</Button>
             </div>
         </div>
      </section>
    </div>
  )
}

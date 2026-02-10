
import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, BookOpen, Clock, ArrowRight, Book, Star } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getBooks } from '@/data/books'

export const Route = createFileRoute('/')({
  component: Home,
  loader: () => getBooks(),
})

function Home() {
  const books = Route.useLoaderData()
  const featuredBooks = books.slice(0, 4)
  const recentArrivals = books.slice(-4).reverse()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-muted/40 py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Welcome to the SASC Library
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Discover a world of knowledge. Borrow books, manage your account, and explore our vast collection.
          </p>
          
          <div className="max-w-md mx-auto flex gap-2 mb-10">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search by title, author, or ISBN..." 
                className="pl-10 h-11 text-base bg-background shadow-sm"
              />
            </div>
            <Button size="lg" className="h-11">Search</Button>
          </div>

          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
                <Link to="/books">Browse Collection</Link>
            </Button>
            <Button size="lg" variant="outline">My Account</Button>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Books</h2>
                <p className="text-muted-foreground">Hand-picked selections just for you.</p>
            </div>
            <Button variant="ghost" className="hidden md:flex gap-1" asChild>
                <Link to="/books">View All <ArrowRight className="h-4 w-4" /></Link>
            </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBooks.map((book) => (
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
         <div className="mt-8 text-center md:hidden">
            <Button variant="outline" className="w-full" asChild>
                 <Link to="/books">View All Featured</Link>
            </Button>
        </div>
      </section>

      {/* Stats/Features Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-primary-foreground/20 flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Extensive Catalog</h3>
                <p className="opacity-90">Thousands of books across all genres, updated weekly.</p>
            </div>
             <div className="flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-primary-foreground/20 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">24/7 Access</h3>
                <p className="opacity-90">Browse and reserve books online anytime, anywhere.</p>
            </div>
             <div className="flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-primary-foreground/20 flex items-center justify-center mb-4">
                    <Book className="h-6 w-6" />
                </div>
                 <h3 className="text-xl font-bold mb-2">Easy Borrowing</h3>
                <p className="opacity-90">Simple checkout process with flexible return windows.</p>
            </div>
        </div>
      </section>

      {/* Recent Arrivals Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight mb-2">Recent Arrivals</h2>
                <p className="text-muted-foreground">Fresh additions to our shelves.</p>
            </div>
             <Button variant="ghost" className="hidden md:flex gap-1" asChild>
                <Link to="/books">View Full Catalog <ArrowRight className="h-4 w-4" /></Link>
            </Button>
        </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentArrivals.map((book) => (
                <Card key={book.id} className="overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
                    <div className="relative aspect-[2/3] overflow-hidden bg-muted group">
                        <img 
                            src={book.cover} 
                            alt={book.title}
                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        />
                         <Badge 
                            variant="outline"
                            className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
                        >
                           New
                        </Badge>
                    </div>
                     <CardContent className="flex-1 p-4">
                         <div className="flex justify-between items-start gap-2 mb-2">
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{book.category}</p>
                        </div>
                        <h3 className="font-semibold text-lg line-clamp-1 mb-1" title={book.title}>{book.title}</h3>
                        <p className="text-sm text-muted-foreground">{book.author}</p>
                    </CardContent>
                     <CardFooter className="p-4 pt-0">
                         <Button asChild className="w-full" variant="outline">
                             <Link to={`/books/${book.id}`}>View Details</Link>
                         </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" className="w-full" asChild>
                <Link to="/books">View Full Catalog</Link>
            </Button>
        </div>
      </section>
    </div>
  )
}

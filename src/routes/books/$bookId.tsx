import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Calendar, BookOpen, ChevronRight, Check, X, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBook } from "@/data/books";

export const Route = createFileRoute("/books/$bookId")({
  component: BookDetails,
  loader: async ({ params: { bookId } }) => {
    const book = await getBook({ data: bookId });
    if (!book) {
      throw notFound();
    }
    return book;
  },
});

function BookDetails() {
  const book = Route.useLoaderData();

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link to="/books" className="hover:text-primary transition-colors">
          Books
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium truncate max-w-[200px]">
          {book.title}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="relative aspect-[2/3] overflow-hidden rounded-lg border shadow-sm">
            <img
              src={book.coverUrl ?? ""}
              alt={book.title}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-6">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-2">
                  {book.title}
                </h1>
                <p className="text-xl text-muted-foreground mb-2">
                  by{" "}
                  <span className="text-primary font-medium">
                    {book.author}
                  </span>
                </p>
              </div>
              <div className="flex items-center bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-500 px-3 py-1 rounded-full font-bold">
                <Star className="w-5 h-5 mr-1 fill-yellow-500 text-yellow-500" />
                {book.rating}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="secondary" className="text-sm py-1">
                {book.category}
              </Badge>
              {/* <Badge
                variant={
                  book.status === "Available" ? "outline" : "destructive"
                }
                className={`text-sm py-1 gap-1 border-2 ${book.status === "Available" ? "bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-900" : ""}`}
              >
                {book.status === "Available" ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <X className="h-3 w-3" />
                )}
                {book.status}
              </Badge> */}
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none text-muted-foreground">
            <p>{book.description}</p>
          </div>

          <Card className="mt-4">
            <CardHeader className="pb-2">
              <CardTitle>Book Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground font-medium">ISBN</span>
                <span>{book.isbn}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground font-medium">
                  Published Date
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {book.publishedDate}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground font-medium">Pages</span>
                <span className="flex items-center gap-1">
                  <BookOpen className="h-3 w-3" /> {book.pageCount}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-4">
            {book.status === "Available" ? (
              <Button size="lg" className="flex-1">
                Borrow Book
              </Button>
            ) : (
              <Button size="lg" variant="secondary" className="flex-1" disabled>
                Currently Unavailable
              </Button>
            )}
            <Button size="lg" variant="outline" className="flex-1">
              Waitlist
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

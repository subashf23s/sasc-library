import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { getBooks, createBook, updateBook, deleteBook, type Book } from '@/data/books'
import { toast } from 'sonner'
import { Loader2, Plus, Pencil, Trash2, X, Save } from 'lucide-react'

export const Route = createFileRoute('/dashboard/manage-books')({
  component: ManageBooksPage,
})

function ManageBooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingBook, setEditingBook] = useState<Book | null>(null)

  const { register, handleSubmit, reset, setValue } = useForm<Partial<Book>>()

  const fetchBooks = async () => {
    try {
      setIsLoading(true)
      const data = await getBooks()
      setBooks(data)
    } catch (error) {
      toast.error('Failed to fetch books')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  const onSubmit = async (data: Partial<Book>) => {
    try {
      setIsSubmitting(true)
      if (editingBook) {
        await updateBook({ data: { ...data, id: editingBook.id } as Book })
        toast.success('Book updated successfully')
      } else {
        await createBook({ data })
        toast.success('Book created successfully')
      }
      reset()
      setEditingBook(null)
      fetchBooks()
    } catch (error) {
        console.log("Error",error)
      toast.error(editingBook ? 'Failed to update book' : 'Failed to create book')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (book: Book) => {
    setEditingBook(book)
    setValue('title', book.title)
    setValue('author', book.author)
    setValue('description', book.description)
    setValue('coverUrl', book.coverUrl)
    setValue('isbn', book.isbn)
    setValue('publishedDate', book.publishedDate)
    setValue('pageCount', book.pageCount)
    setValue('category', book.category)
    setValue('rating', book.rating)
    setValue('remarks', book.remarks)
    setValue('totalCount', book.totalCount)
    setValue('availableCount', book.availableCount)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this book?')) return
    try {
      await deleteBook({ data: id })
      toast.success('Book deleted successfully')
      fetchBooks()
    } catch (error) {
      toast.error('Failed to delete book')
    }
  }

  const cancelEdit = () => {
    setEditingBook(null)
    reset()
  }

  return (
    <div className="space-y-8 p-4 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Books</h1>
        <p className="text-muted-foreground mt-1">Add, edit, or remove books from the library.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{editingBook ? 'Edit Book' : 'Add New Book'}</CardTitle>
          <CardDescription>
            Enter the details of the book below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input id="title" {...register('title', { required: true })} placeholder="The Great Gatsby" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="author">Author *</Label>
                <Input id="author" {...register('author', { required: true })} placeholder="F. Scott Fitzgerald" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="isbn">ISBN</Label>
                <Input id="isbn" {...register('isbn')} placeholder="978-3-16-148410-0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" {...register('category')} placeholder="Fiction" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="coverUrl">Cover URL</Label>
                <Input id="coverUrl" {...register('coverUrl')} placeholder="https://example.com/cover.jpg" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="publishedDate">Published Date</Label>
                <Input id="publishedDate" type="date" {...register('publishedDate')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pageCount">Page Count</Label>
                <Input id="pageCount" type="number" {...register('pageCount', { valueAsNumber: true })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rating">Rating (1-5)</Label>
                <Input id="rating" type="number" min="1" max="5" step="0.1" {...register('rating', { valueAsNumber: true })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalCount">Total Copies</Label>
                <Input id="totalCount" type="number" {...register('totalCount', { valueAsNumber: true })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="availableCount">Available Copies</Label>
                <Input id="availableCount" type="number" {...register('availableCount', { valueAsNumber: true })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...register('description')} placeholder="A brief summary of the book..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="remarks">Remarks</Label>
              <Textarea id="remarks" {...register('remarks')} placeholder="Internal notes..." />
            </div>
            <div className="flex gap-2 justify-end">
              {editingBook && (
                <Button type="button" variant="outline" onClick={cancelEdit}>
                  <X className="h-4 w-4 mr-2" /> Cancel
                </Button>
              )}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : editingBook ? (
                  <Save className="h-4 w-4 mr-2" />
                ) : (
                  <Plus className="h-4 w-4 mr-2" />
                )}
                {editingBook ? 'Update Book' : 'Add Book'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Existing Books</h2>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : books.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No books found in the library.
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {books.map((book) => (
              <Card key={book.id}>
                <CardContent className="flex items-center gap-4 p-4">
                  {book.coverUrl ? (
                    <img src={book.coverUrl} alt={book.title} className="w-12 h-16 object-cover rounded" />
                  ) : (
                    <div className="w-12 h-16 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">No Cover</div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium">{book.title}</h3>
                    <p className="text-sm text-muted-foreground">{book.author}</p>
                    <div className="text-xs text-muted-foreground mt-1">
                      {book.category && <span>{book.category} • </span>}
                      {book.isbn && <span>ISBN: {book.isbn} • </span>}
                      <span>{book.availableCount ?? 0}/{book.totalCount ?? 0} available</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost" onClick={() => handleEdit(book)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => handleDelete(book.id)} className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

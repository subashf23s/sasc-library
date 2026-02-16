import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "@tanstack/react-form";
// NOTE: react-hook-form removed. We're using a controlled form with Zod
// validation to replace RHF. If you want a stricter integration with
// @tanstack/react-form later, we can wire that in once the project's
// preferred patterns/docs are available.
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
  type Book,
} from "@/data/books";
import { toast } from "sonner";
import { Loader2, Plus, Pencil, Trash2, X, Save } from "lucide-react";

export const Route = createFileRoute("/dashboard/manage-books")({
  component: ManageBooksPage,
});

function ManageBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [isAddForm, setIsAddForm] = useState(false);

  const bookSchema = z.object({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    isbn: z.string().optional().nullable().or(z.literal("")),
    category: z.string().optional().nullable().or(z.literal("")),
    coverUrl: z.string().url().optional().nullable().or(z.literal("")),
    publishedDate: z.string().optional().nullable().or(z.literal("")),
    pageCount: z.number().int().nonnegative().optional(),
    rating: z.number().min(0).max(5).optional(),
    totalCount: z.number().int().nonnegative().optional(),
    availableCount: z.number().int().nonnegative().optional(),
    description: z.string().optional().nullable().or(z.literal("")),
    remarks: z.string().optional().nullable().or(z.literal("")),
  });

  // Minimal local type describing the small subset of the form API we use.
  // This lets us avoid wide `any` casts while remaining tolerant to minor
  // differences across @tanstack/react-form versions.
  type FormApi<TValues> = {
    register?: (name: keyof TValues | string) => Record<string, any>;
    handleSubmit?: (e?: any) => void;
    reset?: (values?: Partial<TValues>) => void;
    setError?: (
      name: keyof TValues | string,
      error: { message?: string },
    ) => void;
    getFieldMeta?: (
      name: keyof TValues | string,
    ) => { error?: { message?: string } | null } | undefined;
    clearErrors?: () => void;
  };

  // Create the form and type it to our small FormApi so usages below are typed
  // without requiring the full type-parameter list from the library.
  const form = useForm({
    defaultValues: {},
    onSubmit: async (values: any) => {
      await handleFormSubmit(values as Partial<Book>);
    },
  }) as unknown as FormApi<Partial<Book>>;

  const fetchBooks = async () => {
    try {
      setIsLoading(true);
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      toast.error("Failed to fetch books");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleFormSubmit = async (values: Partial<Book>) => {
    try {
      setIsSubmitting(true);
      // Validate with Zod
      const parsed = bookSchema.partial().safeParse(values);
      if (!parsed.success) {
        // map zod errors to form errors
        const zodErrors: Record<string, string> = {};
        for (const issue of parsed.error.issues) {
          const key = issue.path[0] as string;
          zodErrors[key] = issue.message;
        }
        // set errors on form fields (best-effort; API may vary by version)
        Object.entries(zodErrors).forEach(([key, message]) => {
          try {
            form.setError?.(key as any, { message });
          } catch {}
        });
        return;
      }

      const data = parsed.data as Partial<Book>;
      if (editingBook) {
        await updateBook({ data: { ...(data as Book), id: editingBook.id } });
        toast.success("Book updated successfully");
      } else {
        await createBook({ data });
        toast.success("Book created successfully");
      }

      // reset form and editing state
      form.reset?.();
      setEditingBook(null);
      fetchBooks();
    } catch (error) {
      console.log("Error", error);
      toast.error(
        editingBook ? "Failed to update book" : "Failed to create book",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    // populate form values
    form.reset?.({
      title: book.title ?? undefined,
      author: book.author ?? undefined,
      description: book.description ?? undefined,
      coverUrl: book.coverUrl ?? undefined,
      isbn: book.isbn ?? undefined,
      publishedDate: book.publishedDate ?? undefined,
      pageCount: book.pageCount ?? undefined,
      category: book.category ?? undefined,
      rating: book.rating ?? undefined,
      remarks: book.remarks ?? undefined,
      totalCount: book.totalCount ?? undefined,
      availableCount: book.availableCount ?? undefined,
    });
    setIsAddForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this book?")) return;
    try {
      await deleteBook({ data: id });
      toast.success("Book deleted successfully");
      fetchBooks();
    } catch (error) {
      toast.error("Failed to delete book");
    }
  };

  const cancelEdit = () => {
    setEditingBook(null);
    setIsAddForm(false);
    // reset form state
    form.reset?.();
    // clear field errors if API available
    try {
      form.clearErrors?.();
    } catch {}
  };

  return (
    <div className="space-y-8 p-4 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Books</h1>
        <p className="text-muted-foreground mt-1">
          Add, edit, or remove books from the library.
        </p>
      </div>

      {isAddForm ? (
        <Card>
          <CardHeader>
            <CardTitle>{editingBook ? "Edit Book" : "Add New Book"}</CardTitle>
            <CardDescription>
              Enter the details of the book below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    {...(form.register
                      ? form.register("title")
                      : { name: "title" })}
                    placeholder="The Great Gatsby"
                  />
                  {form.getFieldMeta?.("title")?.error?.message && (
                    <p className="text-sm text-destructive">
                      {form.getFieldMeta("title")?.error?.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="author">Author *</Label>
                  <Input
                    {...(form.register
                      ? form.register("author")
                      : { name: "author" })}
                    placeholder="F. Scott Fitzgerald"
                  />
                  {form.getFieldMeta?.("author")?.error?.message && (
                    <p className="text-sm text-destructive">
                      {form.getFieldMeta("author")?.error?.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="isbn">ISBN</Label>
                  <Input
                    {...(form.register
                      ? form.register("isbn")
                      : { name: "isbn" })}
                    placeholder="978-3-16-148410-0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    {...(form.register
                      ? form.register("category")
                      : { name: "category" })}
                    placeholder="Fiction"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coverUrl">Cover URL</Label>
                  <Input
                    {...(form.register
                      ? form.register("coverUrl")
                      : { name: "coverUrl" })}
                    placeholder="https://example.com/cover.jpg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="publishedDate">Published Date</Label>
                  <Input
                    {...(form.register
                      ? form.register("publishedDate")
                      : { name: "publishedDate" })}
                    type="date"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pageCount">Page Count</Label>
                  <Input
                    {...(form.register
                      ? form.register("pageCount")
                      : { name: "pageCount" })}
                    type="number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rating">Rating (1-5)</Label>
                  <Input
                    {...(form.register
                      ? form.register("rating")
                      : { name: "rating" })}
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalCount">Total Copies</Label>
                  <Input
                    {...(form.register
                      ? form.register("totalCount")
                      : { name: "totalCount" })}
                    type="number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availableCount">Available Copies</Label>
                  <Input
                    {...(form.register
                      ? form.register("availableCount")
                      : { name: "availableCount" })}
                    type="number"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  {...(form.register
                    ? form.register("description")
                    : { name: "description" })}
                  placeholder="A brief summary of the book..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="remarks">Remarks</Label>
                <Textarea
                  {...(form.register
                    ? form.register("remarks")
                    : { name: "remarks" })}
                  placeholder="Internal notes..."
                />
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
                  {editingBook ? "Update Book" : "Add Book"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="cursor-pointer" onClick={() => setIsAddForm(true)}>
          <CardHeader>
            <CardTitle className="flex items-center justify-center">
              <Plus /> Click To Add New Book
            </CardTitle>
          </CardHeader>
        </Card>
      )}

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
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="w-12 h-16 object-cover rounded"
                    />
                  ) : (
                    <div className="w-12 h-16 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
                      No Cover
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium">{book.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {book.author}
                    </p>
                    <div className="text-xs text-muted-foreground mt-1">
                      {book.category && <span>{book.category} • </span>}
                      {book.isbn && <span>ISBN: {book.isbn} • </span>}
                      <span>
                        {book.availableCount ?? 0}/{book.totalCount ?? 0}{" "}
                        available
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleEdit(book)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDelete(book.id)}
                      className="text-destructive hover:text-destructive"
                    >
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
  );
}

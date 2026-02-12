import { createServerFn } from '@tanstack/react-start'
import { db } from '@/db'
import { books } from '@/db/schema'
import { eq } from 'drizzle-orm'

export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl?: string | null;
  description?: string | null;
  isbn?: string | null;
  publishedDate?: string | null;
  pageCount?: number | null;
  category?: string | null;
  rating?: number | null;
  remarks?: string | null;
  totalCount?: number | null;
  availableCount?: number | null;
  createdAt: string;
  updatedAt: string;
}

export const getBooks = createServerFn({
  method: 'GET',
}).handler(async () => {
  const result = await db.select().from(books);
  return result as unknown as Book[];
})

export const getBook = createServerFn({
    method: 'GET',
}).inputValidator((id: string) => id)
  .handler(async ({ data: id }) => {
    const result = await db.select().from(books).where(eq(books.id, id));
    return (result[0] || null) as unknown as Book | null;
  })

export const createBook = createServerFn({
  method: 'POST',
}).inputValidator((data: Partial<Book>) => data)
  .handler(async ({ data }) => {
    const result = await db.insert(books).values({
      title: data.title!,
      author: data.author!,
      description: data.description,
      coverUrl: data.coverUrl,
      isbn: data.isbn,
      publishedDate: data.publishedDate ? new Date(data.publishedDate) : null,
      pageCount: data.pageCount,
      category: data.category,
      rating: data.rating,
      remarks: data.remarks,
      totalCount: data.totalCount,
      availableCount: data.availableCount,
    }).returning();
    return result[0];
  })

export const updateBook = createServerFn({
  method: 'POST',
}).inputValidator((data: { id: string } & Partial<Book>) => data)
  .handler(async ({ data }) => {
    const { id, ...updates } = data;
    const result = await db.update(books)
      .set({
        ...updates,
        publishedDate: updates.publishedDate ? new Date(updates.publishedDate) : undefined,
      })
      .where(eq(books.id, id))
      .returning();
    return result[0];
  })

export const deleteBook = createServerFn({
  method: 'POST',
}).inputValidator((id: string) => id)
  .handler(async ({ data: id }) => {
    await db.delete(books).where(eq(books.id, id));
    return { success: true };
  })

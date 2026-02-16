import { createServerFn } from "@tanstack/react-start";
import { db } from "@/db";
import { books } from "@/db/schema";
import { eq } from "drizzle-orm";

export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl?: string | null;
  description?: string | null;
  isbn?: string | null;
  publishedDate?: string | Date | null;
  pageCount?: number | null;
  category?: string | null;
  rating?: number | null;
  remarks?: string | null;
  totalCount?: number | null;
  availableCount?: number | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export const getBooks = createServerFn({
  method: "GET",
}).handler(async () => {
  const result = await db.select().from(books);
  return result as unknown as Book[];
});

export const getBook = createServerFn({
  method: "GET",
})
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }) => {
    const result = await db.select().from(books).where(eq(books.id, id));
    return (result[0] || null) as unknown as Book | null;
  });

export const createBook = createServerFn({
  method: "POST",
})
  .inputValidator((data: Partial<Book>) => data)
  .handler(async ({ data }) => {
    const result = await db
      .insert(books)
      .values({
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
      })
      .returning();
    return result[0];
  });

export const updateBook = createServerFn({
  method: "POST",
})
  .inputValidator((data: { id: string } & Partial<Book>) => data)
  .handler(async ({ data }) => {
    const { id, ...updates } = data;

    // Build a typed set object only with allowed columns to avoid passing
    // through metadata fields like createdAt/updatedAt which may be strings on
    // the input but Drizzle expects Date values.
    const setObj: Record<string, any> = {};
    if (updates.title !== undefined) setObj.title = updates.title;
    if (updates.author !== undefined) setObj.author = updates.author;
    if (updates.description !== undefined)
      setObj.description = updates.description;
    if (updates.coverUrl !== undefined) setObj.coverUrl = updates.coverUrl;
    if (updates.isbn !== undefined) setObj.isbn = updates.isbn;
    if (updates.publishedDate !== undefined)
      setObj.publishedDate = updates.publishedDate
        ? new Date(updates.publishedDate as any)
        : undefined;
    if (updates.pageCount !== undefined) setObj.pageCount = updates.pageCount;
    if (updates.category !== undefined) setObj.category = updates.category;
    if (updates.rating !== undefined) setObj.rating = updates.rating;
    if (updates.remarks !== undefined) setObj.remarks = updates.remarks;
    if (updates.totalCount !== undefined)
      setObj.totalCount = updates.totalCount;
    if (updates.availableCount !== undefined)
      setObj.availableCount = updates.availableCount;

    const result = await db
      .update(books)
      .set(setObj)
      .where(eq(books.id, id))
      .returning();
    return result[0];
  });

export const deleteBook = createServerFn({
  method: "POST",
})
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }) => {
    await db.delete(books).where(eq(books.id, id));
    return { success: true };
  });

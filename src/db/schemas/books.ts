import { pgTable, text, uuid, timestamp, integer } from "drizzle-orm/pg-core";

export const books = pgTable("books", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  description: text("description"),
  coverUrl: text("cover_url"),
  isbn: text("isbn"),
  publishedDate: timestamp("published_date"),
  pageCount: integer("page_count"),
  category: text("category"),
  rating: integer("rating"),
  remarks: text("remarks"),
  totalCount: integer("total_count"),
  availableCount: integer("available_count"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

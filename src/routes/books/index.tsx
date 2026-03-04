import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/books/")({
  component: BooksPage,
});

function BooksPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1>Books</h1>
    </div>
  );
}

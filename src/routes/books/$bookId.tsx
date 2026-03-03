import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/books/$bookId")({
  component: BookDetails,
});

function BookDetails() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1>Book Details</h1>
    </div>
  );
}

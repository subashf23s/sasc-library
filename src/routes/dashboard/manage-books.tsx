import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/manage-books")({
  component: ManageBooksPage,
});

function ManageBooksPage() {
  return (
    <div className="space-y-8 p-4 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Books</h1>
        <p className="text-muted-foreground mt-1">
          Add, edit, or remove books from the library.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Existing Books</h2>
      </div>
    </div>
  );
}

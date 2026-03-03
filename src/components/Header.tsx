import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <span>SASC Library</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              to="/books"
              activeProps={{ className: "text-primary" }}
              inactiveProps={{
                className:
                  "text-muted-foreground hover:text-primary transition-colors",
              }}
            >
              Books
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4"></div>
      </div>
    </header>
  );
}

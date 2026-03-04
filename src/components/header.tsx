import { Link } from "@tanstack/react-router";
import Logo from "./logo";
import { Button } from "./ui/button";
const navItems = [
  {
    id: 1,
    name: "Discover",
    href: "/discover",
  },
  {
    id: 2,
    name: "About us",
    href: "/about-us",
  },
  {
    id: 3,
    name: "Find a Library",
    href: "/find-a-library",
  },
  {
    id: 4,
    name: "Agenda",
    href: "/agenda",
  },
  {
    id: 5,
    name: "News",
    href: "/news",
  },
];
export default function Header() {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/">
          <Logo />
        </Link>

        <nav>
          {/* <Link
            to="/books"
            activeProps={{ className: "text-primary" }}
            inactiveProps={{
              className:
                "text-muted-foreground hover:text-primary transition-colors",
            }}
          >
            Books
          </Link> */}
          <ul className="flex items-center gap-6 text-sm font-semibold text-muted-foreground">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link to={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link to="/login" className="text-sm">
          <Button className="rounded-3xl cursor-pointer font-semibold">
            Log In
          </Button>
        </Link>
      </div>
    </header>
  );
}

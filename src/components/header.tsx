import { Link } from "@tanstack/react-router";
import Logo from "./logo";
import { Button } from "./ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
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
        <NavItems />

        <Link to="/login" className="text-sm hidden md:block">
          <Button className="rounded-3xl cursor-pointer font-semibold">
            Log In
          </Button>
        </Link>
      </div>
    </header>
  );
}
const NavItems = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav>
      <DropdownMenu onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild className="md:hidden">
          <Button size="icon">{isOpen ? <X /> : <Menu />}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link to="/discover">Discover</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/about-us">About Us</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/find-a-library">Find a Library</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/agenda">Agenda</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/news">News</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/login" className="w-full">
              <Button size="sm" className="cursor-pointer font-semibold w-full">
                Log In
              </Button>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ul className="hidden md:flex items-center gap-6 text-sm font-semibold text-muted-foreground">
        {navItems.map((item) => (
          <li key={item.id}>
            <Link to={item.href}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

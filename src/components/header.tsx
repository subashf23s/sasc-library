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
    name: "Home",
    href: "/",
  },
  {
    id: 2,
    name: "Events & Books",
    href: "/events-books",
  },
  {
    id: 3,
    name: "Community",
    href: "/community",
  },
  {
    id: 4,
    name: "Contributes",
    href: "/contributes",
  }
];
export default function Header() {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/">
          <Logo />
        </Link>
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
          {navItems.map((item) => (
          <DropdownMenuItem key={item.id}>
            <Link to={item.href}>{item.name}</Link>
          </DropdownMenuItem>
        ))}
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

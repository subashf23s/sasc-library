import { Link } from "@tanstack/react-router";
import Logo from "./logo";
import { Button } from "antd";
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
        <Link to="/login">
          <Button color="purple" variant="solid">
            Log In
          </Button>
        </Link>
      </div>
    </header>
  );
}
const NavItems = () => {
  return (
    <nav>
      <ul className="flex items-center gap-6 text-sm font-semibold text-muted-foreground">
        {navItems.map((item) => (
          <li key={item.id}>
            <Link to={item.href}><Button variant="link" color="purple">{item.name}</Button></Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

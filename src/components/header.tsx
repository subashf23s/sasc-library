import { Link } from "@tanstack/react-router";
import Logo from "./logo";
import { Button, Flex } from "antd";
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
    <header>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/">
          <Logo />
        </Link>
        <NavItems />
        <Link to="/login">
          <Button color="purple" variant="solid" shape="round">
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
      <Flex justify="center" align="center">
        {navItems.map((item) => (
            <Link key={item.id} to={item.href}><Button variant="link" color="purple">{item.name}</Button></Link>
        ))}
      </Flex>
    </nav>
  );
};

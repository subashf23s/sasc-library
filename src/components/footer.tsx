import Logo from "./logo";

const Footer = () => {
  return (
    <footer>
      <div className="container mx-auto py-8 border-t border-gray-400 flex flex-col md:flex-row gap-4 items-center justify-between">
        <Logo />
        <nav>
          <ul className="flex text-sm font-semibold text-gray-700 divide-x divide-gray-500">
            <li className="px-2">Legal Notice</li>
            <li className="px-2">Site Map</li>
            <li className="px-2">Contact</li>
            <li className="px-2">Privacy Policy</li>
          </ul>
        </nav>
        <p className="text-sm text-gray-700">
          © {new Date().getFullYear()} Magicbooks.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

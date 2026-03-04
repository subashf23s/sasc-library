import { Link } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardTitle } from "../../ui/card";

const items = [
  {
    id: 1,
    name: "How to Borrow",
    description: "Learn how to borrow books from our library",
    image: "/assets/svg/how-to-borrow.svg",
    link: "/about-us",
  },
  {
    id: 2,
    name: "Find a Library",
    description: "Find a library near you",
    image: "/assets/svg/find-a-library.svg",
    link: "/find-a-library",
  },
  {
    id: 3,
    name: "Categories",
    description: "Browse books by category",
    image: "/assets/svg/category.svg",
    link: "/discover",
  },
];
const ItemsSection = () => {
  return (
    <section className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-4 py-32">
      {items.map((item) => (
        <div key={item.id} className="relative">
          <img
            src={item.image}
            alt=""
            className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 w-20 h-20 object-cover bg-white rounded-full shadow-sm p-5 border border-cyan-50"
          />
          <Card className="bg-cyan-50 border-none pt-16">
            <CardContent className="text-center flex flex-col gap-4">
              <CardTitle className="text-2xl font-bold text-gray-700">
                {item.name}
              </CardTitle>
              <CardDescription>{item.description}</CardDescription>
              <Link
                to={item.link}
                className="underline text-blue-500 font-semibold text-sm"
              >
                Know more
              </Link>
            </CardContent>
          </Card>
        </div>
      ))}
    </section>
  );
};

export default ItemsSection;

import { Flex } from "antd";

const books = [
  {
    id: 1,
    title: "Dopamine Detox",
    image: "/assets/img/books/dopaminedetox.png",
    className: "scale-125",
  },
  {
    id: 2,
    title: "Atomic Habits",
    image: "/assets/img/books/atomichabits.png",
    className: "scale-150",
  },
  {
    id: 3,
    title: "Sapiens",
    image: "/assets/img/books/sapiens.png",
    className: "scale-200 z-10",
  },
  {
    id: 4,
    title: "Roots",
    image: "/assets/img/books/roots.png",
    className: "scale-150 -z-10",
  },
  {
    id: 5,
    title: "Meta morphosis",
    image: "/assets/img/books/metamorphosis.png",
    className: "scale-125 -z-20",
  },
];
const Books = () => {
  return (
    <section className="container mx-auto py-40">
      <Flex align="center" justify="center" className="">
        {books.map((images) => (
          <img
            key={images.id}
            src={images.image}
            alt={images.title}
            className={`h-60 ${images.className}`}
          />
        ))}
      </Flex>
    </section>
  );
};

export default Books;

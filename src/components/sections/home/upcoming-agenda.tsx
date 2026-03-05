import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const agendaTitles = [
  {
    id: 1,
    title: "Libraries",
  },
  {
    id: 2,
    title: "Schools",
  },
  {
    id: 3,
    title: "Press",
  },
  {
    id: 4,
    title: "Partners",
  },
];
const upcomingAgendaData = [
  {
    id: 1,
    title: "Creating Content",
    type: "Library",
    by: "Author",
    date: "2026-03-05",
    description:
      "Commonly used for various content concerning read various content",
    image: "/assets/img/library.png",
  },
  {
    id: 2,
    title: "Schools",
    type: "School",
    by: "Author",
    date: "2026-03-05",
    description:
      "Commonly used for various content concerning read various content",
    image: "/assets/img/library.png",
  },
  {
    id: 3,
    title: "Press",
    type: "Press",
    by: "Author",
    date: "2026-03-05",
    description:
      "Commonly used for various content concerning read various content",
    image: "/assets/img/library.png",
  },
  {
    id: 4,
    title: "Press",
    type: "Press",
    by: "Author",
    date: "2026-03-05",
    description:
      "Commonly used for various content concerning read various content",
    image: "/assets/img/library.png",
  },
  //   {
  //     id: 5,
  //     title: "Partners",
  //     type: "Partners",
  //     by: "Author",
  //     date: "2026-03-05",
  //     description:
  //       "Commonly used for various content concerning read various content",
  //     image: "/assets/img/library.png",
  //   },
];
const UpcomingAgenda = () => {
  return (
    <section className="pb-64">
      <div className="container mx-auto py-16 px-4">
        <h2 className="text-2xl md:text-4xl font-extrabold tracking-wider mb-10 text-center text-gray-700 w-2/3 mx-auto">
          For Professionals
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {agendaTitles.map((title) => (
            <Card key={title.id} className="">
              <CardHeader>
                <CardTitle className="text-center">{title.title}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
      <div className="relative">
        <h2 className="text-2xl md:text-4xl font-extrabold tracking-wider text-center text-white bg-indigo-950 pt-16 pb-64">
          Upcoming Agenda
        </h2>
        <div className="container mx-auto px-4 left-0 right-0 absolute bottom-0 transform translate-y-1/2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {upcomingAgendaData.map((data) => (
              <Card key={data.id} className="p-1 gap-1">
                <CardHeader className="relative p-1">
                  <img
                    src={data.image}
                    alt=""
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute bottom-5 left-0 right-0 flex items-center justify-center gap-2 text-xs font-semibold">
                    <p className="bg-white text-violet-500 px-2 py-1 rounded-lg">
                      {data.type}
                    </p>
                    <p className="bg-white text-red-500 px-2 py-1 rounded-lg">
                      {data.by}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <CardTitle className="text-center text-gray-700">
                    {data.title}
                  </CardTitle>
                  <p className="text-center text-gray-500 text-sm">
                    {data.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingAgenda;

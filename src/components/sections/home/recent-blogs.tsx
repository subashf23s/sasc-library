import { Card, CardContent, CardHeader } from "@/components/ui/card";

const recentBlogs = [
  {
    id: 1,
    title: "The library, a place for meetings,culture, learning and leisure",
    image: "/assets/img/library.png",
    type: "Library",
    createdAt: "2022-01-01",
  },
  {
    id: 2,
    title: "The library, a place for meetings,culture, learning and leisure",
    image: "/assets/img/library.png",
    type: "Agenda",
    createdAt: "2022-01-01",
  },
  {
    id: 3,
    title: "The library, a place for meetings,culture, learning and leisure",
    image: "/assets/img/library.png",
    type: "Author",
    createdAt: "2022-01-01",
  },
];
const RecentBlogs = () => {
  return <section>Recent Blogs</section>
  // return (
  //   <section className="py-16 container mx-auto px-4 ">
  //     <h2 className="text-2xl md:text-4xl font-extrabold tracking-wider mb-10 text-center text-gray-700 w-2/3 mx-auto">
  //       Our Recent Blogs
  //     </h2>
  //     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  //       {recentBlogs.map((blog) => (
  //         <Card key={blog.id}>
  //           <CardHeader className="relative">
  //             <img
  //               src={blog.image}
  //               alt=""
  //               className="w-full h-48 object-cover rounded-t-lg"
  //             />
  //             <p className="absolute top-3 right-10 bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold">
  //               {blog.createdAt}
  //             </p>
  //           </CardHeader>
  //           <CardContent>
  //             <p className="text-xs font-semibold text-purple-500">
  //               {blog.type}
  //             </p>
  //             <p className="text-lg font-semibold text-gray-700">
  //               {blog.title}
  //             </p>
  //           </CardContent>
  //         </Card>
  //       ))}
  //     </div>
  //   </section>
  // );
};

export default RecentBlogs;

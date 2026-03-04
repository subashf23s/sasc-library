const items = [
  { id: 1, name: "Role & Mission", image: "/assets/img/role-and-mission.png" },
  {
    id: 2,
    name: "A Place to live & Share",
    image: "/assets/img/a-place-to-live-and-share.png",
  },
  {
    id: 3,
    name: "Learning & Training",
    image: "/assets/img/learning-and-training.png",
  },
  { id: 4, name: "For Students", image: "/assets/img/for-students.png" },
  { id: 5, name: "For Families", image: "/assets/img/for-families.png" },
  {
    id: 6,
    name: "The Cultural Offer",
    image: "/assets/img/the-cultural-offer.png",
  },
];
const WhatIsFor = () => {
  return (
    <section className="container mx-auto py-16">
      <h2 className="text-2xl md:text-4xl font-extrabold tracking-wider mb-10 text-center text-gray-700 w-2/3 mx-auto">
        The library, a place for meetings,culture, learning and leisure
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="relative p-4 rounded-xl bg-cyan-50">
            <img
              src={item.image}
              alt=""
              className="rounded-xl w-full h-[300px] object-cover"
            />
            <h3 className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center text-sm text-gray-700 bg-white font-bold py-1 px-4 rounded-2xl">
              {item.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatIsFor;

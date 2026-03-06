import RandomBox from "./ui/random-box";

const boxes = [
  {
    className: "w-2 h-2 rounded-full",
    colors: ["bg-cyan-100"],
    x: 600,
    y: 200,
    duration: 7,
    repeatDelay: 0.2,
  },
  {
    className: "w-2 h-2 rounded-full",
    colors: ["bg-red-100"],
    x: 600,
    y: 600,
    duration: 7,
    repeatDelay: 0.2,
  },
  {
    className: "w-2 h-2 rounded-full",
    colors: ["bg-green-100"],
    x: 700,
    y: 200,
    duration: 6,
    repeatDelay: 0.2,
  },
  {
    className: "w-4 h-4 rounded-full",
    colors: ["bg-blue-300"],
    x: 600,
    y: 600,
    duration: 10,
    repeatDelay: 0.2,
  },
];
const RandomBoxes = () => {
  return (
    <section className="z-20 absolute inset-0 translate-y-1/2 translate-x-1/2">
      {boxes.map((box, index) => (
        <RandomBox
          key={index}
          className={box.className}
          colors={box.colors}
          x={box.x}
          y={box.y}
          duration={box.duration}
          repeatDelay={box.repeatDelay}
        />
      ))}
    </section>
  );
};

export default RandomBoxes;

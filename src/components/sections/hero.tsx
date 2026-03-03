const Hero = () => {
  return (
    <section className="bg-[url('/assets/img/library.jpeg')] bg-cover bg-center bg-no-repeat min-h-dvh">
      <div className="bg-black/30 min-h-dvh relative">
        <div className="container mx-auto px-4 py-16 ">
          <h1 className="text-7xl font-bold text-white text-center">
            <span>Looking for a </span>
            <br />
            <span className="inline-block bg-gradient-to-b from-red-300 to-red-900 bg-clip-text text-transparent">
              particular book?
            </span>
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex items-baseline justify-between">
          <img
            src="/assets/img/person1.png"
            alt=""
            className="w-1/4 drop-shadow-2xl drop-shadow-white"
          />
          <img
            src="/assets/img/person2.png"
            alt=""
            className="w-1/4 drop-shadow-2xl drop-shadow-white"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import { Input } from "../../ui/input";

const Hero = () => {
  return (
    // <section className="bg-[url('/assets/img/library.png')] bg-cover bg-center bg-no-repeat min-h-dvh">
    <section className="bg-indigo-950 min-h-dvh">
      <div className="bg-black/30 min-h-dvh relative">
        <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center gap-8">
          <h1 className="text-7xl font-bold text-white text-center">
            <span>Looking for a </span>
            <br />
            <span className="inline-block bg-gradient-to-b from-red-300 to-red-900 bg-clip-text text-transparent">
              particular book?
            </span>
          </h1>
          <Card className="w-full max-w-md bg-gray-200 z-10">
            <CardContent>
              <form action="">
                <div className="flex flex-col gap-4">
                  <Input
                    type="text"
                    placeholder="Search for books,authors,library here..."
                  />
                  <Button
                    type="submit"
                    className="bg-blue-500 rounded-3xl font-bold"
                  >
                    Search
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex items-baseline justify-between ">
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

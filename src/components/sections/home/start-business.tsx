import { Button } from "@/components/ui/button";

const StartBusiness = () => {
  return (
    <section className="pt-10 pb-4 container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6 items-center">
        <h2 className="text-2xl md:text-4xl font-extrabold tracking-wider mb-10  text-gray-700 ">
          Start Business your business today for $10+ state fees
        </h2>
        <div className="flex justify-center md:justify-end gap-4">
          <Button className="bg-red-500 hover:bg-red-600 text-white px-12 py-6 rounded-full font-semibold ">
            See Pricing
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-12 py-6 rounded-full font-semibold ">
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
};

export default StartBusiness;

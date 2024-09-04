import { ReactTyped } from "react-typed";

const Hero = () => {
  return (
    <section className="flex items-center justify-center py-16 ">
      <div className="container flex flex-col items-center mx-auto md:flex-row">
        <div className="px-4 text-center md:w-1/2 md:text-left">
          <h1 className="text-4xl font-bold text-white md:text-6xl">
            SafeScape
          </h1>
          <div className="mt-6">
            <ReactTyped
              strings={[
                "Your safety, our priority",
                "Real-time monitoring",
                "Active alerts",
              ]}
              typeSpeed={40}
              backSpeed={50}
              backDelay={1000}
              loop
              className="text-xl text-white"
            />
          </div>
        </div>

        {/* Optional image or illustration */}
        {/* <div className="hidden px-4 md:block md:w-1/2">
          <img
            src="/path/to/your/illustration.png"
            alt="Hero Illustration"
            className="w-full"
          />
        </div> */}
      </div>
    </section>
  );
};

export default Hero;

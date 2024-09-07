import { ReactTyped } from "react-typed";
import main from "../assets/main.png";

const Hero = () => {
  return (
    <section className="flex items-center justify-center -my-8">
      <div className="container flex flex-col items-center justify-center mx-auto md:flex-row">
        <div className="px-4 text-center md:w-1/3 md:text-left">
          <h1 className="text-xl font-bold text-white md:text-6xl">
            Safe<b className="font-bold text-red-600">Scape</b>
          </h1>
          <h2 className="mt-4 text-xl font-semibold text-white ">
            Your ultimate safety partner, delivering real-time alerts and
            seamless incident management, wherever&nbsp;you are
          </h2>
          <div className="mt-4">
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
              className="text-2xl text-white"
            />
          </div>
        </div>

        {/* Optional image or illustration */}
        <div className="hidden px-4 md:block md:w-1/2">
          <img src={main} alt="Hero Illustration" className="h-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

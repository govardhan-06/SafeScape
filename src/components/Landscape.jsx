import { useState, useEffect } from "react";
import Dashboard from "../pages/Dashboard";

const LandscapeComponent = () => {
  const [isLandscape, setIsLandscape] = useState(
    window.innerWidth > window.innerHeight
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile && !isLandscape ? (
        <div className="flex items-center justify-center min-h-screen w-fit">
          <p className="text-lg font-semibold text-center text-white">
            Please switch to landscape mode for a better experience.
          </p>
        </div>
      ) : (
        <Dashboard />
      )}
    </>
  );
};

export default LandscapeComponent;

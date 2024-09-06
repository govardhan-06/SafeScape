const KeyFeatures = () => {
  const features = [
    {
      title: "Real Time Monitoring",
      description:
        "Get accurate results with our advanced ML model trained on millions of images.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-12 h-12 mx-auto text-red-500">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 19.5V4.5m0 0L6.75 9m5.25-4.5l5.25 4.5M12 19.5c-3.866 0-7-3.134-7-7s3.134-7 7-7 7 3.134 7 7-3.134 7-7 7z"
          />
        </svg>
      ),
    },
    {
      title: "Active Alerts",
      description:
        "Our advanced AI algorithms analyze images to detect crop health issues and diseases.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="mx-auto text-red-600 size-12">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2.25m0 3v.75m-9.75 0a.75.75 0 01-.65-1.15l8.25-14a.75.75 0 011.3 0l8.25 14a.75.75 0 01-.65 1.15H3.75z"
          />
        </svg>
      ),
    },
    {
      title: "User Friendly Dashboard",
      description:
        "Realtime logs, past alerts and location with multiple cameras",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-12 h-12 mx-auto text-red-500">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21v-7.5m0 0L8.25 12m3.75 1.5l3.75-1.5M12 21c-3.866 0-7-3.134-7-7s3.134-7 7-7 7 3.134 7 7-3.134 7-7 7z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="px-24 mb-12">
      <div className="container mx-auto">
        <h2 className="m-12 text-4xl font-semibold text-center text-white">
          Key Features
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 text-center bg-white rounded-lg shadow-lg">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="mb-2 text-2xl font-semibold text-red-500">
                {feature.title}
              </h3>
              <p className="text-gray-800">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;

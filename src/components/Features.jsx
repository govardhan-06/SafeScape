const KeyFeatures = () => {
  const features = [
    {
      title: "Real Time Monitoring",
      description:
        "Round the clock monitoring with advanced AI technology to detect any potential threats.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="mx-auto text-red-500 size-12"
          xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M20.4532 12.8928C20.1754 15.5027 18.6967 17.9484 16.2497 19.3612C12.1842 21.7084 6.98566 20.3155 4.63845 16.25L4.38845 15.817M3.54617 11.1071C3.82397 8.49723 5.30276 6.05151 7.74974 4.63874C11.8152 2.29153 17.0138 3.68447 19.361 7.74995L19.611 8.18297M3.49316 18.0659L4.22522 15.3339L6.95727 16.0659M17.0422 7.93398L19.7743 8.66603L20.5063 5.93398M11.9997 7.49995V12L14.4997 13.5"
              stroke="#ef4444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"></path>{" "}
          </g>
        </svg>
      ),
    },
    {
      title: "Active Alerts",
      description:
        "Provides emergency alerts on detecting potential risk, to prevent any unfortunate incidents.",
      icon: (
        <svg
          className="mx-auto size-10"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g clipPath="url(#clip0_949_22806)">
              {" "}
              <path
                d="M12 6.5C12.5523 6.5 13 6.94772 13 7.5L13 13.5C13 14.0523 12.5523 14.5 12 14.5C11.4477 14.5 11 14.0523 11 13.5L11 7.5C11 6.94772 11.4477 6.5 12 6.5Z"
                fill="#ef4444"></path>{" "}
              <path
                d="M12 18.5C12.8284 18.5 13.5 17.8284 13.5 17C13.5 16.1716 12.8284 15.5 12 15.5C11.1716 15.5 10.5 16.1716 10.5 17C10.5 17.8284 11.1716 18.5 12 18.5Z"
                fill="#ef4444"></path>{" "}
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.82664 2.22902C10.7938 0.590326 13.2063 0.590325 14.1735 2.22902L23.6599 18.3024C24.6578 19.9933 23.3638 22 21.4865 22H2.51362C0.63634 22 -0.657696 19.9933 0.340215 18.3024L9.82664 2.22902ZM12.4511 3.24557C12.2578 2.91814 11.7423 2.91814 11.549 3.24557L2.06261 19.319C1.90904 19.5792 2.07002 20 2.51362 20H21.4865C21.9301 20 22.0911 19.5792 21.9375 19.319L12.4511 3.24557Z"
                fill="#ef4444"></path>{" "}
            </g>{" "}
            <defs>
              {" "}
              <clipPath id="clip0_949_22806">
                {" "}
                <rect width="24" height="24" fill="white"></rect>{" "}
              </clipPath>{" "}
            </defs>{" "}
          </g>
        </svg>
      ),
    },
    {
      title: "User Friendly Dashboard",
      description:
        "Realtime logs, past alerts and location with multiple cameras",
      icon: (
        <svg
          className="mx-auto size-12"
          viewBox="0 -0.5 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#ef4444">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.918 10.0005H7.082C6.66587 9.99708 6.26541 10.1591 5.96873 10.4509C5.67204 10.7427 5.50343 11.1404 5.5 11.5565V17.4455C5.5077 18.3117 6.21584 19.0078 7.082 19.0005H9.918C10.3341 19.004 10.7346 18.842 11.0313 18.5502C11.328 18.2584 11.4966 17.8607 11.5 17.4445V11.5565C11.4966 11.1404 11.328 10.7427 11.0313 10.4509C10.7346 10.1591 10.3341 9.99708 9.918 10.0005Z"
              stroke="#EF4444"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"></path>{" "}
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.918 4.0006H7.082C6.23326 3.97706 5.52559 4.64492 5.5 5.4936V6.5076C5.52559 7.35629 6.23326 8.02415 7.082 8.0006H9.918C10.7667 8.02415 11.4744 7.35629 11.5 6.5076V5.4936C11.4744 4.64492 10.7667 3.97706 9.918 4.0006Z"
              stroke="#EF4444"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"></path>{" "}
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.082 13.0007H17.917C18.3333 13.0044 18.734 12.8425 19.0309 12.5507C19.3278 12.2588 19.4966 11.861 19.5 11.4447V5.55666C19.4966 5.14054 19.328 4.74282 19.0313 4.45101C18.7346 4.1592 18.3341 3.9972 17.918 4.00066H15.082C14.6659 3.9972 14.2654 4.1592 13.9687 4.45101C13.672 4.74282 13.5034 5.14054 13.5 5.55666V11.4447C13.5034 11.8608 13.672 12.2585 13.9687 12.5503C14.2654 12.8421 14.6659 13.0041 15.082 13.0007Z"
              stroke="#EF4444"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"></path>{" "}
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.082 19.0006H17.917C18.7661 19.0247 19.4744 18.3567 19.5 17.5076V16.4936C19.4744 15.6449 18.7667 14.9771 17.918 15.0006H15.082C14.2333 14.9771 13.5256 15.6449 13.5 16.4936V17.5066C13.525 18.3557 14.2329 19.0241 15.082 19.0006Z"
              stroke="#ef4444"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"></path>{" "}
          </g>
        </svg>
      ),
    },
    {
      title: "Advanced Computer Vision",
      description:
        "AI powered computer vision to detect any potential threats and alert the authorities.",
      icon: (
        <svg
          className="mx-auto size-12"
          fill="#ef4444"
          height="200px"
          width="200px"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 512 512"
          xmlSpace="preserve">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g>
              {" "}
              <g>
                {" "}
                <g>
                  {" "}
                  <path d="M506.245,220.091c-69.79-74.59-157.899-112.363-246.339-113.374c-0.728-0.019-1.46-0.021-2.191-0.029 c-0.49-0.002-0.979-0.019-1.469-0.019c-0.082,0-0.164-0.003-0.247-0.003c-1.399,0-2.792,0.023-4.182,0.061 c-88.164,1.228-176.113,38.985-246.025,113.324c-8.072,8.583-7.657,22.084,0.925,30.156c8.583,8.072,22.084,7.657,30.156-0.925 c27.43-29.167,57.876-51.949,90.009-68.348c-12.849,22.055-20.216,47.698-20.216,75.067c0,82.481,66.853,149.333,149.333,149.333 S405.333,338.481,405.333,256c0-27.469-7.423-53.2-20.36-75.31c32.217,16.41,62.706,39.257,90.116,68.552 c8.05,8.603,21.55,9.052,30.153,1.003C513.846,242.195,514.294,228.695,506.245,220.091z M362.667,256 c0,58.917-47.75,106.667-106.667,106.667S149.333,314.917,149.333,256c0-57.89,46.102-104.996,103.599-106.62 c1.098-0.013,2.195-0.044,3.293-0.044c0.191,0,0.38,0.006,0.571,0.007c0.668,0.001,1.335,0.02,2.003,0.027 C316.422,150.854,362.667,198.019,362.667,256z"></path>{" "}
                  <path d="M256,170.667c-47.153,0-85.333,38.181-85.333,85.333c0,11.782,9.551,21.333,21.333,21.333s21.333-9.551,21.333-21.333 c0-23.589,19.078-42.667,42.667-42.667c11.782,0,21.333-9.551,21.333-21.333C277.333,180.218,267.782,170.667,256,170.667z"></path>{" "}
                </g>{" "}
              </g>{" "}
            </g>{" "}
          </g>
        </svg>
      ),
    },
    {
      title: "Seamless Integration",
      description:
        "Seamless integration with existing security systems and hardware.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="mx-auto size-12"
          xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <circle
              cx="12"
              cy="12"
              r="3"
              stroke="#ef4444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"></circle>{" "}
            <circle
              cx="12"
              cy="4"
              r="2"
              stroke="#ef4444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"></circle>{" "}
            <circle
              cx="20"
              cy="12"
              r="2"
              stroke="#ef4444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"></circle>{" "}
            <circle
              cx="4"
              cy="12"
              r="2"
              stroke="#ef4444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"></circle>{" "}
            <circle
              cx="12"
              cy="20"
              r="2"
              stroke="#ef4444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"></circle>{" "}
            <path
              d="M12 6V9"
              stroke="#ef4444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"></path>{" "}
            <path
              d="M15 12H18"
              stroke="#ef4444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"></path>{" "}
            <path
              d="M12 15V18"
              stroke="#ef4444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"></path>{" "}
            <path
              d="M9 12H6"
              stroke="#ef4444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"></path>{" "}
          </g>
        </svg>
      ),
    },
    {
      title: "Predictive Analytics",
      description:
        "Advanced analytics to predict potential threats and take necessary actions.",
      icon: (
        <svg
          className="mx-auto size-12"
          viewBox="0 -35.5 170 170"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g clipPath="url(#clip0)">
              {" "}
              <path
                d="M159.524 0.393145C156.399 0.123788 154.058 0.750571 152.37 2.30179C150.171 4.32164 149.108 7.85474 149.031 13.4077C147.212 15.4816 145.399 17.5445 143.593 19.5965C139.42 24.3401 135.106 29.2446 130.918 34.0834C126.73 38.9222 122.505 43.8811 118.419 48.6762C116.665 50.7333 114.91 52.7923 113.152 54.8533C112.677 54.843 112.182 54.8083 111.663 54.7723C110.128 54.5701 108.57 54.6493 107.064 55.0063C105.06 55.6145 103.869 55.0462 102.107 53.6307C92.4085 45.8476 83.3948 39.8002 74.55 35.1446C73.8555 34.8254 73.2439 34.3489 72.7624 33.752C72.2816 33.1552 71.9436 32.4542 71.7758 31.704C71.0743 29.0054 69.3499 26.6922 66.9731 25.2626C64.5969 23.833 61.7583 23.4013 59.0692 24.0605C56.3348 24.7041 53.9423 26.364 52.3692 28.7085C50.7961 31.0531 50.1584 33.9097 50.5836 36.7075C50.6933 37.4468 50.826 38.1861 50.9536 38.89L51.056 39.4685L15.5387 73.8969C15.3582 73.8795 15.1783 73.8596 14.9991 73.8409C14.4072 73.7767 13.7946 73.7124 13.1805 73.6963C7.30631 73.5259 3.69542 76.116 1.80964 81.8503C0.395138 86.151 1.94355 89.9895 3.23178 92.5031C4.10457 94.3089 5.43379 95.8517 7.0859 96.9748C8.73803 98.0985 10.6546 98.7639 12.6428 98.9034C12.843 98.9143 13.0427 98.9195 13.2422 98.9201C15.156 98.8912 17.0327 98.382 18.7028 97.4396C20.3728 96.4965 21.7836 95.1497 22.8082 93.5201C25.8693 88.8825 26.3451 84.5362 24.2534 80.2489L58.7173 47.1571L68.318 44.1679L96.7993 63.863C97.0238 68.0989 98.0703 71.2753 100.173 74.1232C101.397 75.8724 103.174 77.1517 105.213 77.7521C107.252 78.3519 109.432 78.2368 111.398 77.4262C117.081 75.2495 120.237 70.4261 120.088 64.1697L154.653 20.8963C159.556 21.8606 163.362 21.4107 165.969 19.5528C167.985 18.1186 169.212 15.895 169.615 12.9436C169.846 11.4554 169.772 9.93496 169.397 8.4767C169.022 7.01851 168.354 5.65349 167.434 4.46625C166.462 3.27794 165.259 2.30335 163.898 1.60274C162.538 0.902131 161.049 0.490445 159.524 0.393145Z"
                fill="#ef4444"></path>{" "}
            </g>{" "}
            <defs>
              {" "}
              <clipPath id="clip0">
                {" "}
                <rect
                  width="169"
                  height="99"
                  fill="white"
                  transform="translate(0.777344)"></rect>{" "}
              </clipPath>{" "}
            </defs>{" "}
          </g>
        </svg>
      ),
    },
  ];

  return (
    <section className="px-8 mb-12 md:px-24">
      <div className="container mx-auto">
        <h2 className="m-8 text-2xl font-semibold text-center text-white md:m-12 md:text-4xl">
          Key Features
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 text-center bg-white rounded-lg shadow-lg ">
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

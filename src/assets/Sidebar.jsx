
const Sidebar = () => {

  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function convertEpoch(epochStr) {
    const dt = new Date(epochStr);
    const jd = Math.floor(dt / 86400000) + 2440587.5;
    return jd;
}

function getAsteroidPosition(name, a, e, i, omegaNode, omega, M, epoch, date = new Date()) {
    i = toRadians(i);
    omegaNode = toRadians(omegaNode);
    omega = toRadians(omega);
    M = toRadians(M);
    const epochJD = convertEpoch(epoch);
    
    const jd = Math.floor(date / 86400000) + 2440587.5;
    const deltaT = jd - epochJD;
    const n = Math.sqrt(1 / Math.pow(a, 3));
    let M_t = M + n * deltaT;
    let E = M_t;

    for (let j = 0; j < 10; j++) {
        E = M_t + e * Math.sin(E);
    }

    const v = 2 * Math.atan2(Math.sqrt(1 + e) * Math.sin(E / 2), Math.sqrt(1 - e) * Math.cos(E / 2));
    const r = a * (1 - e * Math.cos(E));

    const x = r * (Math.cos(omegaNode) * Math.cos(omega + v) - Math.sin(omegaNode) * Math.sin(omega + v) * Math.cos(i));
    const y = r * (Math.sin(omegaNode) * Math.cos(omega + v) + Math.cos(omegaNode) * Math.sin(omega + v) * Math.cos(i));
    const z = r * (Math.sin(i) * Math.sin(omega + v));

    return { name, position: [x, y, z] };
}

const some = [
    {
      "name": "2023 GM1",
      "a": 2.426,
      "e": 0.543,
      "i": 3.35,
      "omegaNode": 22.41,
      "omega": 216.13,
      "M": 151.41,
      "epoch": "2023-03-19T00:00:00Z",
      "position": [0.9734852056203217, -0.7600433765642877, -0.06415751724776093]
    },
    {
      "name": "2014 VA",
      "a": 1.784,
      "e": 0.329,
      "i": 3.54,
      "omegaNode": 295.31,
      "omega": 222.51,
      "M": 34.81,
      "epoch": "2014-11-11T00:00:00Z",
      "position": [-0.4135284040037209, -1.21142134742697, -0.06676740858962699]
    },
    {
      "name": "2024 SY5",
      "a": 2.534,
      "e": 0.456,
      "i": 10.23,
      "omegaNode": 260.85,
      "omega": 191.31,
      "M": 118.91,
      "epoch": "2024-09-18T00:00:00Z",
      "position": [-2.065865133931518, 0.2800077783645488, 0.3890874556792513]
    },
    {
      "name": "2024 SH3",
      "a": 1.934,
      "e": 0.394,
      "i": 2.43,
      "omegaNode": 14.58,
      "omega": 202.29,
      "M": 209.51,
      "epoch": "2024-09-17T00:00:00Z",
      "position": [-0.7457409932580072, -1.681940040196903, -0.070167065315978]
    },
    {
      "name": "2024 SH1",
      "a": 2.093,
      "e": 0.274,
      "i": 4.59,
      "omegaNode": 322.24,
      "omega": 186.85,
      "M": 81.21,
      "epoch": "2024-09-17T00:00:00Z",
      "position": [-1.76417391180474, -0.4272839408565989, -0.141055449278792]
    }
  ]

  const fun1 = () => {
    document.querySelector(".someone").style.display = "block";
  };
  const fun2 = () => {
    document.querySelector(".someone").style.display = "none";
  };

  return (
    <div className="relative flex h-[50%] flex-col rounded-xl bg-black bg-clip-border p-4 text-white shadow-xl shadow-blue-gray-900/5">
      <div className="p-4 mb-2">
        <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          Sidebar
        </h5>
      </div>
      <nav className="flex min-w-[200px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
        <div onClick={fun1}
          role="button"
          className="flex hover:text-lg hover:text-blue-400 items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
        >
          <div className="grid mr-4 place-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                <path d="M2.17739 12.9793L3.49456 8.58065C3.81646 7.50568 4.55249 6.61291 5.5315 6.10993L7.12731 5.29006C8.37528 4.6489 9.89325 5.10311 10.6111 6.33247L12.1043 8.88966C12.4728 9.52075 12.6571 9.8363 12.8935 9.99873C13.2261 10.2272 13.6436 10.2803 14.0199 10.142C14.2875 10.0437 14.5404 9.78383 15.0463 9.264C16.2378 8.03972 18.2215 8.24155 19.1562 9.68215L20.3273 11.4872C20.9791 12.4918 21.1687 13.7398 20.8459 14.9007L20.5037 16.1314C20.1952 17.2407 19.4479 18.1659 18.4437 18.6818L12.8309 21.5655C11.504 22.2472 9.91895 22.1195 8.71171 21.2334L3.67752 17.5386C2.27465 16.5089 1.67039 14.6724 2.17739 12.9793Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15.9998 14H16.0088" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M11 15.5L9.5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M9 10.753C8.05719 10.1652 7.58579 9.87123 7.14645 10.0538C6.70711 10.2365 6.4714 10.8243 6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M19.9559 2H18.2338C17.9628 2 17.8273 2 17.7012 2.01974C17.4003 2.06683 17.1242 2.19626 16.9126 2.38941C16.8239 2.47039 16.7487 2.56914 16.5984 2.76663C16.2751 3.19139 16.1134 3.40378 16.0517 3.60076C15.9024 4.07694 16.0828 4.58571 16.5138 4.90401C16.6921 5.03568 16.9627 5.13048 17.5038 5.32008L18.5185 5.67557C19.1652 5.90215 19.4886 6.01543 19.8119 5.99831C19.9487 5.99106 20.0837 5.96679 20.2128 5.92623C20.5177 5.83042 20.7639 5.61473 21.2564 5.18334L21.4013 5.05647C21.5737 4.90543 21.66 4.82991 21.7287 4.74608C21.8585 4.58767 21.9449 4.40513 21.9809 4.21269C22 4.11085 22 4.00405 22 3.79044C22 3.30232 22 3.05826 21.9242 2.86139C21.7799 2.48681 21.4442 2.19275 21.0166 2.06641C20.7918 2 20.5131 2 19.9559 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div>
          Near Earth Astroids          
          </div>
        </div>
          <div>
          <div className="someone z-30 hidden w-[80] left-96 mb-10 absolute -top-36">
                <div className="flex justify-center w-full h-[30%]">
                  <div className="w-[38vw] text-white text-lg backdrop-filter backdrop-blur-sm bg-opacity-10 rounded-2xl bg-blue-300 font-semibold py-8 px-8 mt-10">
                    <div className="text-2xl">NEAR EARTH ASTROIDS</div>
                    <div className="flex justify-end">
                      <div
                        onClick={fun2}
                        className="cross1 cursor-pointer absolute top-8"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          color="#ffffff"
                          fill="none"
                        >
                          <path
                            d="M10.2471 6.7402C11.0734 7.56657 11.4866 7.97975 12.0001 7.97975C12.5136 7.97975 12.9268 7.56658 13.7531 6.74022L13.7532 6.7402L15.5067 4.98669L15.5067 4.98668C15.9143 4.5791 16.1182 4.37524 16.3302 4.25283C17.3966 3.63716 18.2748 4.24821 19.0133 4.98669C19.7518 5.72518 20.3628 6.60345 19.7472 7.66981C19.6248 7.88183 19.421 8.08563 19.0134 8.49321L17.26 10.2466C16.4336 11.073 16.0202 11.4864 16.0202 11.9999C16.0202 12.5134 16.4334 12.9266 17.2598 13.7529L19.0133 15.5065C19.4209 15.9141 19.6248 16.1179 19.7472 16.3299C20.3628 17.3963 19.7518 18.2746 19.0133 19.013C18.2749 19.7516 17.3965 20.3626 16.3302 19.7469C16.1182 19.6246 15.9143 19.4208 15.5067 19.013L13.7534 17.2598L13.7533 17.2597C12.9272 16.4336 12.5136 16.02 12.0001 16.02C11.4867 16.02 11.073 16.4336 10.2469 17.2598L10.2469 17.2598L8.49353 19.013C8.0859 19.4208 7.88208 19.6246 7.67005 19.7469C6.60377 20.3626 5.72534 19.7516 4.98693 19.013C4.2484 18.2746 3.63744 17.3963 4.25307 16.3299C4.37549 16.1179 4.5793 15.9141 4.98693 15.5065L6.74044 13.7529C7.56681 12.9266 7.98 12.5134 7.98 11.9999C7.98 11.4864 7.5666 11.073 6.74022 10.2466L4.98685 8.49321C4.57928 8.08563 4.37548 7.88183 4.25307 7.66981C3.63741 6.60345 4.24845 5.72518 4.98693 4.98669C5.72542 4.24821 6.60369 3.63716 7.67005 4.25283C7.88207 4.37524 8.08593 4.5791 8.49352 4.98668L8.49353 4.98669L10.2471 6.7402Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                    {some.map((item, i) =>(
                      <div className="w-[100%] py-3" key={i}>
                        {item.name} : 
                        a = <span className="px-4">{item.a}</span>
                        e = <span className="px-4 text-md">{item.e}</span>
                        i = <span className="px-4 text-md">{item.i}</span>
                        omegaNode = <span className="px-4">{item.omegaNode}</span>
                        omega = <span className="px-4">{item.omega}</span>
                        M = <span className="px-4">{item.M}</span>
                        epoch = <span className="px-4">{item.epoch}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
          </div>
        <div
          role="button"
          className="flex items-center hover:text-lg hover:text-blue-400 w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
        >
          <div className="grid mr-4 place-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
               <path d="M4.05025 10.0498C1.31658 12.7835 1.31658 17.2156 4.05025 19.9493C6.78392 22.683 11.2161 22.683 13.9497 19.9493L17.899 16M12.1001 2L6.5 7.60006M22 11.899L20 13.899" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
               <path d="M11.1213 12.8787C12.2929 14.0503 12.2929 15.9497 11.1213 17.1213C9.94975 18.2929 8.05025 18.2929 6.87868 17.1213C5.70711 15.9497 5.70711 14.0503 6.87868 12.8787C8.05025 11.7071 9.94975 11.7071 11.1213 12.8787Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
               <path d="M6.87869 12.8795L13.9998 5.75787M17.7574 2L15.9998 3.75772M21.9998 6.24338L15.3637 12.8795" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
           Near Earth Comits
        </div>
        <div
          role="button"
          className="flex items-center hover:text-lg hover:text-blue-400 w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
        >
          <div className="grid mr-4 place-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                <path d="M4.49843 5.00004C3.19503 4.97812 2.56968 5.23496 2.22294 6.14258C2.01241 6.69367 2 7.29677 2 7.88676V18C2.10783 18.6348 2.28792 19.0559 2.74232 19.4001C3.48302 19.9611 4.46716 20.0378 5.38129 20.2033C7.3857 20.5663 9.12918 21.1811 11.9937 22M19.489 5.00004C20.0658 4.95075 20.4998 4.97733 20.8427 5.13087C22.2148 5.74518 21.9874 7.76209 21.9874 9.26623V17C21.9944 17.5973 21.9559 18.0619 21.8719 18.4323C21.5518 19.8431 19.7432 20.0199 18.3213 20.2822C16.5435 20.6101 14.6465 21.1794 11.9937 22M11.9937 22V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M11.9929 12C14.7526 12 16.9898 9.76142 16.9898 7C16.9898 4.23858 14.7526 2 11.9929 2M11.9929 12C9.23326 12 6.99609 9.76142 6.99609 7C6.99609 4.23858 9.23326 2 11.9929 2M11.9929 12C13.0969 12 13.9917 9.76142 13.9917 7C13.9917 4.23858 13.0969 2 11.9929 2M11.9929 12C10.889 12 9.99421 9.76142 9.99421 7C9.99421 4.23858 10.889 2 11.9929 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <a target="_blank" href="https://science.nasa.gov/solar-system/planets/">
          Education Content
          </a>
        </div>
        <div
          role="button"
          className="flex items-center hover:text-lg hover:text-blue-400 w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
        >
          <div className="grid mr-4 place-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                <rect x="4" y="2" width="17.5" height="20" rx="4" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10.59 13.7408C9.96125 14.162 8.31261 15.0221 9.31674 16.0983C9.80725 16.624 10.3536 17 11.0404 17H14.9596C15.6464 17 16.1928 16.624 16.6833 16.0983C17.6874 15.0221 16.0388 14.162 15.41 13.7408C13.9355 12.7531 12.0645 12.7531 10.59 13.7408Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M15 9C15 10.1046 14.1046 11 13 11C11.8954 11 11 10.1046 11 9C11 7.89543 11.8954 7 13 7C14.1046 7 15 7.89543 15 9Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M5 6L2.5 6M5 12L2.5 12M5 18H2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          Contact Us
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;

import { ReactComponent as Logo } from "../assets/bike.svg";

const Home = () => {
  return (
    <div className="mx-auto max-w-xl px-4">
      <h1 className="mt-10 bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-rose-500 to-indigo-700 bg-clip-text text-center text-6xl font-extrabold leading-tight text-transparent sm:hidden">
        Helsinki Bikeapp
      </h1>
      <div className="mt-5 flex items-center border-b border-custom-isabelline">
        <h1 className="hidden bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-rose-500 to-indigo-700 bg-clip-text pb-5 text-5xl font-extrabold leading-tight text-transparent sm:block">
          Helsinki
          <br /> Bikeapp <br />
        </h1>
        <Logo className="ml-5 mt-5 h-32 w-32 animate-triangle-long fill-white stroke-white pb-3 sm:ml-10 sm:h-32 sm:w-32 sm:animate-triangle-short sm:pb-0" />
      </div>
      <h2 className="mt-10 bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-rose-500 to-indigo-700 bg-clip-text text-3xl font-extrabold leading-tight text-transparent">
        Description
      </h2>
      <div className="mt-8 max-w-prose text-custom-isabelline">
        A showcase of data from the 2021 season of city bikes in Helsinki done
        as my first portfolio project and as a challenge to deepen my knowledge
        of web technologies and practices.
      </div>
      <div className="my-3 max-w-prose text-custom-isabelline">
        The app is divided into pages to view all data as well as pages for
        individual journeys and stations.
      </div>
      <h2 className="mt-10 bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-rose-500 to-indigo-700 bg-clip-text text-3xl font-extrabold leading-tight text-transparent">
        Features (and upcoming features)
      </h2>
      <ul className="my-5 list-inside list-disc text-custom-isabelline">
        <li>Display all journeys and stations with pagination</li>
        <li>Sort data</li>
        <li>Search based on parameters</li>
        <li>View data of a specific journey or station on a new page</li>
        <li>Statistics page for all data</li>
        <li>Single View: Statistics</li>
        <li>Single View: Map of station or journey</li>
      </ul>
    </div>
  );
};

export default Home;

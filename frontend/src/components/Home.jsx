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
        What is it?
      </h2>
      <div className="mt-8 max-w-prose font-mono text-custom-isabelline">
        A showcase of data from the 2021 season of city bikes in Helsinki
        created as my first portfolio project. Its purpose is to deepen my
        knowledge of web technologies and practices.
      </div>
      <div className="my-3 max-w-prose font-mono text-custom-isabelline">
        Start by choosing a tab from the menu above!
      </div>
      <h2 className="mt-10 bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-rose-500 to-indigo-700 bg-clip-text text-3xl font-extrabold leading-tight text-transparent">
        Features
      </h2>
      <ul className="my-5 ml-6 list-inside list-disc font-mono text-custom-isabelline">
        <li className="-indent-6">Explore a map with every station on it</li>
        <li className="-indent-6">
          Display all journeys and stations with pagination
        </li>
        <li className="-indent-6">
          Search for stations and journeys based on names and addresses
        </li>
        <li className="-indent-6">
          Click on a journey or station for a detailed view
        </li>
        <li className="-indent-6">
          Single Journey View: Information and a map with departure and return
          stations
        </li>
        <li className="-indent-6">
          Single Station View: Information, map and statistics
        </li>
        <li className="-indent-6">Statistics page for all data</li>
      </ul>
    </div>
  );
};

export default Home;

const Home = () => {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mt-16 bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-rose-500 to-indigo-700 bg-clip-text text-5xl font-extrabold text-transparent">
        Helsinki CityBike App
      </h1>
      <div className="mt-10 max-w-prose text-custom-isabelline">
        A showcase of data from the 2021 season of city bikes in Helsinki done
        as my first portfolio project and as a challenge to deepen my knowledge
        of web technologies and practices.
      </div>
      <div className="my-3 max-w-prose text-custom-isabelline">
        The app is divided into pages to view all data as well as pages for
        individual journeys and stations.
      </div>
      <h1 className="mt-10 bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-rose-500 to-indigo-700 bg-clip-text text-3xl font-extrabold text-transparent">
        Features (and upcoming features)
      </h1>
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

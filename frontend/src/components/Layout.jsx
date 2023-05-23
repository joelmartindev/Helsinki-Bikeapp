import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header className="flex justify-between bg-gray-400 p-5 shadow">
        <Link to="/" className="mx-2 text-xl italic">
          Bikeapp
        </Link>
        <nav className="bg-red-50">
          <Link to="/" className="my-4 px-4">
            Home
          </Link>
          <Link to="/journeys" className="px-4">
            Journeys
          </Link>
          <Link to="/stations" className="px-4">
            Stations
          </Link>
        </nav>
      </header>
      <Outlet />
      <footer>
        <div>Footer of Bikeapp, Made in 2023</div>
      </footer>
    </>
  );
};

export default Layout;

import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { ReactComponent as Logo } from "../assets/bike.svg";

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-stone-100">
      <header className="bg-custom-eerie-black">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-3 align-middle shadow-md">
          <Link to="/" className="mx-2 flex ">
            <Logo className="h-10 w-10 fill-white stroke-black stroke-2" />
            <div className="bg-gradient-to-r from-lime-400 to-custom-malachite bg-clip-text pl-2 font-serif text-3xl font-extrabold italic text-transparent shadow-white drop-shadow">
              Bikeapp
            </div>
          </Link>
          <nav className="flex max-[449px]:flex-col">
            <div
              className="my-4 block px-4 text-lg font-semibold text-white min-[450px]:hidden"
              onClick={menuClick}
            >
              Menu
            </div>
            <Link
              to="/"
              className="my-4 hidden px-4  text-xl font-semibold text-white sm:block"
            >
              Home
            </Link>
            <Link
              to="/journeys"
              className={`${
                isMenuOpen ? "max-[449px]:block" : "hidden"
              } my-4 px-4 text-xl font-semibold text-white min-[450px]:block`}
            >
              Journeys
            </Link>
            <Link
              to="/stations"
              className={`${
                isMenuOpen ? "max-[449px]:block" : "hidden"
              } my-4 px-4 text-xl font-semibold text-white min-[450px]:block`}
            >
              Stations
            </Link>
          </nav>
        </div>
      </header>
      <div id="content" className="mx-auto min-h-screen max-w-6xl">
        <Outlet />
      </div>
      <footer className="mx-auto max-w-6xl">
        <div className="italic">Made by joelmartindev</div>
      </footer>
    </div>
  );
};

export default Layout;

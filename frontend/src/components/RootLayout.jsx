import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import { ReactComponent as Logo } from "../assets/bike.svg";
import { ReactComponent as GitHub } from "../assets/logo-github.svg";

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const activeTab = location.pathname.split("/")[1];

  const menuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex min-h-screen flex-col bg-custom-jet">
      <header className="bg-neutral-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-3 align-middle shadow-md">
          <Link to="/" className="mx-2 flex ">
            <Logo className="h-10 w-10 fill-white stroke-black stroke-2" />
            <div className="bg-gradient-to-r from-lime-400 to-custom-malachite bg-clip-text pl-2 font-serif text-3xl font-extrabold italic text-transparent shadow-white drop-shadow">
              Bikeapp
            </div>
          </Link>
          <nav className="flex max-md:flex-col">
            <div
              className="my-4 block px-4 text-lg font-semibold text-white md:hidden"
              onClick={menuClick}
            >
              Menu
            </div>
            <Link
              to="/"
              className={`
              ${
                activeTab == ""
                  ? "underline decoration-custom-pigment-green underline-offset-8"
                  : ""
              } my-4 hidden px-4  text-xl font-semibold text-white md:block`}
              onClick={menuClick}
            >
              Home
            </Link>
            <Link
              to="/explore"
              className={`${isMenuOpen ? "block" : "max-md:hidden"}
              ${
                activeTab == "explore"
                  ? "underline decoration-custom-pigment-green underline-offset-8"
                  : ""
              } my-4 px-4 text-xl font-semibold text-white`}
              onClick={menuClick}
            >
              Explore
            </Link>
            <Link
              to="/journeys"
              className={`${isMenuOpen ? "max-md:block" : "max-md:hidden"}
              ${
                activeTab == "journeys"
                  ? "underline decoration-custom-pigment-green underline-offset-8"
                  : ""
              } my-4 px-4 text-xl font-semibold text-white`}
              onClick={menuClick}
            >
              Journeys
            </Link>
            <Link
              to="/stations"
              className={`${isMenuOpen ? "max-md:block" : "max-md:hidden"}
              ${
                activeTab == "stations"
                  ? "underline decoration-custom-pigment-green underline-offset-8"
                  : ""
              } my-4 px-4 text-xl font-semibold text-white`}
              onClick={menuClick}
            >
              Stations
            </Link>
            <Link
              to="/statistics"
              className={`${isMenuOpen ? "max-md:block" : "max-md:hidden"}
              ${
                activeTab == "statistics"
                  ? "underline decoration-custom-pigment-green underline-offset-8"
                  : ""
              } my-4 px-4 text-xl font-semibold text-white`}
              onClick={menuClick}
            >
              Statistics
            </Link>
          </nav>
        </div>
      </header>
      <div id="content" className="">
        <Outlet />
      </div>
      <footer className="mx-auto mt-auto flex max-w-7xl px-2 pt-10">
        <div className="font-mono text-xs font-semibold italic text-custom-isabelline">
          made by joelmartindev 2023{" "}
          <a href="https://github.com/joelmartindev">
            <GitHub className="mx-1 my-1 inline-block h-5 w-5 fill-custom-isabelline stroke-custom-isabelline" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

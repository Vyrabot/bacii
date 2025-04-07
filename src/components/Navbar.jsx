import React from "react";
import { Link } from "react-router";
import { FaHamburger } from "react-icons/fa";
function Navbar() {
  return (
    <header className="w-full sticky top-0 h-[80px] bg-Primery">
      <nav className="flex justify-between items-center h-full">
        <div>
          <h2 className="text-accent font-semibold text-[1.3rem] md:text-2xl lg:text-4xl">
            គណនាពិន្ទុបាក់ឌុប
          </h2>
        </div>
        <div className="text-sm md:text-md lg*:text-xl flex md:*:w-[120px] h-[25px] md:*:h-[30px] :*lg:h-[40px] *:bg-bg2 *:rounded-md *:text-bg">
          <button className="mr-2">
            <Link to="/" className="p-3">
              វិទ្យាសាស្រ្ដ
            </Link>
          </button>
          <button>
            <Link to="/home2" className="p-4">
              សង្គម
            </Link>
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

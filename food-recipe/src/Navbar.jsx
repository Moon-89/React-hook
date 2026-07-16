import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "./context.jsx";

export default function Navbar() {
  const { searchParam, setSearchParam, handleSubmit } = useContext(GlobalContext);

  return (
    <nav className="navbar">
      <NavLink to="/" className="logo">FoodRecipe</NavLink>

      <form onSubmit={handleSubmit} className="search">
        <input
          type="text"
          placeholder="Enter Items..."
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
        />
      </form>

      <ul className="links">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/favorites">favorites</NavLink></li>
      </ul>
    </nav>
  );
}

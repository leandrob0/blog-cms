import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/user";

const Navbar = () => {
  const dispatch = useDispatch()

  const clickLogout = () => {
    dispatch(logout());
  }

  return (
    <nav className="flex justify-between bg-indigo-900 p-6 text-white">
      <div>
        <NavLink to="/">Home</NavLink>
      </div>
      <div className="flex justify-center">
          <p className="px-3 hover:cursor-pointer" onClick={clickLogout} >Logout</p>
      </div>
    </nav>
  );
};

export default Navbar;

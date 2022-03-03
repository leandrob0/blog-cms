import { NavLink } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";
import { logout } from "../../features/user";

const Navbar = () => {
  const username = useSelector((state) => state.user.value.username);
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
        {username !== "" && 
        <>
          <NavLink to="/create-post" className="px-3">Create post</NavLink>
          <p className="px-3 hover:cursor-pointer" onClick={clickLogout} >Logout</p>
        </>
        }
      </div>
    </nav>
  );
};

export default Navbar;

import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext.jsx";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";

export default function Nav() {
  const { onLogoutHandler, isAuthenticated } = useContext(AuthContext);

  return (
    <div className="navbar bg-primary text-secondary">
      <div className="flex-1">
        <a className="btn btn-ghost text-3xl">GYM MAK</a>
      </div>
      {isAuthenticated && (
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-primary rounded-box w-52"
            >
                <li className="hover:bg-cyan-800" >
                <Link
                  to="/dashboard"
                  className="flex justify-between align-baseline"
                >
                  {" "}
                  <DashboardIcon />
                  Табло{" "}
                </Link>
              </li>
              <li className="hover:bg-cyan-800">
                <Link
                  to="/profile"
                  className="flex justify-between align-baseline"
                >
                  {" "}
                  <AccountBoxIcon />
                  Профил{" "}
                </Link>
              </li>
              <li className="hover:bg-cyan-800">
                <a
                  className="flex justify-between align-baseline"
                  onClick={() => onLogoutHandler()}
                >
                  {" "}
                  <LogoutIcon />
                  Отписване
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

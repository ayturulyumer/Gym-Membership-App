import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Nav() {
  return (
    <div className="navbar bg-primary text-secondary">
      <div className="flex-1">
        <a className="btn btn-ghost text-3xl">GYM</a>
      </div>
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
            <li>
              <a className="flex justify-between align-baseline">
                {" "}
                <AccountBoxIcon />
                Профил{" "}
              </a>
            </li>
            <li>
              <a className="flex justify-between align-baseline">
                {" "}
                <LogoutIcon />
                Отписване
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BookOpen, Menu, X, User as UserIcon, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${
      isActive ? "text-indigo-600" : "text-slate-600 hover:text-indigo-600"
    }`;

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
    navigate("/");
  };

  const loggedOutLinks = (
    <>
      <NavLink to="/resources" className={linkClass}>Explore</NavLink>
      <NavLink to="/study-groups" className={linkClass}>Study Groups</NavLink>
      <NavLink to="/tutors" className={linkClass}>Tutors</NavLink>
      <NavLink to="/about" className={linkClass}>About</NavLink>
    </>
  );

  const loggedInLinks = (
    <>
      <NavLink to="/resources" className={linkClass}>Explore</NavLink>
      <NavLink to="/study-groups" className={linkClass}>Study Groups</NavLink>
      <NavLink to="/tutors" className={linkClass}>Tutors</NavLink>
      <NavLink to="/resources/add" className={linkClass}>Add Resource</NavLink>
      <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
      {user?.role === "admin" && (
        <NavLink to="/admin" className={linkClass}>Admin</NavLink>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur border-b border-slate-100">
      <div className="container-page flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-display font-semibold text-lg text-indigo-600">
          <span className="w-8 h-8 rounded-lg bg-indigo-500 text-white flex items-center justify-center">
            <BookOpen size={18} />
          </span>
          StudyNest
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {user ? loggedInLinks : loggedOutLinks}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-slate-200 hover:border-indigo-300 transition-colors"
              >
                <span className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center overflow-hidden">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <UserIcon size={14} />
                  )}
                </span>
                <span className="text-sm font-medium text-slate-700">{user.name.split(" ")[0]}</span>
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-100 rounded-xl shadow-lg py-1.5">
                  <Link to="/profile" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
                    Profile
                  </Link>
                  <Link to="/resources/manage" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
                    Manage Resources
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                  >
                    <LogOut size={14} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-indigo-600">
                Log in
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium px-4 py-2 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden text-slate-700" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white">
          <div className="container-page py-4 flex flex-col gap-4">
            {(user ? loggedInLinks : loggedOutLinks)}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-3">
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setOpen(false)} className="text-sm text-slate-600">Profile</Link>
                  <button onClick={handleLogout} className="text-sm text-left text-red-500">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)} className="text-sm text-slate-600">Log in</Link>
                  <Link
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium px-4 py-2 rounded-full bg-indigo-500 text-white text-center"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

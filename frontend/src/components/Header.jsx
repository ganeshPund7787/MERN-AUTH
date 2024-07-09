import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={"/"}>
          <h1 className="font-bold">MERN Auth</h1>
        </Link>
        <ul className="flex gap-4">
          <Link to={"/"}>
            <li>Home</li>
          </Link>
          <Link to={"/about"}>
            <li>About</li>
          </Link>
          {currentUser ? (
            <Link to={"/profile"}>
              <img
                className="h-[2rem] w-[2rem] rounded-2xl"
                src={currentUser.profileImage}
                alt="demo"
              />
            </Link>
          ) : (
            <Link to={"/signin"}>
              <li>Sign in</li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
};
export default Header;

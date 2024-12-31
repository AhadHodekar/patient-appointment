import { Link } from "react-router-dom";
import Section from "./Section.jsx";
import { useSelector } from "react-redux";
import { selectAuth } from "../store/features/authSlice.js";
import Logout from "../pages/Auth/Logout.jsx";

const Navbar = () => {
  const { loggedIn, isAdmin } = useSelector(selectAuth);
  return (
    <Section sectionClass="absolute top-0  left-0 w-full flex items-center justify-between  bg-accent text-primary font-semibold">
      <h3 className="uppercase">{"Meditorial"}</h3>
      {!isAdmin && (
        <div>
          <ul className="flex gap-[40px]">
            <Link to={"/"}>Home</Link>
            <Link to={"/doctors"}>Doctors</Link>
            <Link to={"/about"}>About</Link>
          </ul>
        </div>
      )}
      <div className="w-[80px]">
        {!loggedIn ? (
          <Link to={"/login"}>
            <button>Login</button>
          </Link>
        ) : (
          <Logout />
        )}
      </div>
    </Section>
  );
};

export default Navbar;

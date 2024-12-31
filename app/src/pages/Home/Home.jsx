import Section from "../../components/Section.jsx";
import Button from "../../components/Button.jsx";
import { selectAuth } from "../../store/features/authSlice.js";
import { firstConsolationDiscount } from "../../utils/constants.js";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Home = () => {
  const { name } = useSelector(selectAuth);
  return (
    <Section sectionClass="h-full flex flex-col items-center justify-center bg-primary text-accent">
      {!name ? (
        <h1>Welcome to Meditorial!</h1>
      ) : (
        <>
          <h1 className="">Welcome Back!</h1>
          <h2>{name}</h2>
        </>
      )}
      <div className="flex flex-col items-center gap-[20px] bg-primary text-accent p-[10px] rounded-md">
        <h3 className="text-yellow-500">
          Now get {firstConsolationDiscount}% discount on your first
          appointment!
        </h3>
        <div>
          <Link to={"/doctors"}>
            <Button buttonClass="bg-accent text-primary ">
              Book Appointment
            </Button>
          </Link>
        </div>
      </div>
    </Section>
  );
};
export default Home;

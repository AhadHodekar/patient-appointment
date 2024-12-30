import Section from "../../components/Section.jsx";
import { selectAuth } from "../../store/features/authSlice.js";
import { firstConsolationDiscount } from "../../utils/constants.js";
import { useSelector } from "react-redux";
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
        <button className=" rounded-md bg-accent font-semibold p-[5px] text-primary w-[120px]">
          Book Appointment
        </button>
      </div>
    </Section>
  );
};
export default Home;

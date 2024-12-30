// src/components/Login.jsx
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLoginMutation } from "../../store/services/authApi"; // Correct import
import { setUser } from "../../store/features/authSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  const [login, { data, isLoading, isSuccess, isError, error }] =
    useLoginMutation();

  const handleInputs = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      try {
        const response = await login({
          email: formData.email,
          password: formData.password,
        }).unwrap();
        localStorage.setItem("accessToken", response.token);
        console.log(data);
      } catch (error) {
        console.error("Login failed:", error); // Log error to debug
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      console.log("login in successfull");
      dispatch(setUser({ name: data.user.name, token: data.token }));
      navigate("/appointments");
    }
  }, [isSuccess]);

  return (
    <div className="absolute top-0 left-0 w-full h-full p-[20px] bg-accent flex items-center justify-center">
      <div className="absolute top-5 left-5">
        <Link to={"/"}>
          <h2 className="text-primary">{`< Home`}</h2>
        </Link>
      </div>
      <form
        className="border border-black p-[12px] admin flex flex-col justify-center w-[20rem] h-auto rounded-md gap-4"
        onSubmit={handleLogin}
      >
        <h1 className="text-2xl text-primary font-bold text-center">Login</h1>
        <hr className="bg-primary color-primary text-primary border-primary" />
        <div>
          <label htmlFor="email" className="text">
            Email:
          </label>
          <input
            type="email"
            className="input outline outline-1 p-2 w-full mt-2"
            placeholder="youremail@example.com"
            name="email"
            id="email"
            onChange={handleInputs}
          />
        </div>
        <div>
          <label htmlFor="password" className="text">
            Password:
          </label>
          <input
            placeholder="******"
            type="password"
            className="input outline outline-1 p-2 w-full mt-2"
            name="password"
            id="password"
            onChange={handleInputs}
          />
        </div>
        <button
          type="submit"
          className="btn p-4 mt-3 text-[1rem] font-bold rounded-md text-white bg-primary"
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
        {error && (
          <p className="text-red-500 text-center mt-2">
            {error.message || "Login failed. Please try again."}
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;

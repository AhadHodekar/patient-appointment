// src/components/Login.jsx
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useRegisterMutation } from "../../store/services/authApi"; // Correct import
import { setUser } from "../../store/features/authSlice";
import { useDispatch } from "react-redux";

const Register = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  const [
    register,
    { data, isLoading, isSuccess, isError, error: registerError },
  ] = useRegisterMutation();

  const handleInputs = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordTwo) {
      setError("Passwords do not match");
    } else {
      setError(null);
    }
    if (formData.email && formData.password) {
      try {
        const response = await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }).unwrap();
        // if (response)
        // localStorage.setItem("accessToken", response.token);
        console.log(data);
      } catch (error) {
        setError(registerError.data.msg);
        console.error("Login failed:", registerError);
      }
    }
  };
  console.log(error);
  useEffect(() => {
    if (isSuccess) {
      alert("login in successfull");
      dispatch(setUser({ name: data.user.name, token: data.token }));
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <div className="absolute top-0 left-0 flex flex-col gap-4 w-full overflow-hidden h-full p-[20px] bg-accent flex items-center justify-center">
      <div className="absolute top-5 left-5">
        <Link to={"/"}>
          <h2 className="text-primary">{`< Home`}</h2>
        </Link>
      </div>
      <form
        className="border border-black p-[12px] admin flex flex-col justify-center w-[20rem] h-auto rounded-md gap-4"
        onSubmit={handleLogin}
      >
        <h1 className="text-2xl text-primary font-bold text-center">
          Register
        </h1>
        <hr className="bg-primary color-primary text-primary border-primary" />
        <div>
          <label htmlFor="name" className="text">
            Name:
          </label>
          <input
            type="name"
            className="input outline outline-1 p-2 w-full mt-2"
            placeholder="full name"
            name="name"
            id="name"
            onChange={handleInputs}
          />
        </div>
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
        <div>
          <label htmlFor="passwordTwo" className="text">
            Re-enter Password:
          </label>
          <input
            placeholder="******"
            type="password"
            className="input outline outline-1 p-2 w-full mt-2"
            name="passwordTwo"
            id="passwordTwo"
            onChange={handleInputs}
          />
        </div>
        {error && (
          <div className="bg-red-100 p-2 rounded-md">
            <p className="text-red-500 text-center mt-2">
              {error || "Login failed. Please try again."}
            </p>
          </div>
        )}
        <button
          type="submit"
          className="btn p-4 mt-3 text-[1rem] font-bold rounded-md text-white bg-primary"
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? "Registering ..." : "Register"}
        </button>
      </form>
      <Link to="/login" className="font-semibold underline">
        Already have an account?, Login
      </Link>
    </div>
  );
};

export default Register;

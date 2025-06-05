import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import axiosInstance from "../../utils/axiosInstance";
import { UserContext } from "../../contexts/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter a password");
      return;
    }
  
    setError("");
    try {
      const response = await axiosInstance.post("backend/auth/login", {
        email,
        password,
      });
  
      console.log("Login Response:", response.data); // Debugging
  
      if (response.data?.access_token) {
        localStorage.setItem("access_token", response.data.access_token);
        
        if (!response.data.user) {
          console.error("User data missing in response");
          setError("Login failed - missing user data");
          return;
        }
  
        updateUser({
          id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
          // Add other required user fields
        });
        
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError(error.response?.data?.message || "Login failed. Please try again.");
    }
  };
  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Welcome Back</h3>
          <p className="text-xs text-gray-500 mt-1">
            Please enter your details to log in
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="email"
            className="text-xs"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary-dark transition-colors"
          >
            LOGIN
          </button>

          <p className="text-xs text-gray-600 text-center mt-4">
            Don't have an account?{" "}
            <Link
              className="font-medium text-primary underline hover:text-primary-dark"
              to="/signup"
            >
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;

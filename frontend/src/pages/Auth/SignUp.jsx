import React, { useState , useContext } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosInstance";
import { UserContext } from "../../contexts/UserContext";

// this is the modified code for the SignUp component
// this is the change that sheza made
const SignUp = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
  
    const { updateUser } = useContext(UserContext);
    const navigate = useNavigate();
  
    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    };
  
    const handleSignUp = async (e) => {
      e.preventDefault();
      
      if (!name) {
        setError("Please enter your full name");
        return;
      }
      if (!validateEmail(email)) {
        setError("Please enter a valid email address");
        return;
      }
      if (!password || password.length < 8) {
        setError("Password must be at least 8 characters");
        return;
      }
      
      setError(null);
      try {
        const response = await axiosInstance.post('backend/auth/signup', {
          name,
          email,
          password,
        });
  
  
        if (response.data?.error) {
          setError(response.data.message);
          return;
        }
  
        if (response.data?.access_token) {
          localStorage.setItem("access_token", response.data.access_token);
          
          // Properly structure user data - adjust according to your API response
          updateUser({
            id: response.data.user?.id || response.data.id,
            name: response.data.user?.name || name, // Fallback to form data if needed
            email: response.data.user?.email || email,
            profilePic: response.data.user?.profilePic || null
          });
  
          navigate('/dashboard'); // Changed from '/login' to '/dashboard'
        } else {
          setError("Signup successful but missing expected data");
        }
      } catch (error) {
        console.error("Signup Error:", error);
        setError(
          error.response?.data?.message || 
          'Something went wrong. Please try again later.'
        );
      }
    };

   return (
       <AuthLayout>
           <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
               {/* Header */}
               <div className="mb-6">
                   <h3 className="text-lg font-semibold text-gray-900">Create Account</h3>
                   <p className="text-xs text-gray-500 mt-1">
                       Please enter your details to sign up
                   </p>
               </div>


               {/* Form */}
               <form onSubmit={handleSignUp} className="space-y-4">
                   {/* Using the new ProfilePhotoSelector component */}
                   <ProfilePhotoSelector onPhotoSelect={setProfilePic} />


                   <Input
                       value={name}
                       onChange={({ target }) => setName(target.value)}
                       label="Full Name"
                       placeholder="John Doe"
                       type="text"
                   />


                   <Input
                       value={email}
                       onChange={({ target }) => setEmail(target.value)}
                       label="Email Address"
                       placeholder="john@example.com"
                       type="email"
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
                       SIGN UP
                   </button>


                   <p className="text-xs text-gray-600 text-center mt-4">
                       Already have an account?{" "}
                       <Link
                           className="font-medium text-primary underline hover:text-primary-dark"
                           to="/login"
                       >
                           Login
                       </Link>
                   </p>
               </form>
           </div>
       </AuthLayout>
   );
};


export default SignUp;
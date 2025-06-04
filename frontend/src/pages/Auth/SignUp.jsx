import React, { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/Inputs/Input";

const SignUp = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        
        if (!fullName) {
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
        // Add your signup logic here
    };

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePic(file);
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
                    {/* Profile Picture Upload */}
                    <div className="mb-4">
                        <label className="block text-xs text-gray-600 mb-2">
                            Profile Picture (Optional)
                        </label>
                        <div className="flex items-center">
                            <label className="cursor-pointer">
                                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                    {profilePic ? (
                                        <img 
                                            src={URL.createObjectURL(profilePic)} 
                                            alt="Profile" 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-gray-400">+</span>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleProfilePicChange}
                                    className="hidden"
                                />
                            </label>
                            <span className="ml-3 text-xs text-gray-500">
                                {profilePic ? profilePic.name : "Click to upload"}
                            </span>
                        </div>
                    </div>

                    <Input
                        value={fullName}
                        onChange={({ target }) => setFullName(target.value)}
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
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-[15px] text-slate-800 mb-2">{label}</label>
      )}

      <div className="relative">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          className="w-full p-3 border border-gray-200 rounded-md pr-10 bg-transparent outline-none focus:border-primary text-sm"
          onChange={(e) => onChange(e)}
        />

        {type === "password" && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {showPassword ? (
              <FaRegEye
                size={18}
                className="text-primary cursor-pointer"
                onClick={toggleShowPassword}
              />
            ) : (
              <FaRegEyeSlash
                size={18}
                className="text-slate-400 cursor-pointer"
                onClick={toggleShowPassword}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;

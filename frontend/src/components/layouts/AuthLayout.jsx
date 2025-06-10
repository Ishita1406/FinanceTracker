import React from "react";
import { LuTrendingUpDown } from "react-icons/lu";
import Card2 from "/dist/assets/Card2.png"

const AuthLayout = ({ children }) => { 
  return (
    <div className="flex flex-row w-full h-screen">
      {/* Left side - form content */}
      <div className="w-full md:w-[60vw] px-12 pt-8 pb-12 flex flex-col">
        <h2 className="text-lg font-medium text-black">Expense Tracker</h2>
        {children}
      </div>

      {/* Right side - decorative elements */}
      <div className="hidden md:flex w-[40vw] h-screen bg-violet-50 relative overflow-hidden p-8">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-fuchsia-100" />
        <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5" />
        <div className="w-48 h-48 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-10" />
        <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -bottom-7 -left-5" />

        {/* Stats Card */}
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-full px-8">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track your income and Expenses"
            value="430,000"
            color="bg-primary"
          />
        </div>

        {/* Card image */}
        <img
          src={Card2}
          className="w-64 lg:w-[90%] absolute bottom-10 right-10 shadow-lg shadow-blue-400/15 z-10 rounded-xl"
          alt="Credit Card"
        />
      </div>
    </div>
  );
};

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-purple-400/10 border border-gray-200/50 z-30">
      <div
        className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>
      <div>
        <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
        <span className="text-[20px]">${value}</span>
      </div>
    </div>
  );
};

export default AuthLayout;

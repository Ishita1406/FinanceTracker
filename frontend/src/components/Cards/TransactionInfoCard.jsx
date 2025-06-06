import React from "react";
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
} from "react-icons/lu";

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60">
      {/* Fixed Icon Container */}
      <div className="w-12 h-12 flex items-center justify-center text-2xl bg-gray-100 rounded-full">
        {icon ? (
          <img src={icon} alt={title} className="w-6 h-6" />
        ) : (
          <LuUtensils className="text-gray-600" />  
        )}
      </div>

      <div className="flex-1">
        <h5 className="font-medium">{title}</h5>
        <p className="text-sm text-gray-500">{date}</p>
      </div>

      <div
        className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${
          type === "income" ? "text-green-500" : "text-red-500"
        }`}
      >
        <h6 className="font-medium">
          {type === "income" ? "+" : "-"} ${amount}
        </h6>
        {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
      </div>

      {!hideDeleteBtn && (
        <button
          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
          onClick={onDelete}
        >
          <LuTrash2 size={18} />
        </button>
      )}
    </div>
  );
};

export default TransactionInfoCard;
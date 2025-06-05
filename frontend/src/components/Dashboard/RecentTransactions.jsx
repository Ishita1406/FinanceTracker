import React from "react";

const RecentTransactions = ({transactions, onSeeMore}) => {
  return (
  <div className="card">
    <div className="flex items-center justify-between">
      <h5 className="text-lg">Recent Transactions</h5>
      <button className="" onClick={onSeeMore}>See more</button>
    <div className="card-body">
     
              </div>
    
  </div>
  </div>
  );
};

export default RecentTransactions;

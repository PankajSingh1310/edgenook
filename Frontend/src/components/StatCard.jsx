import React from 'react'

const StatCard = ({ label, value, color }) => (
    
    <div className={`bg-${color}-500 dark:text-white p-4 rounded-lg shadow-md`}>
      <h3 className="text-base font-medium">{label}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
    
  );
  

export default StatCard
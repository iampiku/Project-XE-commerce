import React from "react";

interface DashboardProps {
}

const Dashboard: React.FC<DashboardProps> = ({}: DashboardProps) => {
    return (
        <React.Fragment>
            <div className="text-sm text-indigo-700">Dashboard Content Area</div>
        </React.Fragment>
    );
};

export default Dashboard;

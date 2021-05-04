import React from "react";

interface DashboardProps {
}

const Dashboard: React.FC<DashboardProps> = ({}: DashboardProps) => {

    function Card(): JSX.Element {
        return (
            <React.Fragment>
                <div className={'bg-white p-2 hover:shadow-xl hover:bg-gray-50 cursor-pointer rounded-md border border-blue-600 shadow'}>
                    <div className="flex flex-1 space-x-4">
                        <div className="text-sm- text-blue-700">Total Order</div>
                        <div className="text-sm- text-red-500 font-bold">74516</div>
                    </div>
                    123
                </div>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <div className="text-sm- text-indigo-700">Dashboard Content Area</div>
            <div className="my-4 p-6">
                <div className="flex items-center max-w-full justify-center space-x-3 overflow-x-auto">
                    {[1,2,3,5,6].map(() => <Card/> )}
                </div>
            </div>
        </React.Fragment>
    );
};

export default Dashboard;

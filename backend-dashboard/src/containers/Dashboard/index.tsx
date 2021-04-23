import React from 'react';
import Container from '../../components/Container';

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = ({}: DashboardProps) => {
  return (
    <Container>
      <div className="text-blue-600 cursor-pointer p-2 inline-flex">
        Dashboard
      </div>
    </Container>
  );
};

export default Dashboard;

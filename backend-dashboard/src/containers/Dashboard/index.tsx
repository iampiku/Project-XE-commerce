import React from "react";
import { SideNavbar } from "../../components";
import Container from "../../components/Container";
import "./style.css";

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = ({}: DashboardProps) => {
  return (
    <Container>
      <div className="grid-container">
        <SideNavbar />
        <div className="overflow-y-auto flex flex-col items-center justify-center">
          2
        </div>
        <div className="sticky">3</div>
      </div>
    </Container>
  );
};

export default Dashboard;

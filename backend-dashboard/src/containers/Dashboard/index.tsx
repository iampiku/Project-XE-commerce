import React from "react";
import { GridLayout, SideNavbar } from "../../components";
import Container from "../../components/Container";

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = ({}: DashboardProps) => {
  return (
    <Container>
      <GridLayout>
        <SideNavbar />
        <div className="overflow-y-auto flex flex-col items-center justify-center">
          2
        </div>
        <div className="sticky">3</div>
      </GridLayout>
    </Container>
  );
};

export default Dashboard;

import React from "react";
import { Container, Main, RightSideNavBar } from "..";
import { GridLayout, SideNavbar } from "../../components";

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = ({}: DashboardProps) => {
  return (
    <Container>
      <GridLayout>
        <SideNavbar />
        <Main />
        <RightSideNavBar />
      </GridLayout>
    </Container>
  );
};

export default Dashboard;

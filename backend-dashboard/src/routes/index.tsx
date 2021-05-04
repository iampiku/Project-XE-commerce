import React from "react";
import {Route} from "react-router-dom";
import {CategoryDetails, GridLayout, Login, SideNavbar, SignUp} from "../components";
import {Category, Container, Dashboard, RightSideNavBar} from "../containers";
import {AppStateContextProvider} from "../context/appState.context";

export function AuthenticatedRoutes() {
    console.log(`render authenticated routes`);
    return (
        <AppStateContextProvider>
            <Container>
                <GridLayout>
                    <SideNavbar/>
                    <div className="main-content-area">
                        <Route exact={true} path={"/"} component={Dashboard}/>
                        <Route exact={true} path={'/categories'} component={Category} />
                        <Route exact={true} path={'/categories/:categorySlug'} component={CategoryDetails} />
                    </div>
                    <RightSideNavBar/>
                </GridLayout>
            </Container>
        </AppStateContextProvider>
    );
}

export function UnAuthenticatedRoutes() {
    console.log(`render unauthenticated routes`);

    return (
        <React.Fragment>
            <Route exact={true} path="/signup" component={SignUp}/>
            <Route exact={true} path="/" component={Login}/>
            <Route path={'*'} render={() => <> 404 NOT FOUND </> } />
        </React.Fragment>
    );
}

import React from "react";
import {Route, Router, Switch } from "react-router-dom";
import Header from "./Header";
import EveryDayGoalEdit from "./everydaygoals/EverydayGoalEdit";
import EveryDayGoalCreate from "./everydaygoals/EverydayGoalCreate";
import EveryDayGoalDetail from "./everydaygoals/EverydayGoalDetail";
import EveryDayGoalList from "./everydaygoals/EverydayGoalList";
import EveryDayGoalDelete from "./everydaygoals/EverydayGoalDelete";
import history from "../history";
import HomePage from "./HomePage";
import RegisterComponent from "./RegisterComponent";
import SignInComponent from "./SignInComponent";
import NotFoundPage from "./NotFoundPage";
import EverydayGoalCommit from "./everydaygoals/EverydayGoalCommit";

const App = () => {
    return (
        <div className="ui container">
            <Router history={history}>
                <div>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/signin" exact component={SignInComponent} />
                        <Route path="/register" exact component={RegisterComponent} />
                        <Route path="/goals" exact component={EveryDayGoalList} />
                        <Route path="/goals/everydaygoals/new" exact component={EveryDayGoalCreate} />
                        <Route path="/goals/everydaygoals/edit/:id" exact component={EveryDayGoalEdit} />
                        <Route path="/goals/everydaygoals/delete/:id" exact component={EveryDayGoalDelete} />
                        <Route path="/goals/everydaygoals/commit/:id" exact component={EverydayGoalCommit} />
                        <Route path="/goals/everydaygoals/:id" exact component={EveryDayGoalDetail} />
                        <Route path="/goals/everydaygoals/:id" exact component={EveryDayGoalDetail} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
};

export default App;
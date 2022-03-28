import React from "react";
import {Route, Router, Switch } from "react-router-dom";
import Header from "./Header";
import EveryDayGoalEdit from "./everydaygoals/EverydayGoalEdit";
import EveryDayGoalCreate from "./everydaygoals/EverydayGoalCreate";
import EveryDayGoalDetail from "./everydaygoals/EverydayGoalDetail";
import EveryDayGoalList from "./everydaygoals/EverydayGoalList";
import EveryDayGoalDelete from "./everydaygoals/EverydayGoalDelete";
import history from "../history";

const App = () => {
    return (
        <div className="ui container">
            <Router history={history}>
                <div>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={EveryDayGoalList} />
                        <Route path="/everydaygoals/new" exact component={EveryDayGoalCreate} />
                        <Route path="/everydaygoals/edit/:id" exact component={EveryDayGoalEdit} />
                        <Route path="/everydaygoals/delete/:id" exact component={EveryDayGoalDelete} />
                        <Route path="/everydaygoals/:id" exact component={EveryDayGoalDetail} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
};

export default App;
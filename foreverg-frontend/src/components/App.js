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
import ToastNotifications from "./ToastNotifications";
import DiarylList from "./diaries/DiarylList";
import DiaryCreate from "./diaries/DiaryCreate";
import DiaryEdit from "./diaries/DiaryEdit";
import DiaryDelete from "./diaries/DiaryDelete";
import DiaryDetail from "./diaries/DiaryDetail";

const App = () => {
    return (
        <div className="ui container">
            <Router history={history}>
                <div>
                    <Header />
                    <ToastNotifications position="bottom-right" autoDeleteInterval={1500}/>
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/signin" exact component={SignInComponent} />
                        <Route path="/register" exact component={RegisterComponent} />

                        //Goals
                        <Route path="/goals" exact component={EveryDayGoalList} />
                        <Route path="/goals/everydaygoals/new" exact component={EveryDayGoalCreate} />
                        <Route path="/goals/everydaygoals/edit/:id" exact component={EveryDayGoalEdit} />
                        <Route path="/goals/everydaygoals/delete/:id" exact component={EveryDayGoalDelete} />
                        <Route path="/goals/everydaygoals/commit/:id" exact component={EverydayGoalCommit} />
                        <Route path="/goals/everydaygoals/:id" exact component={EveryDayGoalDetail} />
                        <Route path="/goals/everydaygoals/:id" exact component={EveryDayGoalDetail} />
                        
                        //Diaries
                        <Route path="/diarys" exact component={DiarylList} />
                        <Route path="/diarys/new" exact component={DiaryCreate} />
                        <Route path="/diarys/edit/:id" exact component={DiaryEdit} />
                        <Route path="/diarys/delete/:id" exact component={DiaryDelete} />
                        <Route path="/diarys/:id" exact component={DiaryDetail} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
};

export default App;
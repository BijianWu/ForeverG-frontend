import React from "react";
import {BrowserRouter, Route, Router, Switch } from "react-router-dom";
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
import FutureTaskList from "./futuretasks/FutureTaskList";
import FutureTaskCreate from "./futuretasks/FutureTaskCreate";
import FutureTaskEdit from "./futuretasks/FutureTaskEdit";
import FutureTaskDelete from "./futuretasks/FutureTaskDelete";
import FutureTaskDetail from "./futuretasks/FutureTaskDetail";
import FutureTaskComplete from "./futuretasks/FutureTaskComplete";
import { DIARIES_DELETE_PAGE_LINK_PREFIX, DIARIES_DETAIL_PAGE_LINK_PREFIX, DIARIES_EDIT_PAGE_LINK_PREFIX, DIARIES_HOME_PAGE_LINK, DIARIES_NEW_PAGE_LINK, EVERY_DAY_GOALS_COMMIT_PAGE_LINK_PREFIX, EVERY_DAY_GOALS_DELETE_PAGE_LINK_PREFIX, EVERY_DAY_GOALS_DETAIL_PAGE_LINK_PREFIX, EVERY_DAY_GOALS_EDIT_PAGE_LINK_PREFIX, EVERY_DAY_GOALS_HOME_PAGE_LINK, EVERY_DAY_GOALS_NEW_PAGE_LINK, FUTRUE_TASKS_COMPLETE_PAGE_LINK_PREFIX, FUTRUE_TASKS_DELETE_PAGE_LINK_PREFIX, FUTRUE_TASKS_DETAIL_PAGE_LINK_PREFIX, FUTRUE_TASKS_EDIT_PAGE_LINK_PREFIX, FUTRUE_TASKS_HOME_PAGE_LINK, FUTRUE_TASKS_NEW_PAGE_LINK, HOME_PAGE_LINK, REGISTER_PAGE_LINK, SIGN_IN_PAGE_LINK } from "../constants/pagesLink";

const App = () => {
    return (
        <div className="ui container">
            <BrowserRouter history={history} basename="ForeverG-frontend">
                <div>
                    <Header />
                    <ToastNotifications position="bottom-right" autoDeleteInterval={1500}/>
                    <Switch>
                        <Route path= {`${HOME_PAGE_LINK}`} exact component={HomePage} />
                        <Route path= {`${SIGN_IN_PAGE_LINK}`} exact component={SignInComponent} />
                        <Route path= {`${REGISTER_PAGE_LINK}`} exact component={RegisterComponent} />

                        //Goals
                        <Route path={`${EVERY_DAY_GOALS_HOME_PAGE_LINK}`} exact component={EveryDayGoalList} />
                        <Route path={`${EVERY_DAY_GOALS_NEW_PAGE_LINK}`} exact component={EveryDayGoalCreate} />
                        <Route path={`${EVERY_DAY_GOALS_EDIT_PAGE_LINK_PREFIX}/:id`} exact component={EveryDayGoalEdit} />
                        <Route path={`${EVERY_DAY_GOALS_DELETE_PAGE_LINK_PREFIX}/:id`} exact component={EveryDayGoalDelete} />
                        <Route path={`${EVERY_DAY_GOALS_COMMIT_PAGE_LINK_PREFIX}/:id`} exact component={EverydayGoalCommit} />
                        <Route path={`${EVERY_DAY_GOALS_DETAIL_PAGE_LINK_PREFIX}/:id`} exact component={EveryDayGoalDetail} />
                        
                        //Diaries
                        <Route path={`${DIARIES_HOME_PAGE_LINK}`} exact component={DiarylList} />
                        <Route path={`${DIARIES_NEW_PAGE_LINK}`} exact component={DiaryCreate} />
                        <Route path={`${DIARIES_EDIT_PAGE_LINK_PREFIX}/:id`} exact component={DiaryEdit} />
                        <Route path={`${DIARIES_DELETE_PAGE_LINK_PREFIX}/:id`} exact component={DiaryDelete} />
                        <Route path={`${DIARIES_DETAIL_PAGE_LINK_PREFIX}/:id`} exact component={DiaryDetail} />

                        //Future Tasks
                        <Route path={`${FUTRUE_TASKS_HOME_PAGE_LINK}`} exact component={FutureTaskList} />
                        <Route path={`${FUTRUE_TASKS_NEW_PAGE_LINK}`} exact component={FutureTaskCreate} />
                        <Route path={`${FUTRUE_TASKS_EDIT_PAGE_LINK_PREFIX}/:id`} exact component={FutureTaskEdit} />
                        <Route path={`${FUTRUE_TASKS_DELETE_PAGE_LINK_PREFIX}/:id`} exact component={FutureTaskDelete} />
                        <Route path={`${FUTRUE_TASKS_COMPLETE_PAGE_LINK_PREFIX}/:id`} exact component={FutureTaskComplete} />
                        <Route path={`${FUTRUE_TASKS_DETAIL_PAGE_LINK_PREFIX}/:id`} exact component={FutureTaskDetail} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;
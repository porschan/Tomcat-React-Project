import React from 'react';
import {Redirect, Switch, Router, Route} from 'dva/router';
import Dashboard from './routes/Dashboard';
import HandleVideoTask from './routes/HandleVideoTask';
import VideoTaskList from './routes/VideoTaskList';
import HangupFrom from './routes/HangupFrom';
import DelayFrom from './routes/DelayFrom';
import SurveyFrom from './routes/SurveyFrom';
import ReportingFrom from './routes/ReportingFrom';
import ReportingList from './routes/ReportingList';
import ReportingLikeList from './routes/ReportingLikeList';


import TaskDetail from './routes/taskDetail';
import DeviceReporting from './routes/deviceReporting';
import TaskList from './routes/taskList';

function RouterConfig({history, app}) {
    return (
        <Router history={history}>
            <Switch>
                {Dashboard(app)}
                {HandleVideoTask(app)}
                {VideoTaskList(app)}
                {HangupFrom(app)}
                {DelayFrom(app)}
                {SurveyFrom(app)}
                {ReportingFrom(app)}
                {ReportingList(app)}
                {ReportingLikeList(app)}

                {TaskDetail(app)}
                {DeviceReporting(app)}
                {TaskList(app)}
                <Redirect from="/" to={'/dashboard'}/> {/*打开默认进入应用面板*/}
            </Switch>
        </Router>
    );
}

export default RouterConfig;

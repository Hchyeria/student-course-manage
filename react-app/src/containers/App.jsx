import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import Header from './frame/Header'
import Footer from './../components/frame/Footer'
import Contain from './../components/frame/Contain'
import Home from './home/Home'
import Course from './home/Course'
import Student from './home/Student'
import CourseInfo from './home/CourseInfo'
import Search from './home/Search'
import { getStudentInfo } from '../actions/student/info'
import { getAvgSoreStudent } from '../actions/selection/avgScore'


class App extends Component {
    static propTypes = {
        isLogin: PropTypes.bool.isRequired
    };

    componentWillMount() {
        const { isLogin, history, getStudentInfo, getAvgSoreStudent } = this.props
        const isLoginSave = localStorage.getItem('isLogin')
        if(!isLoginSave){
            if(!isLogin){
                return history.push( '/login')    
             }
        }

        const { sid, sname } = JSON.parse(localStorage.getItem('student'))
        getStudentInfo(sid, sname)
        getAvgSoreStudent(sid)

    }

    render() {
        return (
            <div id="app">
                <Header></Header>
                <Contain>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/course" component={Course} />
                        <Route path="/course/info/:cid" component={CourseInfo} />
                        <Route path="/student" component={Student} />
                        <Route path="/search" component={Search} />
                    </Switch>
                </Contain>
                <Footer></Footer>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLogin: state.getIn(['loginList', 'success'])
});
const mapDispatchToProps = dispatch => ({
    getStudentInfo: (sid, sname) => dispatch(getStudentInfo(sid, sname)),
    getAvgSoreStudent: (sid) => dispatch(getAvgSoreStudent(sid))
});
App = withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

export default App;

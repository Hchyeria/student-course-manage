import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Dynamic from './../../components/echarts/Dynamic'
import TransitionablePortal from './../../containers/common/TransitionablePortal'
import SortableTable from './../common/SortableTable';
import { getStudent } from '../../actions/student/addDelet'
import { sortTablbe } from '../../actions/common/table'
import {  toJS } from './../../utils'

const studentDataKey = {
    sid: '学号',
    sname: '姓名',
    gender: '性别',
    entranceAge: '入学年龄',
    entranceYear: '年级',
    classId: '班级',
    isselect: ''
}

class Student extends Component{
  

    componentWillMount() {
        const { getStudent } = this.props
        getStudent()
    }

    handelPage = (page) =>{
        const { getStudent } = this.props
        getStudent(page)
    }
    render(){
        const {  studentList } = this.props
        const { match: { params: { keyword, page } }, search } = this.props;
        let coursepaths = /\/course\/(\d+)\/?$/.exec(window.location.pathname);
        return(
            <div>
                <TransitionablePortal />
                <SortableTable 
                    tableData= { studentList }
                    dataKey={ studentDataKey }
                    iseditable={true}
                    isAdd= {true}
                    isStudent = {true}
                    getStudent={ this.handelPage }
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    studentList: state.getIn(['changeStudentList', 'studentList'])
});
const mapDispatchToProps = dispatch => ({
    getStudent: (page) => dispatch(getStudent(page))
});

Student = connect(mapStateToProps, mapDispatchToProps)(toJS(Student));

export default Student;

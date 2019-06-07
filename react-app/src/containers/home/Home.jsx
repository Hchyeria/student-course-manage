import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import TransitionablePortal from './../../containers/common/TransitionablePortal'
import Events from './../../components/echarts/Events'
import Loading from './../../components/echarts/Loading'
import Card from './../../components/home/Card';
import SortableTable from './../common/SortableTable';
import { sortTablbe } from '../../actions/common/table'

import { filterSelectInfo, toJS } from './../../utils'

const homeDataKey = {
    cid: '课程编号',
    cname: '课程名称',
    teacherName: '授课教师',
    suitGrade: '适合年级',
    cancelYear: '取消年份',
    selectYear: '选课年份',
    score: '成绩',
    isselect: ''
}

class Home extends Component{
    static propTypes = {
        selectInfo: PropTypes.array.isRequired,
        sortTablbe: PropTypes.func.isRequired,
        studentInfo: PropTypes.shape({
            sname: PropTypes.string.isRequired,
            sid: PropTypes.number.isRequired,
            gender: PropTypes.string.isRequired,
            entranceYear: PropTypes.number.isRequired,
            entranceAge: PropTypes.number.isRequired,
            classId: PropTypes.number.isRequired
        })
    };
    static defaultProps = {
        selectInfo: [],
        studentInfo: []
    }

    render(){
        const { selectInfo, sortTablbe, studentInfo, avgScore } = this.props
        console.log(selectInfo)
        const { match: { params: { keyword, page } }, search } = this.props;
        let coursepaths = /\/course\/(\d+)\/?$/.exec(window.location.pathname);
        if(selectInfo){
            return(
                <div>
                    <TransitionablePortal></TransitionablePortal>
                    <div className="row ui grid">
                    
                    <div className="five wide column">
                    {studentInfo.sid? <Card studentInfo={ studentInfo } selectLength={ selectInfo.length } /> : ''}
                    </div>
                { selectInfo.length?
                    <div className="eleven wide column">
                        <Loading selectInfo = { selectInfo }></Loading>
                        <Events 
                            selectInfo= { avgScore && avgScore.selectInfoDetail } 
                            totalAvg={ avgScore && avgScore.totalAvg }
                            subtext= { avgScore && `按年份 总平均为 ${ avgScore.totalAvg }` }
                        ></Events>
                    </div> : ''
                }
                {selectInfo.length?
                    <SortableTable 
                        tableData= { selectInfo } 
                        dataKey={ homeDataKey } 
                        sortTablbe= { sortTablbe }
                        iseditable={true}>
                    </SortableTable> : ''
                }
                </div>
                </div> 
            );
        }
        else{
            return(
                <div>
                    <TransitionablePortal></TransitionablePortal>
                    <div className="row ui grid">
                    
                    <div className="five wide column">
                    {studentInfo.sid? <Card studentInfo={ studentInfo } /> : ''}
                    </div>
                </div>
                </div> 
            );
        }
        
    }
}

const mapStateToProps = state => ({
    selectInfo: state.getIn(['studentInfo', 'studentInfo', 'selectInfo']),
    studentInfo: state.getIn(['loginList', 'student']),
    avgScore: state.getIn(['getAvgScore', 'studentAvgScore'])
});
const mapDispatchToProps = dispatch => ({
    sortTablbe: (clickedColumn, data, column) => dispatch(sortTablbe(clickedColumn, data, column))
});

Home = connect(mapStateToProps, mapDispatchToProps)(toJS(Home));

export default Home;

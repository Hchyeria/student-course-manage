import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddForm from './../../components/common/AddForm'
import TableSortable from '../../components/common/SortableTable'
import { changeSelection, addSelection } from '../../actions/selection/selection'
import { changeCourse, deletCourseInfo, deletCourse, changeCourseSelect } from '../../actions/course/allCourse'
import { deletSelection, deletSelectionInfo } from '../../actions/selection/selection'
import { deletStudent } from '../../actions/student/addDelet'
import { changeStudentInfo } from '../../actions/student/info'
import { toJS } from './../../utils'

class TableExampleSortable extends Component {
  static propTypes = {
    dataKey: PropTypes.shape({
      cid: PropTypes.string,
      cname: PropTypes.string,
      teacherName: PropTypes.string,
      suitGrade: PropTypes.string,
      selectYear: PropTypes.string,
      score: PropTypes.string,
      cancelYear: PropTypes.string
    }),
    tableData: PropTypes.array.isRequired,
    sortTablbe: PropTypes.func,
    changeSelection: PropTypes.func,
    changeCourse: PropTypes.func,
    changeCourseSelect: PropTypes.func,
    deletSelectionInfo: PropTypes.func,
    getStudent: PropTypes.func
  };
  static defaultProps = {
    isStudent: false,
    isAdd: false,
    cid: undefined
  }
  constructor(){
    super()
    this.state = {
      isShowAdd: false
    }
  }
  handleAdd = (type) =>{
    this.setState({
      isShowAdd: true
    })
  }
  

  render() {
    const { dataKey, tableData, cid, isCourse, getCourseInfo, sortTablbe, getStudent, changeStudentSucces, changeSelection, changeCourse, iseditable, isFetch, deletCourse, deletSelection, deletSelectionInfo, changeCourseSelect, addSelection, isAdd, isStudent, deletCourseInfo, deletSuccess, deletStudent, changeStudentInfo } = this.props
    const { isShowAdd } = this.state  
    if(isShowAdd && (isStudent? !changeStudentSucces : !deletSuccess)){
        return(
          <AddForm isStudent={ isStudent } ></AddForm>
        )
      }
      else{
        return(
          <div>
        <TableSortable 
          dataKey={ dataKey } 
          tableData={ tableData } 
          sortTablbe={ sortTablbe } 
          changeSelection={ changeSelection }
          changeCourse = { changeCourse }
          addSelection = { addSelection }
          deletSelection={ deletSelection }
          deletCourse= { deletCourse }
          deletSelectionInfo= { deletSelectionInfo }
          changeCourseSelect= { changeCourseSelect }
          deletCourseInfo={deletCourseInfo }
          deletStudent={ deletStudent }
          iseditable={ iseditable }
          isStudent = {isStudent }
          isAdd = { isAdd }
          isFetch={ isFetch }
          changeStudentInfo={ changeStudentInfo }
          handleAdd= { this.handleAdd }
          getStudent={ getStudent }
          getCourseInfo={ getCourseInfo }
          isCourse= {isCourse}
          cid= { cid }
          >
        </TableSortable>
      </div>
        )
      }

  }
}

const mapStateToProps = (state, ownProps) => {
  return{
    isFetch: state.getIn(['changeCourse', 'isFetch']),
    deletSuccess: state.getIn(['changeCourse', 'success']),
    changeStudentSucces: state.getIn(['studentList', 'success'])
  }
};
const mapDispatchToProps = dispatch => { 
  return {
    changeSelection: (data) => dispatch(changeSelection(data)),
    changeCourse: ( postData, index) => dispatch(changeCourse(postData, index)),
    deletSelection: (data) => dispatch(deletSelection(data)),
    deletSelectionInfo: (cid) => dispatch(deletSelectionInfo(cid)),
    changeCourseSelect : (cid, isselect) => dispatch(changeCourseSelect(cid, isselect)),
    addSelection: (data)=> dispatch(addSelection(data)),
    deletCourse: (cid, index) => dispatch(deletCourse(cid, index)),
    deletCourseInfo: (index) => dispatch(deletCourseInfo(index)),
    deletStudent: (sid) => dispatch(deletStudent(sid)),
    changeStudentInfo: (postData) => dispatch(changeStudentInfo(postData))
};}

TableExampleSortable = connect(mapStateToProps, mapDispatchToProps)(toJS(TableExampleSortable));

export default TableExampleSortable;

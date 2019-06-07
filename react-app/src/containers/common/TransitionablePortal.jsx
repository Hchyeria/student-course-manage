import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toJS } from './../../utils'
import  TransitionablePortalClass from '../../components/common/TranstionPortal'


class TransitionablePortal extends Component {
    
    constructor(){
        super()
        
    }
    componentWillReceiveProps (nextProps) {
        console.log(nextProps)

    }

    render(){
        let reason
        const { changeCourseSuccess,searchSucces, changeSelectionSuccess, changeCourseError, changeSelectionError, changeStudentSuccess, changeStudentInfoSuccess, changeStudentError, changeStudentInfoError   } = this.props
        console.log(changeSelectionSuccess)
        if(changeCourseSuccess|| searchSucces || changeSelectionSuccess || changeStudentSuccess || changeStudentInfoSuccess || changeCourseError || changeSelectionError|| changeStudentError || changeStudentInfoError){
            reason = searchSucces || '修改成功'
            if(changeCourseError){
                reason = changeCourseError || '输入非法'
            }
            if(changeSelectionError){
                reason = changeSelectionError || '输入非法'
            }
            if(changeStudentError){
                reason = changeStudentError || '输入非法'
            }
            if(changeStudentInfoError){
                reason = changeStudentInfoError || '输入非法'
            }
            return(
                <div>
                    <TransitionablePortalClass
                        reason={ reason }
                        iserror={ !!changeCourseError || !!changeSelectionError }>
                    </TransitionablePortalClass>
                </div>
            )
        }

       return(
           <div></div>
       )

    }
}

const mapStateToProps = (state, ownProps) => {

    return{
      changeCourseSuccess: state.getIn(['changeCourse', 'success']),
      changeCourseError: state.getIn(['changeCourse', 'error']),

      changeSelectionSuccess: state.getIn(['changeSelectionList', 'success']),
      changeSelectionError: state.getIn(['changeSelectionList', 'success', 'fail']),

      changeStudentSuccess: state.getIn(['changeStudentList', 'success']),
      changeStudentError: state.getIn(['changeStudentList', 'error']),

      changeStudentInfoSuccess: state.getIn(['studentInfo', 'success']),
      changeStudentInfoError: state.getIn(['studentInfo', 'error']),
      isFetch: state.getIn(['changeCourse', 'isFetch'])
    }
  };

const mapDispatchToProps = dispatch => ({

});

TransitionablePortal = connect(mapStateToProps, mapDispatchToProps)(toJS(TransitionablePortal));

export default TransitionablePortal;


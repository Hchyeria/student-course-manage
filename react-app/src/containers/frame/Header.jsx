import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Header from '../../components/frame/Header'

class HeaderWrapper extends Component{
    static defaultProps = {
        studentInfo: {
                sname: '黄千慧',
                sid: 3017207553
        }
      }

    render(){
        const { studentInfo } = this.props
        return(
            <Header studentInfo={ studentInfo }></Header>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        studentInfo: {
            sname: state.getIn(['studentInfo', 'studentInfo', 'sname']),
            sid: state.getIn(['studentInfo', 'studentInfo', 'sid'])
        }
        
    }
};
const mapDispatchToProps = dispatch => ({
    
});
HeaderWrapper = connect(mapStateToProps, mapDispatchToProps)(HeaderWrapper);

export default HeaderWrapper;
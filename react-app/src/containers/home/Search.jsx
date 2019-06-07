import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TransitionablePortal from './../../containers/common/TransitionablePortal'
import { searchScore } from './../../actions/common/search'
import { Button, Checkbox, Form, Header } from 'semantic-ui-react'
import {  toJS } from './../../utils'


class Search extends Component{
  

    componentWillMount() {
        
    }
    constructor(){
        super()
        this.state = {
            studentInfo:{},
            classInfo: {}
        }
        
    }
    handleInputS= (e)=>{
        const { key } = e.target.dataset
        const { value } = e.target
        this.setState({
            studentInfo: {
                ...this.state.studentInfo,
                [key] : value
            }
        })
    }
    handleInputC = (e)=>{
        const { key } = e.target.dataset
        const { value } = e.target
        this.setState({
            classInfo: {
                ...this.state.classInfo,
                [key] : value
            }
        })
    }
    handleSearchStudent = (e)=>{
        const { key } = e.target.dataset
        const { value } = e.target
        this.setState({
            studentInfo: {
                ...this.state.studentInfo,
                [key] : value
            }
        })
    }
    handleSearchScore = (e)=>{
        const { searchScore } = this.props
        let { classInfo } = this.state
        let cid = classInfo.cid
        let sid = classInfo.sid
        searchScore(classInfo)
    }
    render(){
        const { match: { params: { keyword, page } }, search } = this.props;
        let coursepaths = /\/course\/(\d+)\/?$/.exec(window.location.pathname);
        return(
            <div>
                <TransitionablePortal></TransitionablePortal>
                <div className='margin-b-50'>
                    <Form>
                        <Header as='h3'>查询学生信息</Header>
                        <Form.Field>
                        <label>学号</label>
                        <input placeholder='学号' data-key='sid' onInput={this.handleInputS }/>
                        </Form.Field>
                        <Form.Field>
                        <label>姓名</label>
                        <input placeholder='姓名' data-key='sname' onInput={this.handleInputS } />
                        </Form.Field>
                        <Button type='submit' onClick={ this.handleSearchStudent }>提交</Button>
                    </Form>
                </div>
                
                <Form>
                    <Header as='h3'>查询分数</Header>
                    <Form.Field>
                    <label>学号</label>
                    <input placeholder='学号' data-key='sid' onInput={this.handleInputc }/>
                    </Form.Field>
                    <Form.Field>
                    <label>姓名</label>
                    <input placeholder='姓名' data-key='sname' onInput={this.handleInputC }/>
                    </Form.Field>
                    <Form.Field>
                    <label>课程编号</label>
                    <input placeholder='课程编号' data-key='cid' onInput={this.handleInputC }/>
                    </Form.Field>
                    <Form.Field>
                    <label>课程名称</label>
                    <input placeholder='课程名称' data-key='cname' onInput={this.handleInputC }/>
                    </Form.Field>
                    <Button type='submit' onClick={ this.handleSearchScore}>提交</Button>
                </Form>

                {/* <Card studentInfo={ studentInfo }></Card> */}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    selectInfo: state.getIn(['studentInfo', 'studentInfo', 'selectInfo']),
    allCourse: state.getIn(['changeCourse', 'courseList'])
});
const mapDispatchToProps = dispatch => ({
    searchScore: (data) => dispatch(searchScore(data))
});

Search = connect(mapStateToProps, mapDispatchToProps)(toJS(Search));

export default Search;
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { addCourse } from '../../actions/course/allCourse'
import { addStudent  } from '../../actions/student/addDelet'

class AddForm extends Component{
    static propTypes = {
        isStudent: PropTypes.bool
    };
    static defaultProps = {
        isStudent: true
    };
    constructor(){
        super()
        this.state = {
            studentInfo:{},
            classInfo: {}
        }
        
    }
    state = {}
    handleInputS = (e) =>{ 
        const { key } = e.target.dataset
        const { value } = e.target
        this.setState({
            studentInfo: {
                ...this.state.studentInfo,
                [key] : value
            }
        })
    }
    handleInputC = (e) =>{ 
        const { key } = e.target.dataset
        const { value } = e.target
        this.setState({
            classInfo: {
                ...this.state.classInfo,
                [key] : value
            }
        })
    }
    handleChange = (e, { value }) => this.setState({ value })
    handleSubmitCourse = (e) =>{
        const { addCourse  } = this.props
        let { classInfo } = this.state
        addCourse(classInfo)
    }
    handleSubmitStudent = (e) =>{
        const { addStudent } = this.props
        let { studentInfo } = this.state
        studentInfo['gender'] = this.state.value? '女' : '男'
        addStudent(studentInfo)
    }
    render(){
        const { isStudent } = this.props
        const { value } = this.state
        if(isStudent){
            return(
                <div className='form-submit'>
                    <Form>
                        <Form.Field>
                        <label>姓名</label>
                        <input placeholder='姓名' data-key='sname' onInput={ this.handleInputS } />
                        </Form.Field>
                        <Form.Field>
                        <label>入学时间</label>
                        <input placeholder='入学时间' data-key='entranceYear' onInput={ this.handleInputS } />
                        </Form.Field>
                        <Form.Group inline>
                        <label>性别</label>
                            <Form.Radio
                                label='男'
                                value='0'
                                checked={value === '0'}
                                onChange={this.handleChange}
                            />
                            <Form.Radio
                                label='女'
                                value='1'
                                checked={value === '1'}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Field>
                        <label>入学年龄</label>
                        <input placeholder='入学年龄' data-key='entranceAge' onInput={ this.handleInputS }/>
                        </Form.Field>
                        <Form.Field>
                        <label>班级</label>
                        <input placeholder='班级' data-key='classId' onInput={ this.handleInputS} />
                        </Form.Field>
                        <Button type='submit' onClick={ this.handleSubmitStudent }>提交</Button>
                    </Form>
                </div>
            )
        }
        else{
            return(
                <Form>
                        <Form.Field>
                        <label>课程名称</label>
                        <input placeholder='课程名称' data-key='cname' onInput={ this.handleInputC } />
                        </Form.Field>
                        <Form.Field>
                        <label>授课教师</label>
                        <input placeholder='授课教师' data-key='teacherName' onInput={ this.handleInputC } />
                        </Form.Field>
                        <Form.Field>
                        <label>适合年级</label>
                        <input placeholder='适合年级' data-key='suitGrade' onInput={ this.handleInputC }/>
                        </Form.Field>
                        <Form.Field>
                        <label>取消年份</label>
                        <input placeholder='取消年份' data-key='cancelYear' onInput={ this.handleInputC }/>
                        </Form.Field>
                        <Form.Field>
                        <label>学分</label>
                        <input placeholder='学分' data-key='point' onInput={ this.handleInputC } />
                        </Form.Field>
                        <Button type='submit' onClick={ this.handleSubmitCourse }>提交</Button>
                    </Form>
            )
        }

    }
}


const mapStateToProps = (state, ownProps) => {
    
};
const mapDispatchToProps = dispatch => { 
    return {
        addCourse: (data) => dispatch(addCourse(data)),
        addStudent: (data) => dispatch(addStudent(data))
    }
}
  
AddForm = connect(mapStateToProps, mapDispatchToProps)(AddForm);
  
  

export default AddForm ;


import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../actions/login'
import { Redirect } from 'react-router-dom';
import TranstionPortal from '../components/common/TranstionPortal'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { toJS } from '../utils'

class Login extends React.Component{
    static propTypes = {
        isLogin: PropTypes.bool.isRequired,
        error: PropTypes.string,
        student: PropTypes.shape({
            sid: PropTypes.number,
            sname: PropTypes.string,
            gender: PropTypes.string,
            entranceAge: PropTypes.number,
            entranceYear: PropTypes.number,
            classId: PropTypes.number
        }),
        fetchLogin: PropTypes.func.isRequired
    };
    constructor(){
        super();
        this.state = {
            sname: '',
            sid: 0,
            iserror: false,
            errorMsg: '输入不能为空'
        }
        localStorage.clear();
    }
    componentWillReceiveProps (nextProps) {
        const { isLogin, history, error, student} = nextProps;
        if (isLogin) {
            localStorage.setItem('student',JSON.stringify(student));
            localStorage.setItem('isLogin',true);
            history.push( '/')
        }
        console.log(error)
        this.setState({
            iserror: !!error
        })
    }

    handleInputSid = (e)=>{ this.setState({ sid: +e.target.value.trim() }) }

    handleInputSname = (e)=>{ this.setState({ sname: e.target.value.trim() }) }

    handleClickButton = (e)=>{
        const { fetchLogin } = this.props
        const { sid, sname } = this.state
        if(!sid || !sname){
            this.setState({
                iserror: true
            })
        }
        fetchLogin(sid, sname)
    }

    render() {
        const { error } = this.props
        const { iserror, errorMsg } = this.state
        console.log(error)
        if (error) return <TranstionPortal reason={ error || errorMsg } iserror={ true } />;
        return (
            <div style={{ marginTop: '5%' }}>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='teal' textAlign='center'>
                        <Image src='/logo.png' /> 学生登录
                        </Header>
                        <Form size='large'>
                        <Segment stacked>
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='姓名' onInput={ this.handleInputSname }/>
                            <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='学号'
                            type='password'
                            onInput={ this.handleInputSid }
                            />
                            <Button color='teal' fluid size='large' onClick={ this.handleClickButton }>
                            登录
                            </Button>
                        </Segment>
                        </Form>
                        <Message>
                        新入学？ <a href='#'>学生注册</a>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLogin: state.getIn(['loginList', 'success']),
    error: state.getIn(['loginList', 'error']),
    student: state.getIn(['loginList', 'student'])
});

const mapDispatchToProps = dispatch => ({
    fetchLogin: (sid, sname) => dispatch(login(sid, sname))
});

Login = connect(mapStateToProps, mapDispatchToProps)(toJS(Login));

export default Login;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash'
import {
    Container,
    Divider,
    Dropdown,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Segment,
    Visibility,
  } from 'semantic-ui-react'

import styleObj from './Style'

const { menuStyle, fixedMenuStyle, overlayStyle, fixedOverlayStyle, overlayMenuStyle, fixedOverlayMenuStyle, LeftImage, RightImage} = styleObj


class HeaderCotain extends Component {
    static propTypes = {
        studentInfo: PropTypes.shape({
            sname: PropTypes.string.isRequired,
            sid: PropTypes.number.isRequired
        })
    }
    

    constructor () {
        super();
        this.state = {
            menuFixed: false,
            overlayFixed: false
        }
    }
    handleOverlayRef = (c) => {
      const { overlayRect } = this.state
  
      if (!overlayRect) {
        this.setState({ overlayRect: _.pick(c.getBoundingClientRect(), 'height', 'width') })
      }
    }
  
    stickOverlay = () => this.setState({ overlayFixed: true })
  
    stickTopMenu = () => this.setState({ menuFixed: true })
  
    unStickOverlay = () => this.setState({ overlayFixed: false })
  
    unStickTopMenu = () => this.setState({ menuFixed: false })

    render(){
        const { menuFixed, overlayFixed, overlayRect } = this.state
        return(
          <div id="header">
          <Container text style={{ marginTop: '2em' }}>
            <Header as='h1'>天津大学学生课程管理系统</Header>
            <p>
              The courses and scores management system for student in TJU .
            </p>
          </Container>

          <Visibility
            onBottomPassed = { this.stickTopMenu }
            onBottomVisible = { this.unStickTopMenu }
            once={false}
          >
            <Menu
              borderless
              fixed={ menuFixed ? 'top' : undefined }
              style={ menuFixed ? fixedMenuStyle : menuStyle }
            >
              <Container text>
                <Menu.Item>
                  <Image size='mini' src='/logo.png' />
                </Menu.Item>
                <Menu.Item header>{'Welcome,  ' +  this.props.studentInfo.sname }</Menu.Item>
                  <Link to={`/course`} className='item' target='_blanck'>
                    课程
                  </Link>
                <Menu.Menu position='right'>
                  <Dropdown text='更多' pointing className='link item'>
                    <Dropdown.Menu>
                    <Dropdown.Header><span className='text' target='_blanck'>课程管理</span></Dropdown.Header>
                      <Dropdown.Item>
                      <Link to={`/search`} className='no-bulue' target='_blanck'>查询</Link>
                        </Dropdown.Item>
                      <Dropdown.Header>学生管理</Dropdown.Header>
                      <Dropdown.Item><Link to={`/student`} className='no-bulue' target='_blanck'>学生信息</Link></Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item>
                        <Link to={`/login`} className='no-bulue' target='_blanck'>
                        登出
                        </Link>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Menu.Menu>
              </Container>
            </Menu>
          </Visibility>
          </div>
        )
    }
}
export default HeaderCotain;
import React, { Component } from 'react';
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

class Footer extends Component{
    render(){
        return(
            <div id="footer">
                <Segment inverted style={{ margin: '5em 0em 0em', padding: '5em 0em' }} vertical>
                    <Container textAlign='center'>
                    <Image src='/logo.png' centered size='mini' />
                    <List inverted link size='small'>
                        <List.Item as='a' href='#'>
                            Database Project
                        </List.Item>
                        <List.Item>
                            Copyright © 2019-present
                        </List.Item>
                        <List.Item as='a' href='#'>
                            By Hchyeria
                        </List.Item>
                    </List>
                    </Container>
                </Segment>
            </div>
            
        );
    }
}

export default Footer;


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    TransitionablePortal,
    Segment,
    Header
  } from 'semantic-ui-react'

const commonStyle = { 
    left: '40%', 
    position: 'fixed', 
    top: '50%', 
    zIndex: 1000
}

const errorStyle = ()=>
    `<Segment style=${commonStyle} inverted color='red'>
        <Header>This is a controlled portal</Header>
        <p>Portals have tons of great callback functions to hook into.</p>
        <p>To close, simply click the close button or click away</p>
    </Segment>`


class TransitionablePortalClass extends Component{
    static propTypes = {
        reason: PropTypes.string.isRequired,
        iserror: PropTypes.bool
    };
    static defaultProps = {
        iserror: false
    };
    constructor(){
        super()
        this.state = {
            open: true
        }
    }
    
    handleClose = () => this.setState({ open: false })
    render(){
        const { reason, iserror} = this.props
        const { open } = this.state
        if(iserror){
            return(
                <div>
                    <TransitionablePortal onClose={this.handleClose} open={open}>
                    {errorStyle()}
                    <Header>{ reason }</Header>
                    </TransitionablePortal>
                </div>
            )
        }
        else{
            return(
                <div>
                    <TransitionablePortal onClose={this.handleClose} open={open}>
                        <Segment style={commonStyle}>
                        <Header>{ reason }</Header>
                    </Segment>
                    </TransitionablePortal>
                </div>
            )
        }

    }
}

export default TransitionablePortalClass;


import React, { Component } from 'react';

class Contain extends Component{
    render(){
        return(
            <div id="contain">
            {this.props.children}
            </div>
        );
    }
}

export default Contain;

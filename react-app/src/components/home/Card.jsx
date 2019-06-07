import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, Image } from 'semantic-ui-react'

class CardCompment extends Component{
    static propTypes = {
        studentInfo: PropTypes.shape({
            sname: PropTypes.string.isRequired,
            sid: PropTypes.number.isRequired,
            gender: PropTypes.string.isRequired,
            entranceYear: PropTypes.number.isRequired,
            entranceAge: PropTypes.number.isRequired,
            classId: PropTypes.number.isRequired
        }),
        selectLength: PropTypes.number
      };
    static defaultProps = {
        selectLength: 22
    }
    render(){
        const { sname, sid, gender, entranceYear, entranceAge, classId } = this.props.studentInfo
        console.log(this.props.studentInfo)
        return(
            <div className='center-card'>
                <Card>
                    <Image src={ gender==='男'? 'https://react.semantic-ui.com/images/avatar/large/matthew.png' : 'https://react.semantic-ui.com/images/avatar/large/stevie.jpg'} wrapped ui={false} />
                    <Card.Content>
                    <Card.Header>{ sname }</Card.Header>
                    <Card.Meta>
                        <span className='date'>{ gender }</span>
                        <span className='date'>{ entranceYear }年入学</span>
                    </Card.Meta>
                    <Card.Description>
                        <div className='date'>学号：{ sid }</div>
                        <div className='date'>班级：{ classId }班</div>
                        <div className='date'>入学年龄：{ entranceAge }</div>
                    </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                    <a>
                        <Icon name='user' />
                        { this.props.selectLength } 选课记录
                    </a>
                    </Card.Content>
                </Card>
            </div>
        );
    }
}

export default CardCompment;

import { toJS } from 'immutable'
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Table, Menu, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ContentEditable from 'react-contenteditable'

import {  } from 'semantic-ui-react'



export default class TableExampleSortable extends Component {
  static propTypes = {
    dataKey: PropTypes.shape({
      cid: PropTypes.string,
      cname: PropTypes.string,
      teacherName: PropTypes.string,
      suitGrade: PropTypes.string,
      selectYear: PropTypes.string,
      score: PropTypes.string,
      cancelYear: PropTypes.string
    }),
    tableData: PropTypes.array.isRequired,
    sortTablbe: PropTypes.func,
    changeSelection: PropTypes.func,
    changeCourse: PropTypes.func,
    deletCourse: PropTypes.func,
    deletSelection: PropTypes.func,
    deletSelectionInfo: PropTypes.func,
    changeCourseSelect: PropTypes.func,
    deletStudent: PropTypes.func,
    addSelection: PropTypes.func,
    deletStudentInfo: PropTypes.func,
    getStudent: PropTypes.func,
    iseditable: PropTypes.bool,
    isCourse: PropTypes.bool
  };
  static defaultProps = {
    iseditable: true,
    isStudent: false,
    isAdd: false,
    tableData: [],
    isCourse: false
  }

  constructor(){
      super()
      this.state = {
          column: null,
          direction: null,
          postData: {},
          isselection: false,
          fetchIndex: ''
      }
  }
  handleDeletStudent =(e)=>{
    const { deletStudent, deletStudentInfo } = this.props
    const { key, index } = e.target.dataset
    deletStudent(key)
    //deletStudentInfo(index)
  }
  handleDeletCourse = (e)=>{
    const { deletCourse, deletCourseInfo } = this.props
    const { key, index } = e.target.dataset
    deletCourse(key)
    deletCourseInfo(index)
  }
  handleDeletSlection = (e)=>{
    const { deletSelection, changeCourseSelect, deletSelectionInfo } = this.props
    const { key } = e.target.dataset
    const { sid } = JSON.parse(localStorage.getItem('student'))
    let cid = []
    cid.push(key)
    let data = {
      cid: cid,
      sid: sid
    }
    changeCourseSelect(cid, 0)
    deletSelection(data)
    deletSelectionInfo(cid)
  }
  handleDeletStudent =(e) =>{
    const { deletStudent } = this.props
    const { key } = e.target.dataset
    deletStudent(key)
  }

  handleChoose = (e)=>{
    const { addSelection, changeCourseSelect } = this.props
    const { key } = e.target.dataset
    const { sid } = JSON.parse(localStorage.getItem('student'))
    let cid = []
    cid.push(key)
    let data = {
      cid: cid,
      sid: sid
    }
    changeCourseSelect(cid, 1)

    addSelection(data)
  }

  
  renderButton = (ele, ee, index, keyArray)=>{
    const { fetchIndex } = this.state
    if(ee==='isselect'){
      if(ele[ee]){
        return(
            <Button 
              data-key={ ele[keyArray[0]] }
              loading={fetchIndex===index} 
              secondary 
              onClick={this.handleDeletSlection}>
              退课
            </Button>
        )
      }
      else{
        return(
          <Button 
            data-key={ ele[keyArray[0]] }
            loading={fetchIndex===index} 
            primary 
            onClick={this.handleChoose}>
              选课
          </Button>
        )
      }
    }
    else if(ee==='slectionInfo'){
      return ele[ee].length && ele[ee].map(ele =>
        Object.keys(ele).map(elele => elele +': ' + ele[elele])
      )
    }
    else{
      return(
        ele[ee]
      )
    }
  }

  renderQuitButton = (ele, ee, index, reindex, keyArray)=>{
    const { fetchIndex } = this.state
    const { isStudent } = this.props
    if(ee==='isselect'){
        return(
            <Button 
            data-key={ ele[keyArray[0]] }
            loading={fetchIndex===index} 
            onClick={isStudent? this.handleDeletStudent : this.handleDeletSlection}>
            {isStudent? '删除' : '退课'}
            </Button>
        )
    }
    else{
      return(
        <div contentEditable className="editable-cell" 
          data-index={ reindex }
          data-id={ ele[keyArray[0]] } 
          data-key={ ee } 
          onInput={ this.handleInput } 
          onBlur={ this.handleBlur } > 
          { ele[ee] }
        </div>
      )
    }  
  }

  renderDetail = (tableData, keyArray, len, iseditable)=>{
    const { isStudent } = this.props
    return tableData.length && tableData.map((ele, reindex) =>{
      return  <Table.Row key={ reindex }>
          {
            keyArray.map((ee, index) =>{
            if(index === 0){
              return <Table.Cell key={ index }> 
                      <Link to={isStudent? '#' : `/course/info/${ ele[keyArray[0]] }`} > { ele[ee] } </Link> 
                      </Table.Cell>
            }
            else{ 
              if(ee === 'selectYear' || !iseditable){
                  return <Table.Cell key={ index }>
                        { this.renderButton(ele, ee, index, keyArray) }
                        {index===len-1? <Icon link data-key={ ele[keyArray[0]] } data-index={ reindex } name='close' onClick={isStudent? this.handleDeletStudent : this.handleDeletCourse}/> : ''}
                        </Table.Cell>
              }
              else{
                return <Table.Cell key={ index }>
                      { this.renderQuitButton(ele, ee, index, reindex, keyArray) }
                      </Table.Cell>
              }
            }
            }) 
          }
        </Table.Row>
    }  
    )
  }

  handleSort = clickedColumn => () => {
    const { sortTablbe, tableData } = this.props
    const { column, direction } = this.state
    sortTablbe(clickedColumn, tableData, column)
    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        direction: 'ascending'
      })
      return
    }
    this.setState({
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
    
  }

  handleInput = (e)=>{
    const { isStudent, tableData } = this.props
    let value = e.target.innerText
    let { id, key, index } = e.target.dataset
    const { sid } = JSON.parse(localStorage.getItem('student'))
    if(isStudent){
      let data = {
        sid: id,
        [key]: value
      }
      this.setState({
        postData: data
      })
    }
    else{
      if(key === 'selectYear' ){
        let data = {
          cid: +id,
          sid: sid,
          [key]: value
        }
        this.setState({
          postData: data,
          isselection: true
        })
      }
      else if( key === 'score' ){
        let selectYear = tableData[index].selectYear
        let data = {
          cid: +id,
          sid: sid,
          [key]: +value,
          selectYear: selectYear
        }
        this.setState({
          postData: data,
          isselection: true
        })
      }
      else {
        let data = {
          cid: +id,
          [key]: value
        }
        this.setState({
          postData: data,
          isselection: false
        })
      }
    }
  
  }
  handleBlur = (e) =>{
    const { changeSelection, changeCourse, changeStudentInfo, isStudent } = this.props
    const { postData, isselection, index } = this.state
    if(isStudent){
      console.log(postData)
      changeStudentInfo(postData)
    }
    else{
      if(isselection){
        changeSelection(postData)
      }
      else{
        console.log(postData)
        changeCourse(postData)
      }
    }

  }
  handlegetStudent = (e)=>{
    const { getStudent, isCourse, getCourseInfo, cid } = this.props
    let { key } = e.target.dataset
    if(isCourse){
      return getCourseInfo(cid, key)
    }
    else{
      getStudent(key)
    }
    
  }
 
  render() {
    const { tableData, dataKey, iseditable,  isFetch, isAdd, isStudent, handleAdd  } = this.props
    const { column, direction, isSelectionError } = this.state
    const keyArray = Object.keys(dataKey) || []
    const len = keyArray.length
    return (
      <div>
      <Table sortable celled fixed initiondef compact>
        <Table.Header>
          <Table.Row>
          {
              keyArray.map((ele, index) =>
              <Table.HeaderCell key={ index }
                sorted={column === ele ? direction : null}
                onClick={this.handleSort(ele)}
              >
                { dataKey[ele] }
              </Table.HeaderCell>
            )}
          </Table.Row>
        </Table.Header>
        <Table.Body>
         {this.renderDetail(tableData, keyArray, len, iseditable)}
        </Table.Body>
        { isAdd?
        <Table.Footer fullWidth>
          <Table.Row>
          {isStudent? 
            <Table.HeaderCell colSpan='3'>
            <Menu floated='right' pagination>
              <Menu.Item as='a' icon>
                <Icon name='chevron left' />
              </Menu.Item>
              {[1,2,3,4,5,6,7].map((ele, index) =>
                 <Menu.Item as='a' data-key={index+1} onClick={this.handlegetStudent} > {index+1} </Menu.Item>
              )
              }
              <Menu.Item as='a' icon>
                <Icon name='chevron right' onClick={this.handlegetStudent}/>
              </Menu.Item>
            </Menu>
          </Table.HeaderCell>
          : ''
          }
            <Table.HeaderCell colSpan='4'>
              <Button floated='right' icon labelPosition='left' primary size='small' onClick={ handleAdd }>
                <Icon name={isStudent? 'user': 'th list'} /> {isStudent? '增加学生': '增加课程'}
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
        : ''
        }
      </Table>
      
      </div>
    )
  }
}

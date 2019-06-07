import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cloneDeep from 'lodash.clonedeep';
import ReactEcharts from 'echarts-for-react'

import { toJS } from '../../utils.js'

const keys = ['cname', 'score']
 class Dynamic extends Component {
  static propTypes = {
    selectInfo: PropTypes.array.isRequired
  };
  static defaultProps = {
      selectInfo: [
        {
            "cname": "物理实验B",
            "score": 98
        },
        {
            "cname": "物理实验B",
            "score": 83
        },
        {
            "cname": "大学英语4",
            "score": 61
        },
        {
            "cname": "计算机组成原理I",
            "score": 98
        },
        {
          "cname": "计算机图形技术（双语）",
          "score": 80
        },
        {
            "cname": "信息安全技术（双语）",
            "score": 74
        },
        {
            "cname": "人工智能（双语）",
            "score": 66
        },
        {
            "cname": "图像处理",
            "score": 70
        },
        {
            "cname": "用户界面设计（双语）",
            "score": 64
        },
        {
            "cname": "数据仓库与数据挖掘（双语）",
            "score": 98
        },
        {
            "cname": "移动平台应用开发",
            "score": 70
        },
        {
            "cname": "计算机新技术与产业发展",
            "score": 95
        },
        {
            "cname": "计算机网络（双语）",
            "score": 97
        },
        {
            "cname": "汇编语言程序设计",
            "score": 76
        },
        {
            "cname": "嵌入式程序设计",
            "score": 80
        },
        {
            "cname": "数据库原理（双语）",
            "score": 97
        }
      ]
  }

 
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }
  timeTicket = null;
  count = 51;
  getInitialState = () => ({option: this.getOption()});
  fetchNewDate = () => {
    const { selectInfo } = this.props
    let leng = selectInfo && (selectInfo.length || selectInfo.size) || 20
    let axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');
    const option = cloneDeep(this.state.option); // immutable
    option.title.text = '选课情况分布.' + new Date().getSeconds();
    let data0 = option.series[0].data;
    let data1 = option.series[1].data;
    data0.shift();
    data0.push(Math.round(Math.random() * 1000));
    data1.shift();
    data1.push((Math.random() * 50 + 5).toFixed(1) - 0);

    option.xAxis[0].data.shift();
    option.xAxis[0].data.push(axisData);
    option.xAxis[1].data.shift();
    option.xAxis[1].data.push(selectInfo[(this.count) % leng][keys[0]]);
    this.count++
    this.setState({
      option,
    });
  };

  componentDidMount() {
    if (this.timeTicket) {
      clearInterval(this.timeTicket);
    }
    this.timeTicket = setInterval(this.fetchNewDate, 1000);
  };

  componentWillUnmount() {
    if (this.timeTicket) {
      clearInterval(this.timeTicket);
    }
  };

  getOption = () => {
    const { selectInfo } = this.props
    let leng = selectInfo.length
    return {
    title: {
      text:'选课情况分布.',
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data:['成绩', '时间']
    },
    toolbox: {
      show: true,
      feature: {
        dataView: {readOnly: false},
        restore: {},
        saveAsImage: {}
      }
    },
    grid: {
      top: 60,
      left: 30,
      right: 60,
      bottom:30
    },
    dataZoom: {
      show: false,
      start: 0,
      end: 100
    },
    visualMap: {
      show: false,
      min: 0,
      max: 1000,
      color: ['#BE002F', '#F20C00', '#F00056', '#FF2D51', '#FF2121', '#FF4C00', '#FF7500',
        '#FF8936', '#FFA400', '#F0C239', '#FFF143', '#FAFF72', '#C9DD22', '#AFDD22',
        '#9ED900', '#00E500', '#0EB83A', '#0AA344', '#0C8918', '#057748', '#177CB0']
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        data: (function (){
          let now = new Date();
          let res = [];
          let len = 50;
          while (len--) {
            res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
            now = new Date(now - 2000);
          }
          return res;
        })()
      },
      {
        type: 'category',
        boundaryGap: true,
        data: (function (){
          let res = [];
          let len = 50;
          while (len--) {
            res.push(selectInfo[len%leng][keys[0]]);
          }
          return res;
        })()
      }
    ],
    yAxis: [
      {
        type: 'value',
        scale: true,
        name: '成绩',
        max: 100,
        min: 0,
        boundaryGap: [0.2, 0.2]
      },
      {
        type: 'value',
        scale: true,
        name: '时间',
        max: 1200,
        min: 0,
        boundaryGap: [0.2, 0.2]
      }
    ],
    series: [
      {
        name:'成绩',
        type:'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        itemStyle: {
          normal: {
            barBorderRadius: 4,
          }
        },
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return idx * 10;
        },
        animationDelayUpdate: function (idx) {
          return idx * 10;
        },
        data:(function (){
          let res = [];
          let len = 50;
          while (len--) {
            res.push(Math.round(Math.random() * 1000));
          }
          return res;
        })()
      },
      {
        name:'时间',
        type:'line',
        data:(function (){
          let res = [];
          let len = 0;
          while (len < 50) {
            res.push((Math.random()*50 + 5).toFixed(1) - 0);
            len++;
          }
          return res;
        })()
      }
    ]
  }};

  render() {
    return (
      <div className='examples'>
        <div className='parent'>
          <ReactEcharts ref='echarts_react'
            option={this.state.option}
            style={{height: 400}} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectInfo: state.getIn(['studentInfo', 'studentInfo', 'selectInfo'])
});
const mapDispatchToProps = dispatch => ({
  
});

Dynamic = connect(mapStateToProps, mapDispatchToProps)(toJS(Dynamic));

export default Dynamic;

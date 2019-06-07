import React, { PureComponent } from 'react';
import ReactEcharts from 'echarts-for-react'
import PropTypes from 'prop-types';

const keys = ['cname', 'score']

export default class Loading extends PureComponent {
  _t = null;
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

  renderData = (selectInfo) =>{
    return selectInfo.reduce((aac, val) =>{
      if(aac[0]){
        aac[0].value.push(val[keys[1]])
      }
      else{
        aac.push({name : '总成绩', value: [val[keys[1]]]})
      }
      return aac
    }, [])
  }

  renderIndicator = (selectInfo) =>{
    return selectInfo.reduce((aac, val) =>{
      aac.push({name: val[keys[0]], max: val[keys[1]]+Math.floor(Math.random()*10)})
      return aac;
    }, [])
  }

  getOption = () => {
    const { selectInfo } = this.props
    let data = this.renderData(selectInfo)
    let indicatorData = this.renderIndicator(selectInfo)
    return {
      title: {
        text: '成绩分布图'
      },
      tooltip: {},
      legend: {
        data: ['总成绩']
      },
      radar: {
      // shape: 'circle',
      indicator: indicatorData
      },
      series: [{
        name: '成绩',
        type: 'radar',
        // areaStyle: {normal: {}},
        data : data
      }]
    };
  };

  onChartReady = (chart) => {
    this._t = setTimeout(function() {
      chart.hideLoading();
    }, 3000);
  };

  getLoadingOption = () => {
    return {
      text: '加载中...',
      color: '#4413c2',
      textColor: '#270240',
      maskColor: 'rgba(194, 88, 86, 0.3)',
      zlevel: 0
    };
  };

  componentWillUnmount() {
    clearTimeout(this._t);
  };



  render() {
    return (
      <div className='examples'>
        <div className='parent'>  
          <ReactEcharts
            option={this.getOption()}
            onChartReady={this.onChartReady}
            loadingOption={this.getLoadingOption()}
            showLoading={false} />
        </div>
      </div>
    );
  }
}

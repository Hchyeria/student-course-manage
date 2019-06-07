import React, { PureComponent } from 'react';
import ReactEcharts from 'echarts-for-react'

export default class Events extends PureComponent {
  static defaultProps = {
    selectInfo: [
      {
          "avgScore": "83.4545",
          "selectYear": 2018
      },
      {
          "avgScore": "76.4000",
          "selectYear": 2019
      },
      {
          "avgScore": "70.0000",
          "selectYear": 2017
      }
  ],
    keys:['selectYear', 'avgScore']
  }
  constructor(props) {
    super(props);
    this.state = {
      cnt: 0,
    };
  }


  getOption = () => {
    const { selectInfo, totalAvg, keys, text, subtext, name  } = this.props
    function renderData(){
      return selectInfo.reduce((aac, val) =>{
          aac.push({value: +val[keys[1]], name: (val[keys[0]] + '')})
          return aac;
        }, [])
    }
    let data = renderData()
    return  {
    title : {
      text: text,
      subtext: subtext,
      x:'center'
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: (() =>{
        selectInfo && selectInfo.reduce((aac, val) =>{
          aac.push(val[keys[0]])
          return aac;
        }, [])
      })()
    },
    series : [
      {
      name: name,
      type: 'pie',
      radius : '55%',
      center: ['50%', '60%'],
      data: data,
      itemStyle: {
        emphasis: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
      }
    ]
  }};

  onChartClick = (param, echarts) => {
    console.log(param, echarts);
    alert('chart click');
    this.setState({
      cnt: this.state.cnt + 1,
    })
  };

  onChartLegendselectchanged = (param, echart) => {
    console.log(param, echart);
    alert('chart legendselectchanged');
  };

  onChartReady = (echarts) => {
    console.log('echart is ready', echarts);
  };

  render() {
    let onEvents = {
      'click': this.onChartClick,
      'legendselectchanged': this.onChartLegendselectchanged
    };
    let code = "let onEvents = {\n" +
           "  'click': this.onChartClick,\n" +
           "  'legendselectchanged': this.onChartLegendselectchanged\n" +
           "}\n\n" +
           "<ReactEcharts \n" +
          "  option={this.getOption()} \n" +
          "  style={{height: 300}} \n" +
          "  onChartReady={this.onChartReady} \n" +
          "  onEvents={onEvents} />";

    return (
      <div className='examples'>
        <div className='parent'>
          <ReactEcharts
            option={this.getOption()}
            style={{height: 300}}
            onChartReady={this.onChartReady}
            onEvents={onEvents} />
        </div>
      </div>
    );
  }
};


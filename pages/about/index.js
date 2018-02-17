import React, { Component, PropTypes } from 'react';
import ReactEcharts from 'echarts-for-react';
import '../../scss/container.scss';
import './about.scss';

export default class About extends Component {

  constructor(props) {
    super(props);
  }

  getOption () {
    return {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            max: 100,
            splitNumber: 10,
            axisLabel: {
                formatter: '{value}%'
            }
        },
        yAxis: {
            type: 'category',
            data: ['HTML','CSS','Javascript','Jquery','Angular','React','Gulp','Node.js']
        },
        series: [
            {
                name: '熟练度',
                type: 'bar',
                data: [{
                  value: 60,
                  itemStyle: {
                    color: '#4ea397'
                  }
                }, {
                  value: 70,
                  itemStyle: {
                    color: '#22c3aa'
                  }
                }, {
                  value: 50,
                  itemStyle: {
                    color: '#7bd9a5'
                  }
                }, {
                  value: 40,
                  itemStyle: {
                    color: '#d0648a'
                  }
                }, {
                  value: 40,
                  itemStyle: {
                    color: '#f58db2'
                  }
                }, {
                  value: 30,
                  itemStyle: {
                    color: '#f2b3c9'
                  }
                }, {
                  value: 20,
                  itemStyle: {
                    color: '#626c91'
                  }
                }, {
                  value: 20,
                  itemStyle: {
                    color: '#96dee8'
                  }
                }]
            }
        ]
    }
  }

  render () {
    return (
      <div className="c-content about-container">
        <div className="about-wrapper">
          <div className="about-title">
            关于
          </div>
          <div className="about-content">
            Hi, 我是张博轩。
          </div>
          <div className="about-content">
            一枚90后程序员。2015年毕业后，我来到了北京，加入了 <a href="http://www.yangbentong.com/" className="about-link">ivymobi</a>，工作至今。很感谢ivymobi，在这里我获得了成长，真正领略到了软件开发的魅力所在。
          </div>
          <div className="about-content">
            2017年开始接触街舞，然后...年会代表技术部
            <a href="http://www.meipai.com/media/944442151" className="about-link">舞动青春</a>了🤣，
            也算是给自己找了一个爱好，延长一下中年脱发的时间。
          </div>
          <div className="about-content">
            未来，希望成为一枚前端工程师，然后用这个博客一步一步的积累，充实自己！
          </div>
          <div className="about-content">
            关于这个博客，是用&nbsp;
            <a href="https://reactjs.org/" className="about-link">React</a>&nbsp;+&nbsp;
            <a href="https://www.gatsbyjs.org/" className="about-link">Gatsby</a>&nbsp;+&nbsp;
            <a href="http://2x.ant.design/docs/react/introduce-cn" className="about-link">Antd2.x</a> 实现 |
            部署于：<a href="https://www.netlify.com" className="about-link">Netlify </a> 也算是入门 <b>React</b> 的一个实践吧。
          </div>
        </div>
        <div className="about-wrapper">
          <div className="about-title">
            技能树
          </div>
          <div className="about-echarts-wrapper">
            <ReactEcharts
              option={this.getOption()}
              className='about-echarts1' />
          </div>
        </div>
        <div className="about-wrapper">
          <div className="about-title">
            联系方式
          </div>
          <div className="about-content">
            <div className="about-content-line">
              <i className="icon iconfont icon-github"></i>
              <a href="https://github.com/jokingzhang" className="about-link"> github.com/jokingzhang </a>
            </div>

            <div className="about-content-line">
              <i className="icon iconfont icon-wechat"></i>
              <span className="about-content-text"> joking_zhang</span>
            </div>

            <div className="about-content-line">
              <i className="icon iconfont icon-qq"></i>
              <span className="about-content-text"> 496691544</span>
            </div>

            <div className="about-content-line">
              <i className="icon iconfont icon-icon-email"></i>
              <a href="mailto:496691544@qq.com" className="about-link"> 496691544@qq.com </a>
            </div>

            <div className="about-content-line">
              <i className="icon iconfont icon-gmail"></i>
              <a href="mailto:zhangbx.json@gmail.com" className="about-link"> zhangbx.json@gmail.com </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

exports.data = {
  title: "About page",
  type: "only",
  date: "2017-05-09T09:03:02+08:00",
}

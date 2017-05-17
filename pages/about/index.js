import React from 'react'
import '../../scss/container.scss';

class About extends React.Component {
  render () {
    return (
      <div className="landing-container">
        不能光写一个关于吧...<br/>
        总带写点啥吧...<br/>
        1小时学习 + 3小时练习<br/>
        周末需要深度研究，并制定下一周的计划...<br/>
        在这段逃亡一般的日子中，好像也不错<br/>
        简单，充实<br/>
        心里很空，充满了不安，充满了害怕...<br/>
        像个刺猬一样，过着每一分钟，生怕别人看到了那个渴望去被爱的自己...<br/>
        脑子里记着这两年发生的大大小小的事情<br/>
        逢人就说<br/>
        生怕别人不知道，以为自己是个无趣之人，<br/>
        生怕下一秒自己就忘了，忘了自己脑子中那些引以为傲，又满是孤独的回忆...<br/>
        如果，有一个人可以分享，忘记也是不错的选择吧...<br/>
        继续逃亡吧！不想停下来就别停，直到头破血流，一个人捂着伤口也会更加坚强。
      </div>
    )
  }
}

export default About

exports.data = {
  title: "About page",
  date: "2017-05-09T09:03:02+08:00",
}

import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import styles from './Graph.less'
import React, {Component} from 'react'

export default class extends React.Component {
  render() {
    const {schooldetails} = this.props;
    /*
     * doorsill = > 门栏线
     * safety = > 安全线
     * max = > 最高分
     * */
    let data = [];
    data = this.props.graphData;
    return (
      <AreaChart className={styles.graph} width={730} height={250} data={data}
                 margin={{top: 10, right: 30, left: 0, bottom: 0}}>
        <defs>
          <linearGradient id="colorDoorsill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#AF9FCA" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#AF9FCA" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorSafety" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#CA7AA3" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#CA7AA3" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#5688C1" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#5688C1" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="name"/>
        <YAxis type="number" domain={['dataMin', 'dataMax+100']}/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip />
        <Area type="monotone" dataKey="doorsill" stroke="#AF9FCA" fillOpacity={1} fill="url(#colorDoorsill)"/>
        <Area type="monotone" dataKey="safety" stroke="#CA7AA3" fillOpacity={1} fill="url(#colorSafety)"/>
        <Area type="monotone" dataKey="max" stroke="#5688C1" fillOpacity={1} fill="url(#colorMax)"/>
      </AreaChart>
    )
  }
}

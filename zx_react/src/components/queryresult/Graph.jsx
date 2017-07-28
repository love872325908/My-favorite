import React, {Component} from 'react'
import styles from './Graph.less'
import classNames from 'classnames';
import Graph from '../common/Graph'

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nanDu: [],
            fenCha: [],
        }
    }

    render() {
        const {LineFire, isShow} = this.props.queryresult;
        let nanDu = [], fenCha = [];
        if (LineFire) {
            if (LineFire.LineFire && LineFire.LineFire.data.S == '1') {
                LineFire.LineFire.data.sList.map((item, index) => {
                    nanDu[index] = {
                        name: item.year + '年',
                        doorsill: parseInt(item.minfs ? item.minfs : 0),
                        safety: parseInt(item.varfs ? item.varfs : 0),
                        max: parseInt(item.maxfs ? item.maxfs : 0),
                    }
                    fenCha[index] = {
                        name: item.year + '年',
                        doorsill: parseInt(item.PoorMinfs ? item.PoorMinfs : 0),
                        safety: parseInt(item.PoorVarfs ? item.PoorVarfs : 0),
                        max: parseInt(item.PoorMaxfs ? item.PoorMaxfs : 0),
                    }
                })
            }
        }
        nanDu.unshift({
            name: '2017年',
            doorsill: 0,
            safety: 0,
            max: 0
        });
        fenCha.unshift({
            name: '2017年',
            doorsill: 0,
            safety: 0,
            max: 0
        });
        return (
            <section style={{display: isShow ? 'block' : 'none'}}>
                <div className={classNames(styles.graphBox, 'clearfix')}>
                    <h3>难度系数曲线图</h3>
                    <ul className={classNames('clearfix')}>
                        <li>
                            <i></i>
                            <span>最高分</span>
                        </li>
                        <li>
                            <i></i>
                            <span>安全线</span>
                        </li>
                        <li>
                            <i></i>
                            <span>门栏线</span>
                        </li>
                    </ul>
                    {
                        LineFire && LineFire.LineFire.data.S == '1' ? <Graph {...this.props} graphData={nanDu}/> :
                            <div style={{border: 'none', paddingTop: '.1rem', textAlign: 'center'}}>
                                <svg className="icon" aria-hidden="true" style={{width: '100%', height: '.8rem'}}>
                                    <use xlinkHref="#icon-zanwuneirong-"></use>
                                </svg>
                                <span style={{fontSize: '.14rem', color: '#A5A5A5'}}>暂无数据</span></div>
                    }

                </div>
                <div className={classNames(styles.graphBox, 'clearfix')}>
                    <h3>分差曲线图</h3>
                    <ul className={classNames('clearfix')}>
                        <li>
                            <i></i>
                            <span>最高分</span>
                        </li>
                        <li>
                            <i></i>
                            <span>安全线</span>
                        </li>
                        <li>
                            <i></i>
                            <span>门栏线</span>
                        </li>
                    </ul>
                    {
                        LineFire != undefined && LineFire.LineFire.data.S == '1' ?
                            <Graph {...this.props} graphData={fenCha}/> :
                            <div style={{border: 'none', paddingTop: '.1rem', textAlign: 'center'}}>
                                <svg className="icon" aria-hidden="true" style={{width: '100%', height: '.8rem'}}>
                                    <use xlinkHref="#icon-zanwuneirong-"></use>
                                </svg>
                                <span style={{fontSize: '.14rem', color: '#A5A5A5'}}>暂无数据</span></div>

                    }
                </div>
            </section>
        )
    }
}

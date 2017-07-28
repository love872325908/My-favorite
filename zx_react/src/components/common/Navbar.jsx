import React from 'react'
import styles from './Navbar.less'
export default class extends React.Component {
  constructor(props) {
    super(props)
  }

  onClickBack() {
    const {back, history, goback, home, backSchool} = this.props;
    if (goback) {
      history.push(home.routeUrl)
    } else if (backSchool) {
      console.log(home.sUrl)
      if(home.sUrl){
        history.push(home.sUrl)
      }else{
        history.push('/home')
      }
    } else {
      if (typeof(back) == 'object') {
        history.push(`/home`)
      } else if (typeof(back) == 'string') {
        history.push(`/${back}`)
      } else {
        // window.history.go(-1)
        history.goBack()
      }
    }
  }

  render() {
    const {title} = this.props;
    console.log(title)
    return (
      <div className={styles.navbar} style={{zIndex: '99'}}>
        <div className={styles.backIconBox} onClick={this.onClickBack.bind(this)}>
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icon-jiantou"></use>
          </svg>
        </div>
        <h3>{this.props.title}</h3>
      </div>
    )
  }
}

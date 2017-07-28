import React from 'react';
import PreloaderIcon, {ICON_TYPE} from 'react-preloader-icon';
import styles from './Load.less';
export default (props) => {

  const { home } = props;
  const open = home.openAjax? 'block':'none';
  return (
    <div style={{display:open}}  className={styles.body}>
     <div className={styles.main}> </div>
        {/*banner*/}
        <PreloaderIcon className={styles.load}
        type={ICON_TYPE.PUFF}
        size={40}
        strokeWidth={7} // min: 1, max: 50
        strokeColor="#006064"
        duration={1500}
       />

    </div>
  )
}

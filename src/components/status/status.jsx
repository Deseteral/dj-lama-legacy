import React from 'react';

import styles from './status.less';

export default class Status extends React.Component {
  render() {
    return (
      <div className={styles['container']}>
        <div className={styles['page-title']}>Status page</div>
        <img className={styles['logo']} src="/resources/logo.svg"/>
      </div>
    );
  }
}

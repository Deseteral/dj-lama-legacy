import React from 'react';

import styles from './header.less';

export default class Status extends React.Component {
  render() {
    return (
      <div className={styles['container']}>
        <div className={styles['title']}>DJ Lama</div>
      </div>
    );
  }
}

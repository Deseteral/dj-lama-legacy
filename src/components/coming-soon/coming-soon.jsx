import React from 'react';
import styles from './coming-soon.less';

export default class ComingSoon extends React.Component {
  render() {
    return (
      <div className={styles['container']}>
        <h1 className={styles['title']}>DJ Lama</h1>
        <img className={styles['logo']} src="/resources/logo.svg" />
        <h2 className={styles['subtitle']}>coming sooner or later...</h2>
      </div>
    );
  }
}

import React from 'react';

import styles from './style-guide.less';

export default class StyleGuide extends React.Component {
  render() {
    return (
      <div className={styles['container']}>
        <div className={styles['header']}>
          <span className={styles['header-title']}>DJ Lama</span>
          <span className={styles['header-separator']}>|</span>
          <span className={styles['header-subtitle']}>style guide</span>
        </div>
        <div className={styles['typefaces']}>
          <div className={styles['typefaces-logo']}>Lobster</div>
          <div className={styles['typefaces-standard']}>Raleway</div>
          <div className={styles['typefaces-mono']}>Fira Mono</div>
        </div>
      </div>
    );
  }
}

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
        <h2 className={styles['section-title']}>Typography</h2>
        <div className={styles['typefaces']}>
          <div className={styles['typefaces-logo']}>Lobster</div>
          <div className={styles['typefaces-standard']}>Raleway</div>
          <div className={styles['typefaces-mono']}>Fira Mono</div>
        </div>
        <h2 className={styles['section-title']}>Color palette</h2>
        <div className={styles['palette']}>
          <div className={styles['palette-group']}>
            <div className={`${styles['color']} ${styles['color-orange']}`}>
              <div className={styles['color-hex']}>#ffca00</div>
              <div className={styles['color-name']}>orange</div>
            </div>
            <div className={`${styles['color']} ${styles['color-dark-orange']}`}>
              <div className={styles['color-hex']}>#dc8f00</div>
              <div className={styles['color-name']}>dark orange</div>
            </div>
          </div>
          <div className={styles['palette-group']}>
            <div className={`${styles['color']} ${styles['color-blue']}`}>
              <div className={styles['color-hex']}>#43a8fe</div>
              <div className={styles['color-name']}>blue</div>
            </div>
            <div className={`${styles['color']} ${styles['color-dark-blue']}`}>
              <div className={styles['color-hex']}>#115faf</div>
              <div className={styles['color-name']}>dark blue</div>
            </div>
          </div>
          <div className={styles['palette-group']}>
            <div className={`${styles['color']} ${styles['color-pink']}`}>
              <div className={styles['color-hex']}>#ff67a0</div>
              <div className={styles['color-name']}>pink</div>
            </div>
            <div className={`${styles['color']} ${styles['color-dark-pink']}`}>
              <div className={styles['color-hex']}>#d73373</div>
              <div className={styles['color-name']}>dark pink</div>
            </div>
          </div>
          <div className={styles['palette-group']}>
            <div className={`${styles['color']} ${styles['color-snow-white']}`}>
              <div className={styles['color-hex']}>#ffffff</div>
              <div className={styles['color-name']}>snow white</div>
            </div>
            <div className={`${styles['color']} ${styles['color-dark-night']}`}>
              <div className={styles['color-hex']}>#182026</div>
              <div className={styles['color-name']}>dark night</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

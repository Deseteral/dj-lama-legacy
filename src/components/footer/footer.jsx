import React from 'react';

import styles from './footer.less';

export default class Footer extends React.Component {
  render() {
    return (
      <div className={styles['container']}>
        <div>
          <div className={styles['app-title']}>DJ Lama</div>
          <div className={styles['app-version']}>{this.props.appVersion}</div>
        </div>
        <div>
          <a className={styles['code-link']}
             href='https://github.com/Deseteral/dj-lama'>
            <i className={`${styles['code-icon']} material-icons`}>code</i>
            <div>source code</div>
          </a>
        </div>
        <div className={styles['info']}>
          Made with&nbsp;
          <i className={`${styles['info-icon']} material-icons`}>favorite</i>
          &nbsp;while listening to some&nbsp;
          <i className={`${styles['info-icon']} material-icons`}>audiotrack</i>.
        </div>
      </div>
    );
  }
}

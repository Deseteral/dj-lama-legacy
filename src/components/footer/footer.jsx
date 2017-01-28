import React from 'react';

import styles from './footer.less';

export default function Footer({ appVersion }) {
  return (
    <div className={styles['container']}>
      <div className={styles['container-head']}>
        <div className={styles['app-info']}>
          <div className={styles['app-title']}>DJ Lama</div>
          <div className={styles['app-version']}>{appVersion}</div>
        </div>
        <a
          className={styles['code-link']}
          href="https://github.com/Deseteral/dj-lama"
        >
          <i className={`${styles['code-icon']} material-icons`}>
            code
          </i>
          <div>source code</div>
        </a>
        <a
          className={styles['style-link']}
          href="/style-guide"
        >
          <i className={`${styles['style-icon']} material-icons`}>
            color_lens
          </i>
          <div>style guide</div>
        </a>
        <a
          className={styles['changelog-link']}
          href="/public/CHANGELOG.md"
        >
          <i className={`${styles['changelog-icon']} material-icons`}>
            content_paste
          </i>
          <div>changelog</div>
        </a>
      </div>
      <div className={styles['info']}>
        <span>Made with</span>
        <i className={`${styles['info-icon']} material-icons`}>favorite</i>
        <span>while listening to some</span>
        <i className={`${styles['info-icon']} material-icons`}>audiotrack</i>.
      </div>
    </div>
  );
}

Footer.propTypes = {
  appVersion: React.PropTypes.string.isRequired
};

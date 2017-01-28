import React from 'react';

import styles from './status.less';

export default function Status() {
  return (
    <div className={styles['container']}>
      <div className={styles['page-title']}>Status page</div>
      <img className={styles['logo']} src="public/resources/logo.svg" alt="DJ Lama logo" />
    </div>
  );
}

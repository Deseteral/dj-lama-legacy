import React from 'react';

import Header from '../header/header';
import Footer from '../footer/footer';
import Status from '../status/status';

import styles from './app.less';

export default function App({ version }) {
  return (
    <div className={styles['root']}>
      <Header />
      <div className={styles['container']}>
        <Status />
      </div>
      <Footer appVersion={version} />
    </div>
  );
}

App.propTypes = {
  version: React.PropTypes.string.isRequired
};

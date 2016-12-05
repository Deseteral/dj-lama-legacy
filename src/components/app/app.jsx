import React from 'react';

import Header from '../header/header';
import Footer from '../footer/footer';
import Status from '../status/status';

import styles from './app.less';

export default class App extends React.Component {
  render() {
    return (
      <div className={styles['root']}>
        <Header/>
        <div className={styles['container']}>
          <Status/>
        </div>
        <Footer appVersion='2.0.0'/>
      </div>
    );
  }
}

import React from 'react';

import Header from '../header/header';
import Status from '../status/status';

import styles from './app.less';

export default class App extends React.Component {
  render() {
    return (
      <div className={styles['root']}>
        <Header/>
        <Status/>
      </div>
    );
  }
}

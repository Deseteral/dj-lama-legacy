import React from 'react';
import styles from './coming-soon.less';

export default class ComingSoon extends React.Component {
  render() {
    return (
      <div className="coming-soon--container">
        <h1 className="coming-soon--title">DJ Lama</h1>
        <img className="coming-soon--logo" src="/resources/logo.svg" />
        <h2 className="coming-soon--subtitle">Coming sooner or later...</h2>
      </div>
    );
  }
}

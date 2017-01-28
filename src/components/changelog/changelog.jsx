import React from 'react';
import ReactMarkdown from 'react-markdown';

import styles from './changelog.less';

export default function Changelog({ content }) {
  return (
    <div className={styles['paper']}>
      <ReactMarkdown source={content} className={styles['changelog-container']} />
    </div>
  );
}

Changelog.propTypes = {
  content: React.PropTypes.string.isRequired
};

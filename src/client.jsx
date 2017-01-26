import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/app';
import StyleGuide from './components/style-guide/style-guide';

const applicationConfig = window.applicationConfig;

const component = () => {
  const renderPage = applicationConfig.route || '/';

  switch (renderPage) {
    case '/style-guide':
      return <StyleGuide />;
    default:
      return <App version={applicationConfig.appVersion} />;
  }
};

ReactDOM.render(
  component(),
  document.getElementById('app')
);

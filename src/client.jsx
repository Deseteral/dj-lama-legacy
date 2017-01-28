import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/header/header';
import Footer from './components/footer/footer';
import App from './components/app/app';
import StyleGuide from './components/style-guide/style-guide';
import Changelog from './components/changelog/changelog';

const applicationConfig = window.applicationConfig;

const component = () => {
  const renderPage = applicationConfig.route || '/';

  switch (renderPage) {
    case '/style-guide':
      return <StyleGuide />;
    case '/changelog':
      return (
        <div>
          <Header />
          <Changelog content={applicationConfig.changelogMarkdown} />
          <Footer appVersion={applicationConfig.appVersion} />
        </div>
      );
    default:
      return <App version={applicationConfig.appVersion} />;
  }
};

ReactDOM.render(
  component(),
  document.getElementById('app')
);

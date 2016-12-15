import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/app';
import StyleGuide from './components/style-guide/style-guide';

const props = window.__props;

const component = () => {
  const renderPage = props.page || 'app';

  switch (renderPage) {
  case 'style-guide':
    return <StyleGuide/>;
  default:
    return <App/>;
  }
};

ReactDOM.render(
  component(),
  document.getElementById('app')
);

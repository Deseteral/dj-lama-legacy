import 'should';
import React from 'react';
import { mount } from 'enzyme';
import classNames from '../footer.less';

import Footer from '../footer';

describe('<Footer> component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Footer appVersion="2.0.0" />);
  });

  it('should render app title', () => {
    findElementByClass('app-title').text().should.eql('DJ Lama');
  });

  it('should render correct app version', () => {
    findElementByClass('app-version').text().should.eql('2.0.0');
  });

  it('should render link to app\'s source code', () => {
    findElementByClass('code-link').prop('href')
      .should.eql('https://github.com/Deseteral/dj-lama');
  });

  it('should render link to style guide', () => {
    findElementByClass('style-link').prop('href')
      .should.eql('/style-guide');
  });

  it('should render some info message', () => {
    findElementByClass('info').text()
      .should.eql('Made withfavoritewhile listening to someaudiotrack.');
  });

  function findElementByClass(className) {
    return wrapper.find(`.${classNames[className]}`);
  }
});

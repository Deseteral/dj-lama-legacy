import React from 'react';
import { mount } from 'enzyme';
import classNames from '../header.less';
import 'should';

import Header from '../header';

describe('<Header> component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Header/>);
  });

  it('should render title', () => {
    findElementByClass('title').text().should.eql('DJ Lama');
  });

  function findElementByClass(className) {
    return wrapper.find(`.${classNames[className]}`);
  }
});

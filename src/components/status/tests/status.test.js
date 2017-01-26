import 'should';
import React from 'react';
import { mount } from 'enzyme';
import classNames from '../status.less';

import Status from '../status';

describe('<Status> component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Status />);
  });

  it('should render page title', () => {
    findElementByClass('page-title').text().should.eql('Status page');
  });

  it('should render logo', () => {
    findElementByClass('logo').length.should.eql(1);
  });

  function findElementByClass(className) {
    return wrapper.find(`.${classNames[className]}`);
  }
});

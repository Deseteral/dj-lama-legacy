import React from 'react';
import ComingSoon from '../coming-soon';
import { mount } from 'enzyme';
import classNames from '../coming-soon.less';
import 'should';

describe('<ComingSoon> component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<ComingSoon/>);
  });

  it('should render title', () => {
    findElementByClass('title').text().should.eql('DJ Lama');
  });

  it('should render subtitle', () => {
    findElementByClass('subtitle').text()
      .should.eql('coming sooner or later...');
  });

  it('should render logo', () => {
    findElementByClass('logo').length.should.eql(1);
  });

  function findElementByClass(className) {
    return wrapper.find(`.${classNames[className]}`);
  }
});

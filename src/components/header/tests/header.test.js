import React from 'react';
import Header from '../header';
import { mount } from 'enzyme';
import classNames from '../coming-soon.less';
import 'should';

describe('<ComingSoon> component', () => {
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

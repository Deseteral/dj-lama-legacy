import React from 'react';
import { mount } from 'enzyme';
import classNames from '../style-guide.less';
import 'should';

import StyleGuide from '../style-guide';

describe('<StyleGuide> component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<StyleGuide/>);
  });

  it('should render page title', () => {
    findElementByClass('header')
      .children()
      .map((n) => n.text())
      .join(' ')
      .should.eql('DJ Lama | style guide');
  });

  it('should render section titles', () => {
    findElementByClass('section-title')
      .map((el) => el.text())
      .should.eql([
        'Typography',
        'Color palette'
      ]);
  });

  it('should render typefaces', () => {
    findElementByClass('typefaces')
      .children()
      .length
      .should.eql(3);
  });

  it('should render palette', () => {
    findElementByClass('color')
      .length
      .should.eql(8);
  });

  function findElementByClass(className) {
    return wrapper.find(`.${classNames[className]}`);
  }
});

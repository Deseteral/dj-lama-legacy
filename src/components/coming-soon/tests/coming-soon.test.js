import React from 'react';
import ComingSoon from '../coming-soon';
import { mount } from 'enzyme';
import 'should';

describe('<ComingSoon> component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<ComingSoon/>);
  });

  it('should render title', () => {
    wrapper.find('.coming-soon--title').text().should.eql('DJ Lama');
  });

  it('should render subtitle', () => {
    wrapper.find('.coming-soon--subtitle').text()
      .should.eql('coming sooner or later...');
  });

  it('should render logo', () => {
    wrapper.find('.coming-soon--logo').length.should.eql(1);
  });
});

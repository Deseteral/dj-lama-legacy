import React from 'react';
import { shallow } from 'enzyme';
import 'should';

import App from '../app';
import Header from '../../header/header';
import Status from '../../status/status';

describe('<App> component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App version="1.0.0" />);
  });

  it('should render header', () => {
    wrapper.find(Header).length.should.eql(1);
  });

  it('should render status page', () => {
    wrapper.find(Status).length.should.eql(1);
  });
});

import React from 'react';
import { mount } from 'enzyme';

import Changelog from '../changelog';

describe('<Changelog> component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Changelog content={'__this is markdown__'} />);
  });

  it('should render markdown', () => {
    wrapper.find('ReactMarkdown').length.should.eql(1);
  });
});

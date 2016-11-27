import React from 'react';
import ComingSoon from '../coming-soon';

import 'should';

describe('<ComingSoon> component', () => {
  it('should test', () => {
    const cs = <ComingSoon/>;
    cs.should.eql(cs);
  });
});

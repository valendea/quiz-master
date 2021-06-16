import React from 'react';
import { shallow } from 'enzyme';

import Header from "../src/components/Global/Header/Header";

describe('<Header />', function () {
  const wrapper = shallow(<Header />)

  it('should render without throwing an error', function () {
    expect(wrapper.contains(<a href="/"><h1>Quiz Master</h1></a>)).toBe(true);
  });
});
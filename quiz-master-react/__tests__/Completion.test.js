import React from 'react';
import { shallow } from 'enzyme';
import { Link } from "react-router-dom";

import Completion from "../src/components/Completion/Completion";

describe('<Completion />', function () {
  const wrapper = shallow(<Completion />)

  it('should render without throwing an error', function () {
    expect(wrapper.contains(<h1>That's it</h1>)).toBe(true);
    expect(wrapper.contains(<h3>Thank you for participating</h3>)).toBe(true);
    expect(wrapper.contains(<Link to="/">Back to Home</Link>)).toBe(true);
  });
});
import React from 'react';
import { shallow } from 'enzyme';
import { PrimaryButton } from "../src/components/Global/Button/Button";
import { Link } from "react-router-dom";

import Welcome from "../src/components/Welcome/Welcome";

describe('<Welcome />', function () {
  const wrapper = shallow(<Welcome />)

  it('should render without throwing an error', function () {
    expect(wrapper.contains(<p>Welcome to</p>)).toBe(true);
    expect(wrapper.contains(<h1 className="Welcome__Title">Quiz Master</h1>)).toBe(true);
    expect(wrapper.contains(<PrimaryButton>Answer questions</PrimaryButton>)).toBe(true);
    expect(wrapper.contains(<Link to="/list">Browse questions list</Link>)).toBe(true);
  });
});
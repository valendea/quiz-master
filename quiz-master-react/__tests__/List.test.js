import React from 'react';
import { shallow } from 'enzyme';

import { Link } from "react-router-dom";
import { PrimaryButton } from "../src/components/Global/Button/Button";

import List from "../src/components/List/List";

describe('<List />', function () {
  const wrapper = shallow(<List />)

  it('should render without throwing an error', function () {
    expect(wrapper.contains(<h1>Question List</h1>)).toBe(true)
    expect(wrapper.find('thead tr').children().length).toBe(4);
  });

  it('should render Create new question button', function () {
    expect(
      wrapper.containsMatchingElement(
        <Link to="/questions/new">
          <PrimaryButton>Add new question</PrimaryButton>
        </Link>
      )
    ).toBeTruthy()
  })
});
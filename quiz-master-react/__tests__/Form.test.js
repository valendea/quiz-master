import React from 'react';
import { shallow } from 'enzyme';
import { Editor } from "react-draft-wysiwyg";

import { Link } from "react-router-dom";
import { PrimaryButton } from "../src/components/Global/Button/Button";
import { Input } from "../src/components/Global/Input/Input";

import Form from "../src/components/Form/Form";

describe('<List />', function () {
  const wrapper = shallow(<Form />)

  it('should render without throwing an error', function () {
    expect(
      wrapper.containsMatchingElement(
        <Link to="/list">Back to Question List</Link>
      )
    ).toBeTruthy()
  });

  it('renders question editor', function () {
    expect(wrapper.contains(<h3>Question</h3>)).toBe(true)
    expect(
      wrapper.containsMatchingElement(
        <Editor />
      )
    ).toBeTruthy()
  })

  it('render answer input', function () {
    expect(wrapper.contains(<h3>Answer</h3>)).toBe(true)
    expect(
      wrapper.containsMatchingElement(
        <Input />
      )
    ).toBeTruthy()
  })

  it('render submit button', function () {
    expect(
      wrapper.containsMatchingElement(
        <PrimaryButton type="submit">Submit</PrimaryButton>
      )
    ).toBeTruthy()
  })
});
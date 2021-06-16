import React from 'react';
import { shallow, mount } from 'enzyme';

import { Markup } from 'interweave';
import { PrimaryButton } from "../src/components/Global/Button/Button";

import Content from "../src/components/Content/Content";
import { Input } from "../src/components/Global/Input/Input";

describe('<Content />', function () {
  const mockFn = jest.fn()
  const wrapper = shallow(<Content />)

  it('renders submit button', function () {
    expect(
      wrapper.containsMatchingElement(
        <PrimaryButton type="submit" id="submit-button">Check my answer</PrimaryButton>
      )
    ).toBeTruthy()
  });

  it("renders input", () => {
    expect(
      wrapper.containsMatchingElement(
        <Input />
      )
    ).toBeTruthy()
  })

  it("renders question", () => {
    expect(
      wrapper.containsMatchingElement(
        <Markup content="" />
      )
    ).toBeTruthy()
  });

  it("accepts props", () => {
    const wrapper = mount(
      <Content question="a" handleSubmit={mockFn} handleAnswer={mockFn} handleNext={mockFn}/>
    );
    expect(wrapper.props().question).toBe("a");
    expect(wrapper.props().handleSubmit).toBeTruthy();
    expect(wrapper.props().handleAnswer).toBeTruthy();
    expect(wrapper.props().handleNext).toBeTruthy();
  });
});
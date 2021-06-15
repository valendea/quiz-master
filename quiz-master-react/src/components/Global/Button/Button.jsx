import React from "react";
import "./Button.scss";

export const PrimaryButton = ({ children, ...props }) => (
  <button className='Button__Primary' {...props}>
    {children}
  </button>
)

export const SecondaryButton = ({ children, ...props }) => (
  <button className='Button__Secondary' {...props}>
    {children}
  </button>
)
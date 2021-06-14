import React from "react";
import "./Button.scss";

export const PrimaryButton = ({ children, ...props }) => {
  return (
    <div className="Button" id='Button'>
      <button className='Button__Primary' {...props}>
        {children}
      </button>
    </div>
  )
}

export const SecondaryButton = ({ children, ...props }) => {
  return (
    <div className="Button" id='Button'>
      <button className='Button__Secondary' {...props}>
        {children}
      </button>
    </div>
  )
}
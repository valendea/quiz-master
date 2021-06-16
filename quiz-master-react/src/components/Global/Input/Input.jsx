import React from "react";
import "./Input.scss";

export const Input = React.forwardRef((props, ref) => {
  return (
    <input ref={ref} className='Input' {...props} />
  )
})
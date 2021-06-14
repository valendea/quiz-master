import React, { useState, useEffect } from "react";

import { Input } from "../Global/Input/Input";
import { PrimaryButton, SecondaryButton } from "../Global/Button/Button";

import "./Content.scss";

const Content = ({ question, handleSubmit, handleAnswer, handleNext, inputRef }) => {
  const [content, setContent] = useState("")

  useEffect(() => {
    if (Object.keys(question).length > 0) {
      setContent(question.content)
    }
  }, [question]);

  return (
    <div className="Content">
      <form onSubmit={(e) => handleSubmit(e)}>
        <p>{content}</p>
        <Input
          placeholder="Enter your answer"
          onChange={(e) => handleAnswer(e)}
          ref={inputRef}
        />
        <PrimaryButton type="submit">Check my answer</PrimaryButton>
      </form>
      <SecondaryButton onClick={handleNext}>Next</SecondaryButton>
    </div>
  )
}

export default Content;
import React, { useState, useEffect } from "react";
import { Markup } from 'interweave';

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
        <div className="Content__Question">
          <Markup content={content}/>
        </div>
        <div className="Content__Answer">
          <Input
            placeholder="Enter your answer"
            onChange={(e) => handleAnswer(e)}
            ref={inputRef}
          />
        </div>
        <div className="Content__Submit_Button">
          <PrimaryButton type="submit" id="submit-button">Check my answer</PrimaryButton>
        </div>
      </form>
      <div className="Content__Next_Button">
        <SecondaryButton onClick={handleNext}>Next</SecondaryButton>
      </div>
    </div>
  )
}

export default Content;
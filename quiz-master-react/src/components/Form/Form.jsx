import React, { useEffect, useState, useRef } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import { Input } from "../Global/Input/Input";
import { PrimaryButton } from "../Global/Button/Button";
import "./Form.scss"

const API_URL = 'http://localhost:3000'

const Form = ({ action, id = undefined, question = undefined }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [htmlEditorState, setHtmlEditorState] = useState("")
  const [answer, setAnswer] = useState("")
  const answerRef = useRef(null)


  const onEditorStateChange = (editorState) => setEditorState(editorState)

  const handleAnswer = (e) => setAnswer(e.target.value)
  
  const handleSubmit = async(e) => {
    e.preventDefault()

    let url = `${API_URL}/api/v1/questions`
    let method = 'POST'

    if (action === 'update') {
      url += `/${id}`
      method = 'PUT'
    }

    return await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: {
          content: htmlEditorState,
          answer
        }
      })
    })
      .then((response) => response.json())
      .then(() => window.location.href = "/list")
      .catch(error =>console.log(error)
    )
  }

  useEffect(() => {
    const rawContent = convertToRaw(editorState.getCurrentContent())
    setHtmlEditorState(draftToHtml(rawContent))
  }, [editorState])

  useEffect(() => {
    console.log(htmlEditorState)
  }, [htmlEditorState])

  useEffect(() => {
    if (Object.keys(question).length <= 0) return

    const contentBlock = htmlToDraft(question.content);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState)
      setAnswer(question.answer)
    }
  }, [question])

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="Form__Editor">
          <p>Question</p>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
          />
        </div>

        <div className="Form__Answer">
          <p>Answer</p>
          <Input
            value={answer}
            onChange={(e) => handleAnswer(e)}
            ref={answerRef}
          />
        </div>

        <PrimaryButton type="submit">Submit</PrimaryButton>
      </form>
    </div>
    
  )
}

export default Form;
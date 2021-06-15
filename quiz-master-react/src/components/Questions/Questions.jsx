import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Content from "../Content/Content";

import "./Questions.scss";

const API_URL = 'http://localhost:3000'
const APP_URL = 'http://localhost:3001'

const Question = () => {
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState({})
  const [currentQuestionId, setCurrentQuestionId] = useState(0)
  const [currentQuestionCounter, setCurrentQuestionCounter] = useState(0)
  const [answer, setAnswer] = useState("")
  const [checkAnswerData, setCheckAnswerData] = useState({})
  const inputRef = useRef(null)

  const fetchQuestions = async () => {
    return await fetch(`${API_URL}/api/v1/questions?status=active`, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(resp => setQuestions(resp.data))
      .catch(error =>console.log(error)
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    return await fetch(`${API_URL}/api/v1/questions/${currentQuestionId}/check-answer`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: {
          answer
        }
      })
    })
      .then((response) => response.json())
      .then(data => setCheckAnswerData(data))
      .catch(error =>console.log(error)
    )
  }

  const handleAnswer = (e) => setAnswer(e.target.value)

  const handleNext = () => {
    inputRef.current.value = ""
    setAnswer("")
    setCurrentQuestionCounter(currentQuestionCounter + 1)
  }

  useEffect(() => {
    fetchQuestions()
  }, [])

  useEffect(() => {
    if (questions.length <= 0) return

    const question = questions[currentQuestionCounter]
    if (question === undefined) {
      window.location.href = `${APP_URL}/completion`;
      return
    }
    setCurrentQuestion(question.attributes)
  }, [questions, currentQuestionCounter])

  useEffect(() => {
    setCurrentQuestionId(currentQuestion.id)
  }, [currentQuestion])

  useEffect(() => {
    if (Object.keys(checkAnswerData).length <= 0) return

    const { correct } = checkAnswerData
    if (correct) {
      toast.success("That's correct!");
    } else {
      toast.error('Wrong answer. Please try again.');
    }
  }, [checkAnswerData])

  return (
    <div className="Question">
      <div className="Question__Wrapper">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Content
          question={currentQuestion}
          handleSubmit={handleSubmit}
          handleAnswer={handleAnswer}
          handleNext={handleNext}
          inputRef={inputRef}
        />
      </div>
    </div>
  )
}

export default Question;
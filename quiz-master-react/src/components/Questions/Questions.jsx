import React, { useState, useEffect, useRef } from "react";

import Content from "../Content/Content";

import "./Questions.scss";

const API_URL = 'http://localhost:3000'

const Question = () => {
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState({})
  const [currentQuestionId, setCurrentQuestionId] = useState(0)
  const [currentQuestionCounter, setCurrentQuestionCounter] = useState(0)
  const [answer, setAnswer] = useState("")
  const [checkAnswerData, setCheckAnswerData] = useState({})
  const inputRef = useRef(null)

  const fetchQuestions = async () => {
    return await fetch(`${API_URL}/api/v1/questions/`, {
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
    if (questions.length > 0) {
      const question = questions[currentQuestionCounter].attributes
      setCurrentQuestion(question)
    }
  }, [questions, currentQuestionCounter])

  useEffect(() => {
    setCurrentQuestionId(currentQuestion.id)
  }, [currentQuestion])

  useEffect(() => {
    if (Object.keys(checkAnswerData).length <= 0) return

    const { correct } = checkAnswerData
    if (correct) {
      console.log("correct")
    } else {
      console.log("nope")
    }
  }, [checkAnswerData])


  return (
    <Content
      question={currentQuestion}
      handleSubmit={handleSubmit}
      handleAnswer={handleAnswer}
      handleNext={handleNext}
      inputRef={inputRef}
    />
  )
}

export default Question;
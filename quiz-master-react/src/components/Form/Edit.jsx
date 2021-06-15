import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Form from "./Form";

const API_URL = 'http://localhost:3000'

const Edit = () => {
  const { id } = useParams()
  const [question, setQuestion] = useState({})

  const fetchQuestion = async () => {
    return await fetch(`${API_URL}/api/v1/questions/${id}`, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json())
      .then(res => setQuestion(res.data.attributes))
      .catch(error => console.log(error));
  }

  useEffect(() => {
    fetchQuestion()
  }, [])

  return (
    <Form action="update" id={id} question={question} />
  )
}

export default Edit;
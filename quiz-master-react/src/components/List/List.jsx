import React, { useState, useEffect } from "react";
import { Markup } from 'interweave';
import { Link } from "react-router-dom";

import { PrimaryButton } from "../Global/Button/Button";
import "./List.scss";

const API_URL = 'http://localhost:3000'

const List = () => {
  const [questions, setQuestions] = useState([])

  const fetchQuestions = async () => {
    return await fetch(`${API_URL}/api/v1/questions`, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(resp => setQuestions(resp.data))
      .catch(error =>console.log(error)
    )
  }

  const handleStatus = async (id, status) => {
    return await fetch(`${API_URL}/api/v1/questions/${id}`, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: {
          status
        }
      })
    })
      .then(response => response.json())
      .then(() => fetchQuestions())
      .catch(error => console.log(error)
    )
  }

  useEffect(() => {
    fetchQuestions()
  }, [])

  const questionsList = questions.map(question => {
    const { attributes: { id, content, answer, status } } = question
    return (
      <tr key={id}>
        <td>{status}</td>
        <td>
          <Markup content={content} />
        </td>
        <td>{answer}</td>
        <td>
          <Link to={`/questions/${id}/edit`}>Edit</Link>
          { status === 'active' ?
            <div className="List__Action" onClick={() => handleStatus(id, "inactive")}>Inactive</div>
              :
            <div className="List__Action" onClick={() => handleStatus(id, "active")}>Active</div>
          }
          <div className="List__Action" onClick={() => handleStatus(id, "delete")}>Delete</div>
        </td>
      </tr>
    )
  })

  return (
    <div className="List">
      <div className="List__Title_Wrapper">
        <h1>Question List</h1>
        <Link to="/questions/new">
          <PrimaryButton>Add new question</PrimaryButton>
        </Link>
      </div>
      <table className="List__Table">
        <thead>
          <tr>
            <th>Status</th>
            <th>Question</th>
            <th>Answer</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          { questionsList }
        </tbody>
      </table>
    </div>
  )
}

export default List;
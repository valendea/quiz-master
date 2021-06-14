import React, { useState, useEffect } from "react";

export const apiStates = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
}

export const useFetch = (url) => {
  const [data, setData] = useState({
    state: apiStates.LOADING,
    data: [],
    error: ''
  })

  const setPartialData = (partialdata) => setData({ ...data, ...partialdata })

  const fetchData = async () => {
    return await fetch(url, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => response.json())
      .then(data => setPartialData({
        state: apiStates.SUCCESS,
        data
      }))
      .catch(error => setPartialData({
        state: apiStates.ERROR,
        error
    }))
  }

  useEffect(() => {
    setPartialData({
      state: apiStates.LOADING
    })
    fetchData()
  }, []);

  return data;
}

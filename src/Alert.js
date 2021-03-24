import React, { useEffect } from 'react'

const Alert = ({ type, msg, lists, removeAlert }) => {
  useEffect(() => {
    console.log("I have been called")
    const timeout = setTimeout(() => {
      removeAlert()
    }, 3000)
    return () => clearTimeout(timeout)

  }, [lists.title])
  return (
    <>
      <p className={`alert alert-${type}`}>{msg}</p>
    </>
  )
}

export default Alert

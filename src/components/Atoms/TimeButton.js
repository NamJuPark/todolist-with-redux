import React from "react"
import "./TimeButton.css"

const TimeButton = ({ isUndo, onClick, disabled }) => {
  return (
    <button
      className={`button ${disabled ? " disable" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {`${isUndo ? "UNDO" : "REDO"}`}
    </button>
  )
}
export default TimeButton

import React from "react"
import "./Form.css"

const Form = ({ value, fontColor, onChange, onCreate, onKeyPress }) => {
  return (
    <div className="form">
      <input
        value={value}
        style={{ color: fontColor }}
        onChange={onChange}
        onCreate={onCreate}
        onKeyPress={onKeyPress}
      />
      <div className="create-button" onClick={onCreate}>
        추가
      </div>
    </div>
  )
}

export default Form

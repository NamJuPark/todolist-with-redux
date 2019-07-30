import React, { Component } from "react"
import "./TodoItem.css"

class TodoItem extends Component {
  render() {
    const { text, checked, id, onToggle, onRemove } = this.props
    return (
      <div className="todo-item" onClick={() => onToggle(id)}>
        <div
          className="remove"
          onClick={e => {
            e.stopPropagation() //부모 클릭이벤트 실행되지 않게 함
            onRemove(id)
          }}
        >
          &times;
        </div>
        <div className={`todo-text ${checked ? " checked" : ""}`}>
          <div>{text}</div>
        </div>
        {checked && <div className="check-mark">✓</div>}
      </div>
    )
  }
}

export default TodoItem

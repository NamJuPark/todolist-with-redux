import React, { Component } from "react"
import TodoItem from "./TodoItem"

class TodoItemList extends Component {
  render() {
    const { todos, onToggle, onRemove } = this.props

    const todoList = todos.map(todo => (
      <TodoItem
        key={todo.get("id")}
        id={todo.get("id")}
        text={todo.get("text")}
        checked={todo.get("checked")}
        color={todo.get("color")}
        onToggle={onToggle}
        onRemove={onRemove}
      />
    ))

    return <div>{todoList}</div>
  }
}

export default TodoItemList

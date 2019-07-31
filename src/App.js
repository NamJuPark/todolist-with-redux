import React, { Component } from "react"
import TodoListTemplate from "./components/TodoListTemplate"
import Form from "./components/Form"
import TodoItemList from "./components/TodoItemList"
import Palette from "./components/Palette"

const colors = ["#343a40", "#f03e3e", "#12b886", "#228ae6"]

class App extends Component {
  id = 3
  state = {
    input: "",
    selectedColor: colors[0],
    todos: [
      { id: 0, text: "리액트 소개", checked: false, fontColor: "#343a40" },
      { id: 1, text: "리액트 소개", checked: true, fontColor: "#f03e3e" },
      { id: 2, text: "리액트 소개", checked: false, fontColor: "#343a40" }
    ]
  }

  handleChange = e => {
    this.setState({
      input: e.target.value
    })
  }

  handleCreate = () => {
    const { input, todos, selectedColor } = this.state
    this.setState({
      input: "",
      todos: todos.concat({
        id: this.id++,
        text: input,
        checked: false,
        fontColor: selectedColor
      })
    })
  }

  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.handleCreate()
    }
  }

  handleToggle = id => {
    const { todos } = this.state

    const index = todos.findIndex(todo => todo.id === id)
    const selected = todos[index]

    const nextTodos = [...todos]

    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    }

    this.setState({
      todos: nextTodos
    })
  }

  handleRemove = id => {
    const { todos } = this.state

    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    })
  }

  handleSelectColor = color => {
    this.setState({
      selectedColor: color
    })
  }

  render() {
    const { input, todos, selectedColor } = this.state
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove,
      handleSelectColor
    } = this
    return (
      <TodoListTemplate
        form={
          <Form
            value={input}
            fontColor={selectedColor}
            onChange={handleChange}
            onCreate={handleCreate}
            onKeyPress={handleKeyPress}
          />
        }
        palette={
          <Palette
            colors={colors}
            selected={selectedColor}
            onSelect={handleSelectColor}
          />
        }
      >
        <TodoItemList
          todos={todos}
          onToggle={handleToggle}
          onRemove={handleRemove}
        />
      </TodoListTemplate>
    )
  }
}

export default App

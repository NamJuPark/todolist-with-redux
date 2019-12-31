import React, { useState } from "react";
import TodoListTemplate from "./components/TodoListTemplate";
import Form from "./components/Form";
import TodoItemList from "./components/TodoItemList";
import Palette from "./components/Palette";

const colors = ["#343a40", "#f03e3e", "#12b886", "#228ae6"];

function App() {
  const [id, setId] = useState(3);
  const [selectedColor, setSelectedColor] = useState("#343a40");
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([
    { id: 0, text: "리액트 소개", checked: false, fontColor: "#343a40" },
    { id: 1, text: "리액트 소개", checked: true, fontColor: "#343a40" },
    { id: 2, text: "리액트 소개", checked: false, fontColor: "#12b886" }
  ]);

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleCreate = () => {
    setId(id + 1);
    setInput("");
    setTodos(
      todos.concat({
        id: id,
        text: input,
        checked: false,
        fontColor: selectedColor
      })
    );
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      handleCreate();
    }
  };

  const handleToggle = id => {
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index];

    const nextTodos = [...todos];

    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    };
    setTodos(nextTodos);
  };

  const handleRemove = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleSelectColor = color => {
    setSelectedColor(color);
    console.log(color);
  };

  return (
    <TodoListTemplate
      palette={
        <Palette
          colors={colors}
          selected={selectedColor}
          onSelect={handleSelectColor}
        />
      }
      form={
        <Form
          value={input}
          fontColor={selectedColor}
          onChange={handleChange}
          onCreate={handleCreate}
          onKeyPress={handleKeyPress}
        />
      }
    >
      <TodoItemList
        todos={todos}
        onToggle={handleToggle}
        onRemove={handleRemove}
      />
    </TodoListTemplate>
  );
}
export default App;

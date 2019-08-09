import React from "react"
import FormContainer from "../../containers/FormContainer"
import TodoListContainer from "../../containers/TodoListContainer"
import PaletteContainer from "../../containers/PaletteContainer"
import UndoRedoContainer from "../../containers/UndoRedoContainer"
import "./TodoListTemplate.css"

const TodoListTemplate = () => {
  return (
    <main className="todo-list-template">
      <div className="title">오늘 할 일</div>
      <section className="palette-wrapper">
        <PaletteContainer />
      </section>
      <section className="form-wrapper">
        <FormContainer />
      </section>
      <section className="undo-redo-wrapper">
        <UndoRedoContainer />
      </section>
      <section className="todos-wrapper">
        <TodoListContainer />
      </section>
    </main>
  )
}

export default TodoListTemplate

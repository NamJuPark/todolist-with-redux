import React from "react"
import { connect } from "react-redux"
import { check, remove } from "../store/modules/todoList"
import { bindActionCreators } from "redux"
import TodoItemList from "../components/TodoItemList"

const TodoListContainer = props => {
  const handleToggle = id => {
    const { TodoListActions } = props
    TodoListActions.check(id)
  }

  const handleRemove = id => {
    const { TodoListActions } = props
    TodoListActions.remove(id)
  }

  return (
    <TodoItemList
      todos={props.todos}
      onToggle={handleToggle}
      onRemove={handleRemove}
    />
  )
}

const mapStateToProps = ({ todoList }) => ({
  todos: todoList.get("todos")
})

const mapDispatchToProps = dispatch => ({
  TodoListActions: bindActionCreators({ check, remove }, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoListContainer)

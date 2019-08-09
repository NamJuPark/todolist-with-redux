import React from "react"
import { connect } from "react-redux"
import { check, remove, redoPast } from "../store/modules/todoList"
import { bindActionCreators } from "redux"
import TodoItemList from "../components/Organisms/TodoItemList"

const TodoListContainer = props => {
  const handleToggle = id => {
    const { TodoListActions } = props
    TodoListActions.check(id)
  }

  const handleRemove = id => {
    const { TodoListActions } = props
    TodoListActions.redoPast()
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
  todos: todoList.getIn(["todos", "present"])
})

const mapDispatchToProps = dispatch => ({
  TodoListActions: bindActionCreators({ check, remove, redoPast }, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoListContainer)

import React from "react"
import {
  changeInput,
  create,
  clearFuture,
  redoPast
} from "../store/modules/todoList"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Form from "../components/Molecules/Form"

const FormContainer = props => {
  //인풋 변경 이벤트
  const handleChange = e => {
    const { FormActions } = props
    FormActions.changeInput(e.target.value)
  }
  const handleCreate = () => {
    const { FormActions, input, selectedColor } = props
    FormActions.redoPast()
    FormActions.create(input, selectedColor)
    FormActions.clearFuture()
    FormActions.changeInput("")
  }
  const handleKeyPress = e => {
    if (e.key === "Enter") {
      handleCreate()
    }
  }

  return (
    <Form
      value={props.input}
      color={props.selectedColor}
      onChange={handleChange}
      onCreate={handleCreate}
      onKeyPress={handleKeyPress}
    />
  )
}

//state를 props로 주자!
const mapStateToProps = ({ todoList }) => ({
  input: todoList.get("input"),
  selectedColor: todoList.get("selectedColor"),
  todos: todoList.get("todos")
})

const mapDispatchToProps = dispatch => ({
  FormActions: bindActionCreators(
    { changeInput, create, clearFuture, redoPast },
    dispatch
  )
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormContainer)

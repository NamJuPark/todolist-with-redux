import React from "react"
import { connect } from "react-redux"
import UndoRedo from "../components/Molecules/UndoRedo"
import {
  undoPast,
  undoPresent,
  undoFuture,
  redoPast,
  redoPresent,
  redoFuture,
  clearFuture
} from "../store/modules/todoList"
import { bindActionCreators } from "redux"

const UndoRedoContainer = props => {
  const handleUndo = () => {
    const { UndoRedoActions } = props
    UndoRedoActions.undoFuture()
    UndoRedoActions.undoPresent()
    UndoRedoActions.undoPast()
  }

  const handleRedo = () => {
    const { UndoRedoActions } = props
    UndoRedoActions.redoPast()
    UndoRedoActions.redoPresent()
    UndoRedoActions.redoFuture()
  }

  return (
    <UndoRedo
      canUndo={props.canUndo}
      canRedo={props.canRedo}
      onUndo={handleUndo}
      onRedo={handleRedo}
    />
  )
}

const mapStateToProps = ({ todoList }) => {
  return {
    canUndo: todoList.getIn(["todos", "past"]).isEmpty(),
    canRedo: todoList.getIn(["todos", "future"]).isEmpty()
  }
}

const mapDispatchToProps = dispatch => ({
  UndoRedoActions: bindActionCreators(
    {
      undoPast,
      undoPresent,
      undoFuture,
      redoPast,
      redoPresent,
      redoFuture,
      clearFuture
    },
    dispatch
  )
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UndoRedoContainer)

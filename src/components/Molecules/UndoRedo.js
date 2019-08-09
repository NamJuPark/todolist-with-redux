import React from "react"
import TimeButton from "../Atoms/TimeButton"
import "./UndoRedo.css"

const UndoRedo = ({ onUndo, onRedo, canUndo, canRedo }) => {
  return (
    <div className="undo-redo">
      <TimeButton disabled={canUndo} isUndo={true} onClick={onUndo} />
      <TimeButton disabled={canRedo} isUndo={false} onClick={onRedo} />
    </div>
  )
}
export default UndoRedo

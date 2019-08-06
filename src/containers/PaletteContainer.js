import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Palette from "../components/Palette"
import { changeColor } from "../store/modules/todoList"

const PalleteContainer = props => {
  const handleSelectColor = selectedColor => {
    const { PaletteActions } = props
    PaletteActions.changeColor(selectedColor)
  }
  return <Palette selected={props.selectedColor} onSelect={handleSelectColor} />
}

const mapStateToProps = ({ todoList }) => ({
  selectedColor: todoList.get("selectedColor")
})

const mapDispatchToProps = dispatch => ({
  PaletteActions: bindActionCreators({ changeColor }, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PalleteContainer)

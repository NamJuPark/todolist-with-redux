import React from "react"
import "./Palette.css"

const colors = ["#343a40", "#f03e3e", "#12b886", "#228ae6"]

const Color = ({ color, active, onClick }) => {
  return (
    <div
      className={`color ${active ? " active" : ""}`}
      style={{ background: color }}
      onClick={onClick}
    />
  )
}

const Palette = ({ selected, onSelect }) => {
  const colorList = colors.map(color => (
    <Color
      color={color}
      active={selected === color}
      onClick={() => onSelect(color)}
      key={color}
    />
  ))

  return <div className="palette">{colorList}</div>
}

export default Palette

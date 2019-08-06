import { createAction, handleActions } from "redux-actions"
import { List, Map } from "immutable"

const CHANGE_INPUT = "todolist/CHANGE_INPUT" //인풋 값 변경
const CREATE = "todolist/CREATE" // 추가
const CHECK = "todolist/CHECK" // 체크 (아이템)
const REMOVE = "todolist/REMOVE" // 삭제 (아이템)
const CHANGE_COLOR = "todolist/CHANGECOLOR" //색 바꾸기

let id = 3

export const changeInput = createAction(CHANGE_INPUT, text => text)
export const create = createAction(CREATE, (text, selectedColor) => ({
  text,
  selectedColor,
  id: id++
}))
export const check = createAction(CHECK, id => id)
export const remove = createAction(REMOVE, id => id)
export const changeColor = createAction(
  CHANGE_COLOR,
  selectedColor => selectedColor
)

const initialState = Map({
  selectedColor: "#343a40",
  input: "",
  todos: List([
    Map({ id: 0, text: "리액트 소개1", checked: false, color: "#343a40" }),
    Map({ id: 1, text: "리액트 소개2", checked: true, color: "#343a40" }),
    Map({ id: 2, text: "리액트 소개3", checked: false, color: "#343a40" })
  ])
})

export default handleActions(
  {
    [CHANGE_INPUT]: (state, action) => state.set("input", action.payload),
    [CREATE]: (state, action) =>
      state.update("todos", todos =>
        todos.push(
          Map({
            id: action.payload.id,
            text: action.payload.text,
            checked: false,
            color: action.payload.selectedColor
          })
        )
      ),
    [CHANGE_COLOR]: (state, action) =>
      state.set("selectedColor", action.payload),
    [CHECK]: (state, action) => {
      const index = state
        .get("todos")
        .findIndex(item => item.get("id") === action.payload)
      return state.updateIn(["todos", index, "checked"], checked => !checked)
    },
    [REMOVE]: (state, action) => {
      const index = state
        .get("todos")
        .findIndex(item => item.get("id") === action.payload)
      return state.deleteIn(["todos", index])
    }
  },
  initialState
)

import { createAction, handleActions } from "redux-actions"
import { List, Map } from "immutable"

const CHANGE_INPUT = "todolist/CHANGE_INPUT" //인풋 값 변경
const CREATE = "todolist/CREATE" // 추가
const CHECK = "todolist/CHECK" // 체크 (아이템)
const REMOVE = "todolist/REMOVE" // 삭제 (아이템)
const CHANGE_COLOR = "todolist/CHANGECOLOR" //색 바꾸기
const UNDOPAST = "todolist/UNDOPAST"
const UNDOPRESENT = "todolist/UNDOPRESENT"
const UNDOFUTURE = "todolist/UNDOFUTURE"
const REDOPAST = "todolist/REDOPAST"
const REDOPRESENT = "todolist/REDOPRESENT"
const REDOFUTURE = "todolist/REDOFUTURE"
const CLEARFUTURE = "todolist/CLEARFUTURE"

let id = 1

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
export const undoPast = createAction(UNDOPAST)
export const redoPast = createAction(REDOPAST)
export const undoPresent = createAction(UNDOPRESENT)
export const redoPresent = createAction(REDOPRESENT)
export const undoFuture = createAction(UNDOFUTURE)
export const redoFuture = createAction(REDOFUTURE)
export const clearFuture = createAction(CLEARFUTURE)

const initialState = Map({
  selectedColor: "#343a40",
  input: "",
  todos: Map({
    past: List([
      List([]),
      List([
        Map({ id: 0, text: "형광펜1", checked: false, fontColor: "#343a40" })
      ]),
      List([
        Map({ id: 0, text: "형광펜1", checked: false, fontColor: "#343a40" }),
        Map({ id: 1, text: "형광펜2", checked: false, fontColor: "#343a40" })
      ])
    ]),
    present: List([
      Map({ id: 0, text: "형광펜1", checked: false, fontColor: "#343a40" }),
      Map({ id: 1, text: "형광펜2", checked: false, fontColor: "#343a40" }),
      Map({ id: 2, text: "형광펜3", checked: false, fontColor: "#343a40" })
    ]),
    future: List([])
  })
})

export default handleActions(
  {
    [CHANGE_INPUT]: (state, action) => state.set("input", action.payload),
    [CREATE]: (state, action) =>
      state.updateIn(["todos", "present"], present =>
        present.push(
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
        .getIn(["todos", "present"])
        .findIndex(item => item.get("id") === action.payload)
      return state.updateIn(
        ["todos", "present", index, "checked"],
        checked => !checked
      )
    },
    [REMOVE]: (state, action) => {
      const index = state
        .getIn(["todos", "present"])
        .findIndex(item => item.get("id") === action.payload)
      return state.deleteIn(["todos", "present", index])
    },
    [UNDOFUTURE]: (state, action) => {
      const _present = state.getIn(["todos", "present"]).concat()

      return state.updateIn(["todos", "future"], future =>
        future.push(_present)
      )
    },
    [UNDOPRESENT]: (state, action) => {
      const item = state
        .getIn(["todos", "past"])
        .last()
        .concat()
      return state.setIn(["todos", "present"], item)
    },
    [UNDOPAST]: (state, action) => {
      return state.updateIn(["todos", "past"], past => past.pop())
    },
    //redo는 past 쪽으로 한 칸씩 객체(Map)를 미는 과정
    //future의 최신 객체 제거(present로 넣었으니 괜찮다)
    [REDOFUTURE]: (state, action) => {
      return state.updateIn(["todos", "future"], future => future.pop())
    },
    //present = past의 마지막 객체(직전 history)
    [REDOPRESENT]: (state, action) => {
      const item = state
        .getIn(["todos", "future"])
        .last()
        .concat()
      return state.setIn(["todos", "present"], item)
    },
    //past.push(현재 present List)
    [REDOPAST]: (state, action) => {
      const _present = state.getIn(["todos", "present"]).concat()
      return state.updateIn(["todos", "past"], past => past.push(_present))
    },
    [CLEARFUTURE]: (state, action) =>
      state.updateIn(["todos", "future"], future => future.clear())
  },
  initialState
)

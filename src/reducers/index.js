import { fromJS, List } from 'immutable'
import { combineReducers } from 'redux-immutable'

const SPACE = {
  xStitch: false,
  color: '310'
}

const CANVAS_DEFAULT = {
  margin: {
    left: 2,
    right: 2,
    top: 2,
    bottom: 2
  },
  width: 6,
  height: 4,
  threadCount: 7,
  units: 'in'
}

const TOOLS_DEFAULT = {
  color: '310',
  tool: 'add'
}

const SPACES_DEFAULT = () => {
  const colCount = Math.floor(CANVAS_DEFAULT.width * CANVAS_DEFAULT.threadCount)
  const rowCount = Math.floor(CANVAS_DEFAULT.height * CANVAS_DEFAULT.threadCount)

  let main = []
  for (let i = 0; i < rowCount; i++) {
    let row = []
    for (let idx = 0; idx < colCount; idx++) {
      row.push(Object.assign({}, SPACE))
    }
    main.push(row)
  }
  return main
}

const canvasReducer = (state = fromJS(CANVAS_DEFAULT), action) => {
  switch (action.type) {
    case 'SOME_ACTION':
      return state
    default:
      return state
  }
}

const toolsReducer = (state = fromJS(TOOLS_DEFAULT), action) => {
  switch (action.type) {
    case 'UPDATE_COLOR_TOOL':
      return state.set('color', action.payload)
    case 'UPDATE_TOOL':
      return state.set('tool', action.payload)
    default:
      return state
  }
}

const spacesReducer = (state = fromJS(SPACES_DEFAULT()), action) => {
  switch (action.type) {
    case 'TOGGLE_STITCH':
      return state.mergeIn([action.row, action.col], fromJS({xStitch: !state.getIn([action.row, action.col, 'xStitch']), color: action.color}))
    case 'TOGGLE_SELECT':
      return state.mergeIn([action.row, action.col], fromJS({selected: !state.getIn([action.row, action.col, 'selected'])}))
    default:
      return state
  }
}

const combined = combineReducers({canvas: canvasReducer, spaces: spacesReducer, tools: toolsReducer})

export default combined

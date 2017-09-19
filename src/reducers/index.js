import { combineReducers } from 'redux'

const SPACE = {
  xStitch: false,
  color: '#000000'
}

const CANVAS_DEFAULT = {
  margin: {
    left: 2,
    right: 2,
    top: 2,
    bottom: 2
  },
  width: 18,
  height: 12,
  threadCount: 7,
  units: 'in'
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

const canvasReducer = (state = CANVAS_DEFAULT, action) => {
  switch (action.type) {
    case 'SOME_ACTION':
      return state
    default:
      return state
  }
}

const spacesReducer = (state = SPACES_DEFAULT(), action) => {
  switch (action.type) {
    case 'TOGGLE_STITCH':
      const targetSpace = state[action.row][action.col]
      const newRow = state[action.row].slice()
      newRow[action.col] = Object.assign({}, targetSpace, {xStitch: !targetSpace.xStitch})
      const newState = state.slice()
      newState[action.row] = newRow 
      return newState
    default:
      return state
  }
}

const combined = combineReducers({canvas: canvasReducer, spaces: spacesReducer})

export default combined

const INITIAL_STATE = {
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

const basicReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SOME_ACTION':
      return state
    default:
      return state
  }
}

export default basicReducer

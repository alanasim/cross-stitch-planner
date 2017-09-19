import { createSelector } from 'reselect'

const getSpaces = (state) => { return state.spaces }

const getRowIdx = (state, props) => { return props.rowIdx}
const getColIdx = (state, props) => { return props.colIdx}

export const makeGetSpace = () => {
  return createSelector(
    [getSpaces, getRowIdx, getColIdx],
    (spaces, rowIdx, colIdx) => {
      return spaces[rowIdx][colIdx]
  })
}

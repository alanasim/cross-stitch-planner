import { createSelector } from 'reselect'

const getSpaces = (state) => { return state.get('spaces') }

const getRowIdx = (state, props) => { return props.rowIdx}
const getColIdx = (state, props) => { return props.colIdx}

export const makeGetSpace = () => {
  return createSelector(
    [getSpaces, getRowIdx, getColIdx],
    (spaces, rowIdx, colIdx) => {
      return spaces.getIn([rowIdx, colIdx])
  })
}


export const makeGetXStitch = () => {
  return createSelector(
    [getSpaces, getRowIdx, getColIdx],
    (spaces, rowIdx, colIdx) => {
      return spaces.getIn([rowIdx, colIdx, 'xStitch'])
  })
}

export const makeGetSpaceColor = () => {
  return createSelector(
    [getSpaces, getRowIdx, getColIdx],
    (spaces, rowIdx, colIdx) => {
      return spaces.getIn([rowIdx, colIdx, 'color'])
  })
}

export const makeGetSpaceSelected = () => {
  return createSelector(
    [getSpaces, getRowIdx, getColIdx],
    (spaces, rowIdx, colIdx) => {
      return spaces.getIn([rowIdx, colIdx, 'selected'])
  })
}

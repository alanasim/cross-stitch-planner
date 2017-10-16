import { createSelector } from 'reselect'
import { List, Map } from 'immutable'

const getSpaces = (state) => { return state.get('spaces') }
const getTransform = (state) => { return state.get('transform') }

const getRowIdx = (state, props) => { return props.rowIdx}
const getColIdx = (state, props) => { return props.colIdx}

const getTransformXMoved = createSelector(getTransform, (transform) => {return transform.get('xMoved')})
const getTransformYMoved = createSelector(getTransform, (transform) => {return transform.get('yMoved')})
const getTransformDimension = createSelector(getTransform, (transform) => {return transform.get('dimension')})

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

export const getSelected = createSelector(getSpaces, (spaces) => {
  let selected = new List()
  spaces.forEach((row, rowIdx) => {
    row.forEach((space, colIdx) => {
      if (space.get('selected')) {
        selected = selected.push(space.merge(Map({rowIdx: rowIdx, colIdx: colIdx})))
      }
    })
  })
  return selected
})

export const getTranslatedSpaces = createSelector([getSelected, getTransformXMoved, getTransformYMoved],
  (selected, xMoved, yMoved, dimension) => {
  const translated = selected.map((space) => {
    return Map({
      rowIdx: space.get('rowIdx') + yMoved,
      colIdx: space.get('colIdx') + xMoved
    })
  })
  return translated
})

export const makeGetSpaceTranslateHovered = () => {
  return createSelector(
    [getTranslatedSpaces, getRowIdx, getColIdx],
    (translated, rowIdx, colIdx) => {
      const spaceCoords = Map({rowIdx: rowIdx, colIdx: colIdx})
      return translated.includes(spaceCoords)
  })
}

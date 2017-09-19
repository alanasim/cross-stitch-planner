export const toggleStitch = (rowIdx, colIdx) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'TOGGLE_STITCH',
      col: colIdx,
      row: rowIdx,
      color: getState().getIn(['tools', 'color'])
    })
  }
}

export const updateColorTool = (color) => {
  return {
    type: 'UPDATE_COLOR_TOOL',
    payload: color
  }
}

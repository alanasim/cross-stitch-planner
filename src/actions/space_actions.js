export const spaceClickAction = (rowIdx, colIdx) => {
  return (dispatch, getState) => {
    const currentTool = getState().getIn(['tools', 'tool'])

    if (currentTool === 'add') {
      dispatch({
        type: 'TOGGLE_STITCH',
        col: colIdx,
        row: rowIdx,
        color: getState().getIn(['tools', 'color'])
      })
    } else if (currentTool === 'select') {
      const space = getState().getIn(['spaces', rowIdx, colIdx])
      if (space.get('xStitch')) {
        dispatch({
          type: 'TOGGLE_SELECT',
          col: colIdx,
          row: rowIdx
        })
      }
    }
  }
}

export const updateColorTool = (color) => {
  return {
    type: 'UPDATE_COLOR_TOOL',
    payload: color
  }
}


export const updateTool = (tool) => {
  return {
    type: 'UPDATE_TOOL',
    payload: tool
  }
}

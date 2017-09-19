export const toggleStitch = (rowIdx, colIdx) => {
  return {
    type: 'TOGGLE_STITCH',
    col: colIdx,
    row: rowIdx
  }
}
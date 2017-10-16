import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as d3 from 'd3'
import { toJS, is, Map } from 'immutable'
import { makeGetXStitch, makeGetSpaceColor, makeGetSpaceSelected, getSelected, makeGetSpaceTranslateHovered } from '../selectors/space_selectors.js'
import { initializeTransform, updateTranslation } from '../actions/space_actions.js'
import { DragSource, DropTarget, DragLayer } from 'react-dnd';
import flow from 'lodash/flow';

const spaceSource = {
  beginDrag(props) {
    const info = {
      rowIdx: props.rowIdx,
      colIdx: props.colIdx,
      allSelected: props.allSelected,
      dimension: props.dimension
    };
    props.initializeTransform(info)
    return info
  },
  canDrag(props) {
    return props.selected
  }
};

const spaceTarget = {
  canDrop(props) {
    return true;
  },

  drop(props) {
    console.log(props.rowIdx, props.colIdx);
  }
};


function sourceCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource()
  };
}

function targetCollect(connect, monitor) {
  let xMoved, yMoved, translatedCoords
  const currentlyDragged = monitor.getItem()
  // if (currentlyDragged) {
  //   xMoved = monitor.getDifferenceFromInitialOffset() ? Math.floor(monitor.getDifferenceFromInitialOffset().x / currentlyDragged.dimension) : null
  //   yMoved = monitor.getDifferenceFromInitialOffset() ? Math.floor(monitor.getDifferenceFromInitialOffset().y / currentlyDragged.dimension) : null
  //   translatedCoords = currentlyDragged.allSelected.map((space) => {return Map({x: space.get('colIdx') + xMoved, y: space.get('rowIdx') + yMoved})})
  // }
  return {
    connectDropTarget: connect.dropTarget(),
    // offsetDiff: monitor.getDifferenceFromInitialOffset(),
    xOffset: monitor.getDifferenceFromInitialOffset() && monitor.getDifferenceFromInitialOffset().x,
    yOffset: monitor.getDifferenceFromInitialOffset() && monitor.getDifferenceFromInitialOffset().y,
    startPos: monitor.getInitialClientOffset(),
    dragged: monitor.getItem(),
    isOver: monitor.isOver()
    // xMoved: xMoved,
    // yMoved: yMoved,
    // currentlyHovered: translatedCoords
  }
}

function previewCollect(monitor) {
  return {
    isDragging: monitor.isDragging(),
    dragged: monitor.getItem()
  }
}

class CustomDragLayer {
  createPreview() {
    const { dragged } = this.props

  }
}


class Space extends React.Component {
  constructor() {
    super()

    this.spaceClickAction = this.spaceClickAction.bind(this)
  }

  shouldComponentUpdate() {
    return false
  }

  componentDidMount() {
    const {scale, className} = this.props
    const g = d3.select(this.gElem)

    const line = d3.line()
      .x(d => scale(d.x))
      .y(d => scale(d.y))

    g.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', scale(1))
      .attr('height', scale(1))
      .attr('fill', this.props.selected ? 'red' : 'transparent')

    g.append('path')
        .datum([{x: 0, y:0}, {x: 1, y: 1}])
        .attr('class', 'stitch-line ' + (className ? className : ''))
        .attr('d', line)
        .attr('key', 'stitch-a')

    g.append('path')
        .datum([{x: 0, y:1}, {x: 1, y: 0}])
        .attr('class', 'stitch-line ' + (className ? className : ''))
        .attr('d', line)
        .attr('key', 'stitch-b')
  }

  spaceClickAction() {
    const { rowIdx, colIdx } = this.props
    this.props.spaceClickAction(rowIdx, colIdx)
  }

  render() {
    return (
      <g ref={(g) => this.gElem = g} >
      </g>
      )
  }
}


class SpaceWrapper extends React.Component {
  constructor() {
    super()

    this.state = {
      keyIdx: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    // do the calc for xMoved yMoved here -- only set off action if xMoved yMoved changed
    if (nextProps.dragged && nextProps.isOver) {
      let newXMoved, newYMoved
      newXMoved = nextProps.xOffset ? Math.floor((nextProps.xOffset + nextProps.startPos.x % this.props.dimension) / this.props.dimension) : null
      newYMoved = nextProps.yOffset ? Math.floor((nextProps.yOffset + nextProps.startPos.y % this.props.dimension) / this.props.dimension) : null
      if (newXMoved !== this.props.xMoved || newYMoved !== this.props.yMoved) {
        this.props.updateTranslation(newXMoved, newYMoved)
      }
    }
  }

  spaceDragPreviewFill(props) {
    const {rowIdx, colIdx, x, y, dimension, dragged, isDragging, offsetDiff, startPos, xMoved, yMoved } = props

    if (!offsetDiff) {return false}
    const newDraggedPositions = dragged.allSelected.map(space => {
      return {x: Math.floor(space.get('colIdx') + xMoved), y: Math.floor(space.get('rowIdx') + yMoved)}
    })
    return newDraggedPositions.findIndex(newSpace => newSpace.x === colIdx && newSpace.y == rowIdx) > -1
  }



  render() {
    const { connectDragSource, connectDropTarget, rowIdx, colIdx, x, y, dimension, dragged, isDragging, startPos, xMoved, yMoved, currentlyHovered } = this.props
    const { keyIdx } = this.state

    const dragStart = dragged ? {x: dragged.colIdx, y: dragged.rowIdx} : null

    if (!!xMoved) {

    console.log('xmoved', xMoved, 'yMoved', yMoved)
    }

    const currentCoords = Map({x: colIdx, y: rowIdx})

    const bgColor = () => {
      if (!dragged && this.props.selected) {
        return 'red'
      } else if (this.props.hovered) {
        return 'pink'
      } else {
        return 'transparent'
      }
    }

    const style = {
      position: 'absolute',
      width: `${dimension}px`,
      height: `${dimension}px`,
      left: `${x}px`,
      top: `${y}px`,
      backgroundColor: bgColor()
    }
    return (
      connectDragSource(connectDropTarget(
        <div style={style} key={'space' + rowIdx + '-' + colIdx} >
        </div>
      ))
    )
  }
}

const makeMapStateToProps = () => {
  const getSpaceStitch = makeGetXStitch()
  const getSpaceColor = makeGetSpaceColor()
  const getSpaceSelected = makeGetSpaceSelected()
  const getSpaceHovered = makeGetSpaceTranslateHovered()
  const mapStateToProps = (state, props) => {
    return {
      stitch: getSpaceStitch(state, props),
      color: getSpaceColor(state, props),
      selected: getSpaceSelected(state, props),
      hovered:  getSpaceHovered(state, props),
      allSelected: getSelected(state)
    }
  }
  return mapStateToProps
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateTranslation: bindActionCreators(updateTranslation, dispatch),
    initializeTransform: bindActionCreators(initializeTransform, dispatch)
  }
}

const SpaceWithData = connect(makeMapStateToProps(), mapDispatchToProps)(
  flow(
    DragSource('selection', spaceSource, sourceCollect),
    DropTarget('selection', spaceTarget, targetCollect)
  )(SpaceWrapper)
)



export default class TransformLayer extends React.Component {
  renderSpaces() {
    const { scale, width, height, threadCount } = this.props

    const increment = scale.x(1/threadCount)
    const colCount = threadCount * width
    const rowCount = threadCount * height

    const spaceScale = d3.scaleLinear()
      .range([0, increment])
      .domain([0, 1])


    let spaces = []
    for (let rowIdx = 0; rowIdx < rowCount; rowIdx++) {
      for (let i = 0; i < colCount; i++) {
        spaces.push(<SpaceWithData key={'layer' + rowIdx + '-' + i} scale={spaceScale} rowIdx={rowIdx} colIdx={i} x={increment*i} y={increment*rowIdx} dimension={increment} />)
      }
    }
    return spaces
  }

  render() {
    const spaces = this.renderSpaces()
    return (
      <div style={{position: 'absolute', top: 0, left: 0}}>
        {spaces}
      </div>
    )
  }

}


// <svg key={'spc' + rowIdx + '-' + colIdx} x={x} y={y} width={dimension} height={dimension} >
//   <g className={`space dmc-${props.color} ${props.selected ? 'selected ' : ''}` + (props.stitch ? 'stitch--x' : 'stitch--blank')} >
//     <Space {...props} />
//   </g>
// </svg>
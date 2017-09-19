import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as d3 from 'd3'
import { toJS } from 'immutable'
import { makeGetXStitch, makeGetSpaceColor } from '../selectors/space_selectors.js'
import { toggleStitch } from '../actions/space_actions.js'

class Space extends React.Component {
  constructor() {
    super()

    this.toggleStitch = this.toggleStitch.bind(this)
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
      .attr('fill', 'transparent')

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

  toggleStitch() {
    const { rowIdx, colIdx } = this.props
    this.props.toggleStitch(rowIdx, colIdx)
  }

  render() {
    return (
      <g ref={(g) => this.gElem = g} onClick={this.toggleStitch} >
      </g>
      )
  }
}

function SpaceWrapper(props) {
  return (
    <g className={`space dmc-${props.color} ` + (props.stitch ? 'stitch--x' : 'stitch--blank')} >
      <Space {...props} />
    </g>
    )
}

const makeMapStateToProps = () => {
  const getSpaceStitch = makeGetXStitch()
  const getSpaceColor = makeGetSpaceColor()
  const mapStateToProps = (state, props) => {
    return {
      stitch: getSpaceStitch(state, props),
      color: getSpaceColor(state, props)
    }
  }
  return mapStateToProps
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleStitch: bindActionCreators(toggleStitch, dispatch)
  }
}

const SpaceWithData = connect(makeMapStateToProps(), mapDispatchToProps)(SpaceWrapper)



export default class Spaces extends React.Component {
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
        spaces.push(<svg key={'spc' + rowIdx + '-' + i} x={increment*i} y={increment*rowIdx} width={increment} height={increment} >
            <SpaceWithData scale={spaceScale} rowIdx={rowIdx} colIdx={i} />
          </svg>)
      }
    }
    return spaces
  }

  render() {
    const spaces = this.renderSpaces()
    return (
      <g>
        {spaces}
      </g>
    )
  }

}

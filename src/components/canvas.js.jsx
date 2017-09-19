import React from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3'
import { toJS } from 'immutable'

import { LineGrid, DotGrid } from './grids.js.jsx'
import Spaces from './spaces.js.jsx'

class Canvas extends React.Component {
  constructor() {
    super()
  }

  render() {
    const { width, height, margin, threadCount } = this.props

    const pixelWidth = width * 50
    const pixelHeight = height * 50

    const scaleX = d3.scaleLinear()
      .range([0, 600])
      .domain([0, width])
    const scaleY = d3.scaleLinear()
      .range([0, 400])
      .domain([0, height])
    const scale = {
      x: scaleX,
      y: scaleY
    }    

    return(
      <div>
        <div style={{width: 700, height: 500, border: '1px dotted orange'}}>
          <svg width="600" height="400" viewbox="0 0 600 400">
            <DotGrid scale={scale} width={width} height={height} threadCount={threadCount} />
            <Spaces scale={scale} width={width} height={height} threadCount={threadCount} />
          </svg>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const canvas = state.get('canvas')
  return {
    margin: canvas.get('margin'),
    threadCount: canvas.get('threadCount'),
    width: canvas.get('width'),
    height: canvas.get('height')
  }
}

export default connect(mapStateToProps)(Canvas)

import React from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3'

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
      .range([0, 1200])
      .domain([0, width])
    const scaleY = d3.scaleLinear()
      .range([0, 800])
      .domain([0, height])
    const scale = {
      x: scaleX,
      y: scaleY
    }    

    return(
      <div>
        <div style={{width: 1300, height: 900, border: '1px dotted orange'}}>
          <svg width="1200" height="800" viewbox="0 0 1200 800">
            <DotGrid scale={scale} width={width} height={height} threadCount={threadCount} />
            <Spaces scale={scale} width={width} height={height} threadCount={threadCount} />
          </svg>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    margin: state.margin,
    threadCount: state.threadCount,
    width: state.width,
    height: state.height
  }
}

export default connect(mapStateToProps)(Canvas)

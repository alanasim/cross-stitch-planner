import React from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3'

import { LineGrid } from './grids.js.jsx'

class Canvas extends React.Component {
  constructor() {
    super()
  }

  render() {
    const { width, height, margin, threadCount } = this.props

    const pixelWidth = width * 50
    const pixelHeight = height * 50

    const scaleX = d3.scaleLinear()
      .range([0, 900])
      .domain([0, width])
    const scaleY = d3.scaleLinear()
      .range([0, 600])
      .domain([0, height])
    const scale = {
      x: scaleX,
      y: scaleY
    }    

    return(
      <div>
        <div style={{width: 1000, height: 700, border: '1px dotted orange'}}>
          <svg width="900" height="600">
            <LineGrid scale={scale} width={width} height={height} threadCount={threadCount} />
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

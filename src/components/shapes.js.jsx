import React from 'react'
import * as d3 from 'd3'

export class Line extends React.Component {
  componentDidMount() {
    const {scale, coords, className} = this.props
    const g = d3.select(this.gElem)

    const line = d3.line()
      .x(d => scale.x(d.x))
      .y(d => scale.y(d.y))

    g.append('path')
        .datum(coords)
        .attr('class', 'line ' + (className ? className : ''))
        .attr('d', line)
  }

  render() {

    return (
      <g ref={(g) => this.gElem = g}>
      </g>
    )
  }

}

export class Dot extends React.Component {
  componentDidMount() {
    const {scale, coords, className} = this.props
    const g = d3.select(this.gElem)

    g.append('g')
      .attr('class', 'dot ' + className)
      .selectAll("circle")
      .data([coords])
      .enter()
      .append("circle")
      .attr("cx", d => scale.x(d.x))
      .attr("cy", d => scale.y(d.y))
      .attr("r", 0.5)
  }

  render() {
    return (
      <g ref={(g) => this.gElem = g}>
      </g>
    )
  }
}
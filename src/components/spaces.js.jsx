import React from 'react'
import * as d3 from 'd3'

class Space extends React.Component {
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

  render() {
    return (
      <g ref={(g) => this.gElem = g} className="g-el">
      </g>
      )
  }
}

export default class Spaces extends React.Component {
  renderSpaces() {
    const { scale, width, height, threadCount } = this.props

    const increment = scale.x(1/threadCount)
    const spaceCount = threadCount * width

    const spaceScale = d3.scaleLinear()
      .range([0, increment])
      .domain([0, 1])


    let spaces = []
    for (let i = 0; i < spaceCount; i++) {
      spaces.push(<svg x={increment*i} y={0} width={increment} height={increment} className="space" ><Space scale={spaceScale} /></svg>)
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

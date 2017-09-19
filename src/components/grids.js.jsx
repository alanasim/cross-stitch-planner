import React from 'react';
import { Line } from './shapes.js.jsx'

export class LineGrid extends React.Component {
  render() {
    const { width, height, scale, threadCount } = this.props
    const increment = 1 / threadCount
    
    let verticalLines = []
    for (let i = 0; i <= width; i++) {
      const coords = [{x: i, y: 0}, {x: i, y: height}]
      const line = <Line key={"v" + i} scale={scale} coords={coords}/>
      verticalLines.push(line)
      for (let idx = 1; idx < threadCount; idx++) {
        const xPos = i + idx*increment
        const smallCoords = [{x: xPos, y: 0}, {x: xPos, y: height}]
        const smallLine = <Line key={xPos} scale={scale} coords={smallCoords} className={"line--small"}/>
        verticalLines.push(smallLine)
      }
    }
    let horizontalLines = []
    for (let i = 0; i <= height; i++) {
      const coords = [{x: 0, y: i}, {x: width, y: i}]
      const line = <Line key={"h" + i} scale={scale} coords={coords} />
      horizontalLines.push(line)
      for (let idx = 1; idx < threadCount; idx++) {
        const yPos = i + idx*increment
        const smallCoords = [{x: 0, y: yPos}, {x: width, y: yPos}]
        const smallLine = <Line key={yPos} scale={scale} coords={smallCoords} className={"line--small"}/>
        horizontalLines.push(smallLine)
      }
    }
    return (
      <g className="grid-lines">
        {verticalLines}
        {horizontalLines}
      </g>
      )
  }
}
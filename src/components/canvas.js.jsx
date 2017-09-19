import React from 'react'
import { connect } from 'react-redux'

class Canvas extends React.Component {
  constructor() {
    super()
  }

  render() {
    const { width, height, margin, threadCount } = this.props

    const pixelWidth = width * 50
    const pixelHeight = height * 50

    return(
      <div>
        <div style={{width: pixelWidth, height: pixelHeight, border: '1px dotted orange'}}>
          cranvas
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

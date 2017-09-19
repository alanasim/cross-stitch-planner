import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as d3 from 'd3'
import { toJS } from 'immutable'

import { LineGrid, DotGrid } from './grids.js.jsx'
import { updateTool } from '../actions/space_actions.js'

class ToolPicker extends React.Component {
  constructor() {
    super()

    this.handleChoice = this.handleChoice.bind(this)
  }

  handleChoice(toolName) {
    this.props.updateTool(toolName)
  }

  render() {
    const { selectedTool } = this.props

    return(
        <div style={{width: 150, height: 200, border: '1px dashed red', display: 'inline-block'}}>
          <b>Current:</b> {selectedTool}
          <div className="btn" onClick={() => {this.handleChoice('add')}}>Add / Remove</div>
          <div className="btn" onClick={() => {this.handleChoice('select')}}>Select</div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedTool: state.getIn(['tools', 'tool'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateTool: bindActionCreators(updateTool, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolPicker)

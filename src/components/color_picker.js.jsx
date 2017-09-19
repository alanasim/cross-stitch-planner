import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as d3 from 'd3'
import { toJS } from 'immutable'

import { LineGrid, DotGrid } from './grids.js.jsx'
import { updateColorTool } from '../actions/space_actions.js'
import colors from '../constants/dmc_colors.js'

class ColorPicker extends React.Component {
  constructor() {
    super()

    this.handleChoice = this.handleChoice.bind(this)
  }

  handleChoice(colorCode) {
    this.props.updateColorTool(colorCode)
  }

  render() {
    const { selectedColor } = this.props
    const selectedData = colors.filter(c => c.dmcCode === selectedColor)[0]
    const colorChoices = colors.map((colorData, idx) => {
      return (<div style={{width: '30px', height: '30px', display: 'inline-block', backgroundColor: colorData.hex}}
                onClick={() => {this.handleChoice(colorData.dmcCode)}}></div>)
    })

    return(
      <div>
        <div style={{width: 300, height: 500, border: '1px dashed red', display: 'inline-block'}}>
          <div style={{height: '40px', width: '100%', backgroundColor: selectedData.hex}}></div>
          {colorChoices}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedColor: state.getIn(['tools', 'color'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateColorTool: bindActionCreators(updateColorTool, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorPicker)

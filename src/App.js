import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import Canvas from './components/canvas.js.jsx'
import ColorPicker from './components/color_picker.js.jsx'
import ToolPicker from './components/tool_picker.js.jsx'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Canvas />
        <ToolPicker />
        <ColorPicker />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);

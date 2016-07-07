import React from 'react'
import Toolbar from '../containers/Toolbar.jsx'
import NoteList from '../containers/NoteList.jsx'
import RenderNote from '../containers/RenderNote.jsx'

export class App extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <div className="app">
        <Toolbar />
        <NoteList />
        <RenderNote />
      </div>
    )
  }
}

export default App

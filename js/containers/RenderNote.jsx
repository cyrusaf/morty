import React from 'react'
import { connect } from 'react-redux'
import { NoteEditor } from '../components/NoteEditor.jsx'
import { updateNote } from '../actions/actions'
import ReactMarkdown from 'react-markdown'

class RenderNote extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    // If no note selected
    if (this.props.active_note == null) {
      return (
        <div className="rendernote">
          no note selected
        </div>
      )
    }

    // Get note data
    let note = this.props.notes[this.props.active_note]

    switch(this.props.view_mode) {
      case 'TEXT':
        return (
          <NoteEditor
            id={note.id}
            content={note.content}
            updateNote={this.props.updateNote}
            softBreak="br"/>
        )
        break
      case 'MARKDOWN':
        return (
          <ReactMarkdown
            className="rendernote"
            source={note.content}
            />
        )
        break
    }
  }
}

const mapStateToProps = (state) => {
  return {
    active_note: state.active_note,
    notes: state.notes,
    view_mode: state.view_mode
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateNote: (id, content) => {
      dispatch(updateNote(id, content))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RenderNote)

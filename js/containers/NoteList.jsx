import React from 'react'
import { connect } from 'react-redux'
import { loadNotesFromDisk, selectNote } from '../actions/actions'
import { NoteListItem } from '../components/NoteListItem.jsx'

class NoteList extends React.Component {
  constructor(props) {
    super(props)
    this.props.loadNotes()
  }

  render() {
    let notes = Object.keys(this.props.notes).map((id) => {
      let note = this.props.notes[id]
      return note
    })

    notes.sort(function(a, b) {
      if (a.date_updated < b.date_updated)
        return 1
      else if (a.date_updated > b.date_updated)
        return -1
      else
        return 0
    })

    notes = notes.map((note) => {
      return (
        <NoteListItem
          key={note.id}
          id={note.id}
          content={note.content}
          date_updated={note.date_updated}
          active={note.id == this.props.active_note ? true : false}
          selectNote={this.props.selectNote} />
      )
    })

    return (
      <div className="notelist">
        {notes}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notes: state.notes,
    active_note: state.active_note
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadNotes: () => {
      dispatch(loadNotesFromDisk())
    },
    selectNote: (id) => {
      dispatch(selectNote(id))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteList)

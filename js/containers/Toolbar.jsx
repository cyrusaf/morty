import React from 'react'
import { connect } from 'react-redux'
import { newNote, deleteNote, toggleViewMode } from '../actions/actions'

const remote = window.require('electron').remote

// import {fetchAllPlayers, selectPlayer} from '../actions/actions'
// import PlayerSelectorItem from '../components/PlayerSelectorItem.jsx'

class Toolbar extends React.Component {
  constructor(props) {
    super(props)

    this.deleteActiveNote = this.deleteActiveNote.bind(this)
  }

  closeWindow() {
    let window = remote.getCurrentWindow()
    window.close()
  }

  minimizeWindow() {
    let window = remote.getCurrentWindow()
    window.minimize()
  }

  maximizeWindow() {
    let window = remote.getCurrentWindow()
    if (!window.isMaximized()) {
      window.maximize();
    } else {
      window.unmaximize();
    }
  }

  deleteActiveNote() {
    if (this.props.active_note == null) {
      return
    }
    this.props.deleteNote(this.props.active_note)
  }

  render() {

    let deletebtn_classes = ['tool-btn']
    if (this.props.active_note == null) {
      deletebtn_classes.push('disabled')
    }

    return (
      <div className="toolbar">
        <div className="left">

          <div
            className="win-btn win-btn-close"
            onClick={this.closeWindow}>
          </div>

          <div
            className="win-btn win-btn-minimize"
            onClick={this.minimizeWindow}>
          </div>

          <div
            className="win-btn win-btn-maximize"
            onClick={this.maximizeWindow}>
          </div>

          <div
            className="tool-btn"
            onClick={this.props.newNote}>
            <i className="fa fa-pencil" aria-hidden="true"></i>
          </div>

          <div
            className={deletebtn_classes.join(" ")}
            onClick={this.deleteActiveNote}>
            <i className="fa fa-trash" aria-hidden="true"></i>
          </div>

        </div>
        <div className="right">
        <div
          className={deletebtn_classes.join(" ")}
          onClick={this.props.toggleViewMode}>
          <i className="fa fa-eye" aria-hidden="true"></i>
        </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    active_note: state.active_note
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    newNote: () => {
      dispatch(newNote())
    },
    deleteNote: (id) => {
      dispatch(deleteNote(id))
    },
    toggleViewMode: () => {
      dispatch(toggleViewMode())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar)

import shortid from 'shortid'

const remote = window.require('electron').remote
const root_dir = remote.process.env.HOME + "/.morty"
const fs = remote.require('fs')

export function newNote() {
  return (dispatch) => {
    let id = shortid.generate()

    let note = {
      date_updated: Date.now(),
      content: "",
      id
    }

    fs.writeFileSync(`${root_dir}/${id}.md`, JSON.stringify(note))
    dispatch(setViewMode('TEXT'))
    dispatch(loadNotesFromDisk())
  }
}

export const LOAD_NOTES = 'LOAD_NOTES'
function loadNotes(notes) {
  return {
    type: LOAD_NOTES,
    notes
  }
}

export function loadNotesFromDisk() {
  return (dispatch) => {
    // Load notes from file system
    let notes = []

    fs.readdir(root_dir, function(err, files) {
      if (err) throw new Error("Can't load notes from disk...")

      for (let file of files) {
        if (file == 'config.json') { continue }
        let note = JSON.parse(fs.readFileSync(`${root_dir}/${file}`, 'utf8'))
        notes.push(note)
      }

      dispatch(loadNotes(notes))

      if (notes.length > 0) {
        dispatch(selectNote(notes[0].id))
      } else {
        dispatch(selectNote(null))
      }

    })
  }
}

export const UPDATE_NOTE = 'UPDATE_NOTE'
export function updateNote(id, content) {

  let note = {
    date_updated: Date.now(),
    content,
    id
  }

  // Asynchronously save note to filesystem
  fs.writeFile(`${root_dir}/${id}.md`, JSON.stringify(note), function(err) {
    if (err) throw new Error("Could not save note with id: " + id)
  })


  return {
    type: UPDATE_NOTE,
    note
  }
}

export const SET_ACTIVE_NOTE = 'SET_ACTIVE_NOTE'
export function selectNote(id) {
  return {
    type: SET_ACTIVE_NOTE,
    id
  }
}

export const SET_VIEW_MODE =  'SET_VIEW_MODE'
function setViewMode(view_mode) {
  return {
    type: SET_VIEW_MODE,
    view_mode
  }
}

export const TOGGLE_VIEW_MODE =  'TOGGLE_VIEW_MODE'
export function toggleViewMode() {
  return {
    type: TOGGLE_VIEW_MODE
  }
}

export function deleteNote(id) {
  return (dispatch) => {
    fs.exists(`${root_dir}/${id}.md`, function(exists) {
      if(exists) {
        fs.unlink(`${root_dir}/${id}.md`)
        dispatch(selectNote(null))
        dispatch(loadNotesFromDisk())
      }
    })
  }
}

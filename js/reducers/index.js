import { NEW_NOTE, UPDATE_NOTE, LOAD_NOTES, SET_ACTIVE_NOTE,
  TOGGLE_VIEW_MODE, SET_VIEW_MODE } from '../actions/actions'

function reducer(state = {
    active_note: null,
    notes: [],
    view_mode: 'MARKDOWN'
  }, action) {

  let notes = null
  let view_mode = null
  switch(action.type) {
    case LOAD_NOTES:
      notes = {}
      for (let note of action.notes) {
        notes[note.id] = note
      }
      return Object.assign({}, state, {
        notes: notes
      })
      break
    case SET_ACTIVE_NOTE:
      view_mode = 'MARKDOWN'
      if (action.id != null) {
        if (state.notes[action.id].content.replace(/ /g, "") == "") {
          view_mode = 'TEXT'
        }
      }
      return Object.assign({}, state, {
        active_note: action.id,
        view_mode
      })
      break
    case UPDATE_NOTE:
      notes = Object.assign({}, state.notes, {[action.note.id]: action.note})
      return Object.assign({}, state, {
        notes
      })
      break
    case TOGGLE_VIEW_MODE:
      view_mode = 'TEXT'
      if (state.view_mode == 'TEXT') {
        view_mode = 'MARKDOWN'
      }
      return Object.assign({}, state, {
        view_mode
      })
      break
    case SET_VIEW_MODE:
      return Object.assign({}, state, {
        view_mode: action.view_mode
      })
      break
    default:
      return state
  }
}

export default reducer

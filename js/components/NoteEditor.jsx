import React from 'react'

export class NoteEditor extends React.Component {
  constructor(props) {
    super(props)

    this.updateNote = this.updateNote.bind(this)
  }

  componentDidMount() {
    this.refs.textarea.focus()
  }

  componentDidUpdate() {
    this.refs.textarea.focus()
  }

  updateNote(event) {
    this.props.updateNote(this.props.id, event.target.value)
  }

  render() {
    return (
      <textarea
        className="rendernote"
        value={this.props.content}
        onChange={this.updateNote}
        ref="textarea">
      </textarea>
    )
  }
}

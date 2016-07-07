import React from 'react'

function timeSince(timeStamp) {
  if (timeStamp == null) { return "" }
  timeStamp = new Date(timeStamp)
  var now = new Date(),
    secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
  if(secondsPast < 60){
    return parseInt(secondsPast) + 's';
  }
  if(secondsPast < 3600){
    return parseInt(secondsPast/60) + 'm';
  }
  if(secondsPast <= 86400){
    return parseInt(secondsPast/3600) + 'h';
  }
  if(secondsPast > 86400){
      day = timeStamp.getDate();
      month = timeStamp.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ","");
      year = timeStamp.getFullYear() == now.getFullYear() ? "" :  " "+timeStamp.getFullYear();
      return day + " " + month + year;
  }
}

export class NoteListItem extends React.Component {
  constructor(props) {
    super(props)

    this.selectNote = this.selectNote.bind(this)
  }

  selectNote() {
    if (this.props.active) { return }
    this.props.selectNote(this.props.id)
  }


  render() {
    let classes = ['notelist-item']
    if (this.props.active) {
      classes.push('active')
    }

    let line1 = "Untitled"
    let line2 = `Updated ${timeSince(this.props.date_updated)} ago`
    if (this.props.content != "") {
      line1 = this.props.content.split("\n")[0]
      while (line1.charAt(0) == '#') {
        line1 = line1.substring(1, line1.length)
      }
      if (line1.replace(/ /g, "") == "") { line1 = "Untitled"}
      if (line1.length > 20) { line1 = line1.substring(0,20) }
    }
    return (
      <div
        className={classes.join(" ")}
        onClick={this.selectNote}>

        <div className="note-title">{line1}</div>
        <div className="note-caption">{line2}</div>

      </div>
    )
  }
}

import React from 'react'
import fire from '../config/Fire'

class NewEmoji extends React.Component {
  constructor(props) {
    super(props);
    this.handleFindNewEmoji = this.handleFindNewEmoji.bind(this);
  }


  handleFindNewEmoji() {
    // jump to Camera
    console.log("test");
    this.props.history.push("./Camera");
  }

  render () {
    return (
      <div className="new-room-form">
        <form>
          <button onClick={this.handleFindNewEmoji} type="button">+emote</button>
        </form>
      </div>
    )
  }
}

export default NewEmoji
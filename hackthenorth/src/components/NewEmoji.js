import React from 'react'
import fire from '../config/Fire'

class NewEmoji extends React.Component {
  constructor(props) {
    super(props);
    this.handleFindNewEmoji = this.handleFindNewEmoji.bind(this);
  }


  handleFindNewEmoji() {
    var userId = fire.auth().currentUser.uid;

    fire.database().ref('/users/' + userId).once('value').then(snap => {
      var newAr = snap.val().emo;
      newAr.unshift(2);
      fire.database().ref('users/' + userId).set({
        emo: newAr,
        chatting: snap.val().chatting,
        history: snap.val().history,
      });
    });
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
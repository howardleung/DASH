import React from 'react'
import fire from '../config/Fire'

class NewChatForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleFindNewUser = this.handleFindNewUser.bind();
  }


  handleFindNewUser() {
    var userId = fire.auth().currentUser.uid;

    var cemo;
    fire.database().ref('/users/' + userId).once('value').then(snap => {
      console.log(snap.val());
      cemo = snap.val().emo[0];
      fire.database().ref().child('users').once('value').then(snapshot => {
        for (var key in snapshot.val()) {
          var inHistory = false;
          for (var i = 0; i < snap.val().history.length; i++) {
            if (snap.val().history[i] === key) {
              inHistory = true;
            }
          }
          if(snapshot.val()[key].emo[0] === cemo && key !== userId && !inHistory){
            // eslint-disable-next-line
            fire.database().ref('/chats/').once('value').then(mesSnap => {
              var newKey = Object.keys(mesSnap.val()).length;
              var newChat1 = snap.val().chatting;
              newChat1.push({chatKey: newKey, to: key});
              var newChat2 = snapshot.val()[key].chatting;
              newChat2.push({chatKey: newKey, to: userId});

              var newHistory1 = snap.val().history;
              newHistory1.push(key);
              var newHistory2 = snapshot.val()[key].history;
              newHistory2.push(userId);
              fire.database().ref('users/' + userId).set({
                history: newHistory1,
                emo: snap.val().emo,
                chatting: newChat1,
              });
              fire.database().ref('users/' + key).set({
                history: newHistory2,
                emo: snapshot.val()[key].emo,
                chatting: newChat2,
              });
              fire.database().ref('chats/' + newKey).set({
                messages: [-1]
              })
            });
            return;
          }
        }
        console.log("nothing found");
      });
    });
    
  }

  render () {
    return (
      <div className="new-room-form">
        <form>
          <button onClick={this.handleFindNewUser} type="button">+chat</button>
        </form>
      </div>
    )
  }
}

export default NewChatForm
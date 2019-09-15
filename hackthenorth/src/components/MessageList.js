import React from 'react'
import fire from '../config/Fire'

class MessageList extends React.Component {

	constructor(props){
    super(props);
    
    this.state = {
      chats: [],
    }
  }


  componentDidMount(){
    var userId = fire.auth().currentUser.uid;
    
    fire.database().ref('/users/' + userId).once('value').then(usrsnap => {
      if(usrsnap.val().chatting.length - 1 !== 0){
        
        // console.log(usrsnap.val().chatting[(usrsnap.val().chatting.length -1)]);
        fire.database().ref('chats/' + usrsnap.val().chatting[(usrsnap.val().chatting.length -1)].chatKey).on('value',snap => {

          this.setState({
            chats : snap.val().messages,
          });
        });
      }
      
    });
    
    
  }


  render() {
    return (
      <div className="message-list">
        {this.state.chats.map((message, index) => {
          return (
            <div key={index} className="message">
              <div className="message-username">{message.sender}</div>
              <div className="message-text">{message.message}</div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default MessageList
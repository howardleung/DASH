
import React from 'react'
import fire from '../config/Fire'

class SendMessageForm extends React.Component {
	constructor(props) {
		super(props);
		this.handleChangeMessage = this.handleChangeMessage.bind(this);
		this.send = this.send.bind(this);
    this.state = {
			message: ""
    };
	}

	handleChangeMessage(e) {
    this.setState({message : e.target.value });
	}

	send(e) {
		var userId = fire.auth().currentUser.uid;
    fire.database().ref('/users/' + userId).once('value').then(usrsnap => {
      if(usrsnap.val().chatting.length - 1 !== 0){
				console.log(usrsnap.val().chatting[(usrsnap.val().chatting.length - 1)].chatKey);

        fire.database().ref('chats/' + usrsnap.val().chatting[(usrsnap.val().chatting.length -1)].chatKey).once('value').then(getMes=>{
					
					var bfor = getMes.val().messages;
					
					bfor.push({message: this.state.message, sender: userId});
					fire.database().ref('chats/' + usrsnap.val().chatting[(usrsnap.val().chatting.length -1)].chatKey).set({
						messages: bfor,
					});
					this.setState({message : ""})
				});
        
      }
      
		});
		
	}
	
	render() {
		return (
			<form className="send-message-form">
				<div>
					<label>send: </label>
					<input value={this.state.message} onChange={this.handleChangeMessage} className="message" placeholder="message" />
				</div>
				<button type="button" onClick={this.send} className="btn btn-primary">send</button>
			</form>
		)
	}
}

export default SendMessageForm
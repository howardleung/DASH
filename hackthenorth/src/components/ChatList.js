import React from 'react';
import fire from '../config/Fire'



class ChatList extends React.Component {

	constructor(props){
    super(props);
    
    this.state = {
      chats: [],
    }
  }

	componentDidMount(){
		var userId = fire.auth().currentUser.uid;
		

		fire.database().ref().child('chats').on('value',snap => {
			fire.database().ref('/users/' + userId).once('value').then(usrsnap => {
				var newChat = []
				for(var j = 0; j < snap.val().length; j++){
					for (var i = 0; i < usrsnap.val().chatting.length; i++) {
						if(usrsnap.val().chatting[i].chatKey === j){
							newChat.push({messageIndex: j, user: usrsnap.val().chatting[i].to});
						}
					}
				}
				this.setState({
					chats : newChat,
				});
			});
		});
		
	}

	render () {			
		return (
			<div className="rooms-list">
				<div className="help-text">ChatList</div>
				{this.state.chats.map((message, index) => {
					
					return (
						<div key={index} className="message">
							<div className="message-username">{message.user}</div>
						</div>
					)
					
          
        })}
			</div>
		)
	}
}

export default ChatList
import React from 'react';
import fire from '../config/Fire'



class EmojiPanel extends React.Component {

	constructor(props){
    super(props);
    
    this.state = {
      chats: [],
    }
  }

	componentDidMount(){
		var userId = fire.auth().currentUser.uid;
		

		fire.database().ref('/users/' + userId + '/emo').on('value',snap => {
      
      
      this.setState({
        chats : snap.val(),
      });
			
		});
		
	}

	render () {			
		return (
			<div className="rooms-list">
				<div className="help-text">past emotion</div>
				{this.state.chats.map((message, index) => {
					if(message !== -1){
            return (
              <div key={index} className="message">
                <div className="message-username">{message}</div>
              </div>
            )
          }
          return (
            <div key={index} className="message">
              <div className="message-username"></div>
            </div>
          );
          
        })}
			</div>
		)
	}
}

export default EmojiPanel
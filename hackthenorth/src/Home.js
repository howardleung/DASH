import React, { Component } from 'react';
import fire from './config/Fire'
import ChatList from './components/ChatList'
import NewChatform from './components/NewChatForm'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import EmojiPanel from './components/EmojiPanel'
import NewEmoji from './components/NewEmoji'

class Home extends Component {
  constructor(props){
    super(props);
    
    this.logout = this.logout.bind(this);
    this.state = {
      user: props.user,
      speed: 10,
    }
  }

  componentDidMount(){
    
    // fire.database().ref().child('speed').on('value',snap => {
    //   console.log("value: "+ snap.val());
    //   this.setState({
    //     speed: snap.val()
    //   });
    // });
  }

  logout() {
    fire.auth().signOut();
    this.props.history.push("/Login");
  }

  render() {
    return (
      <div className="app">
        <ChatList {...this.props} />
        <MessageList {...this.props} />
        <SendMessageForm {...this.props} />
        <NewChatform {...this.props} />
        <EmojiPanel {...this.props} />
        <NewEmoji {...this.props} />
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default Home;

import React, { Component } from 'react';
import Camera from './Camera'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      camera_data: "",
    }
  }

  render() {
    return (
      <div className="App">
        <Camera />
      </div>
    )
  }
}

export default App;
  /*
  constructor(props){
    super(props);
    this.state = {
      user:{},
    }
  }

  componentDidMount(){
    this.authListener();
  }

  authListener(){
    fire.auth().onAuthStateChanged((user)=>{
      console.log(user);
      if(user){
        this.setState({user});
        localStorage.setItem('user', user.uid);

      }else {
        this.setState({user: null});
        localStorage.removeItem('user');
      }
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.user ? (<Home />) : (<Login />)}
      </div>
    );
  }
}
*/

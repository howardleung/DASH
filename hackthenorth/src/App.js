import React, {Component} from 'react';
import './App.css';
import fire from './config/Fire';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user:{},
    }
  }

  componentDidMount(){
    this.authListener();
  }


  authListener() {
    fire.auth().onAuthStateChanged((u) => {
      //console.log(user);
      if (u) {
        this.setState({ user: u });
        //localStorage.setItem('user', user.uid);
        
      } else {
        this.setState({ user: null });
        //localStorage.removeItem('user');
        console.log("gologin")
        this.props.history.push("/Login");
        return;
      }
      this.props.history.push("/Home");
      
      //{this.state.user ? (<Home/>) : (<Login/>)}
    });
  }

  render(){
    return (
      <div className="App">
        splash
      </div>
    );
  }
}

export default App;

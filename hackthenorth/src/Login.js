import React, { Component } from 'react';
import fire from './config/Fire';

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      email: '',
      password: ''
    };
  }

  

  handleChangeName(e) {
    this.setState({email : e.target.value });
  }

  handleChangePassword(e) {
    
    this.setState({password : e.target.value });
  }

  login(e) {
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
      console.log(u);
      this.props.history.push("/Home");
    }).catch((error) => {
      console.log(error);
    });
    
  }

  signup(e){
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
      console.log(u);
      
      fire.database().ref('users/' + u.user.uid).set({
        emo: [-1],
        chatting: [-1],
        history: [-1],
      });
      this.props.history.push("/Home");
    })
    .catch((error) => {
      console.log(error);
    })

  }
  render() {
    return (
      <div>
        <form>
          <div>
            <label >Email address</label>
            <input value={this.state.email} onChange={this.handleChangeName} type="email" className="email" id="exampleInputEmail1" placeholder="Enter email" />
          </div>
          <div>
            <label>Password</label>
            <input value={this.state.password} onChange={this.handleChangePassword} type="password" className="password" id="exampleInputPassword1" placeholder="Password" />
          </div>
          <button type="button" onClick={this.login} className="btn btn-primary">Login</button>
          <button type="button" onClick={this.signup} style={{marginLeft: '25px'}} className="btn btn-success">Signup</button>
        </form>
      </div>
    );
  }
}
export default Login;

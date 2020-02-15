import React, { Component } from 'react';
import fire from './config/Fire';
import './css/main.css';
import './css/util.css';
import './vendor/select2/select2.min.css';
import './vendor/css-hamburgers/hamburgers.min.css';
import './vendor/animate/animate.css';
import './fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './vendor/bootstrap/css/bootstrap.min.css';
import './images/icons/favicon.ico';


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
      <body>
      <script src="./js/main.js"></script>
	
        <div className="limiter">
          <div className="container-login100">
            <div className="wrap-login100">
              <div className="login100-pic js-tilt" data-tilt>
                <img src={require('./images/img-01.png')} alt="IMG"/>
              </div>

              <form className="login100-form validate-form">
                <span className="login100-form-title">
                  Member Login
                </span>

                <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                  <input className="input100" value={this.state.email} onChange={this.handleChangeName} type="email" name="email" placeholder="Email/Username"/>
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                  </span>
                </div>

                <div className="wrap-input100 validate-input" data-validate = "Password is required">
                  <input className="input100" value={this.state.password} onChange={this.handleChangePassword} type="password" name="pass" placeholder="Password"/>
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <i className="fa fa-lock" aria-hidden="true"></i>
                  </span>
                </div>
                
                <div className="container-login100-form-btn">
                  <button className="login100-form-btn" onClick={this.login}>
                    Login
                  </button>
                </div>

                <div className="container-login100-form-btn">
                  <button className="login100-form-btn" onClick={this.signup}>
                  Register
                  </button>
                </div>

                <div className="text-center p-t-12">
                  <span className="txt1">
                    Forgot
                  </span>
                  <a className="txt2" href="#">
                    {' Username / Password?'}
                  </a>
                </div>

                <div className="text-center p-t-136">
                  <a className="txt2">
                    Created for Hack the North 2019
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        



      </body>
    );
  }
}
export default Login;
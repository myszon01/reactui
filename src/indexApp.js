import 'babel-polyfill';
import 'matchmedia-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import App from './js/App'
import HomePage from './js/HomePage'
import './css/homePage.css';
import logo from './logo.svg';
import { withAdalLoginApi, authContext } from './adalConfig';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


class EntryPage extends React.PureComponent{
  constructor(props){
    super(props)
    this.logOut = this.logOut.bind(this);
  }

  logOut(){
    localStorage.clear();
    window.location ="https://login.microsoftonline.com/cfd22cf0-e01a-419f-bc11-a2a7eb936762/oauth2/logout"
  }



  render(){
      const Navbar = () =>{
          
          if(authContext._user === null){
              return(
              <div className="collapse navbar-collapse" id="myNavbar">
                      <ul className="nav navbar-nav">
                          <li><a href="/">Home Page</a></li>
                      </ul>
                      <ul className="nav navbar-nav navbar-right">
                          <li><a href="/login">Login</a></li>
                      </ul>
                  </div>
              )
          } else {
              return(
                  <div className="collapse navbar-collapse" id="myNavbar">
                      <ul className="nav navbar-nav">
                          <li><a href="/">Home Page</a></li>
                          <li><a href="/app">App</a></li>
                      </ul>
                      <ul className="nav navbar-nav navbar-right">
                          <li><a href="javascript:void(0)" onClick={this.logOut}><span className="glyphicon glyphicon-log-in"></span> Logout, {authContext._user.userName} </a></li>
                      </ul>
                  </div>
              )

          }
          
      }
      const Welcome = () =>{
        if(authContext._user === null){
        return(
          <h1 className="App-title">Welcome, please login </h1>
        )
        } else {
          return(
            <h1 className="App-title">Welcome  {authContext._user.userName} </h1>
          )
        }
      }
      // Request login to AAD
      const AppComponent = withAdalLoginApi( () => <App/>, (error) => <div>{error}</div>);
      return(
        <Router>
          <div className = "App col-lg-10 col-centered">
              <nav className="navbar navbar-inverse">
              <div className="container-fluid">
                  <div className="navbar-header">
                      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                      </button>
                  </div>
                  <Navbar/>
              </div>
              </nav>
            <div className="App-header" >
              <img src={logo} className="App-logo" alt="logo" />
              <Welcome />
            </div>
            <Switch>
              <Route exact path='/login'  component={AppComponent} />
              <Route exact path='/app'  component={AppComponent} />
              <Route exact path='/'  component={HomePage} />
            </Switch> 
          </div>
        </Router>        
            
      )
  }
}

  ReactDOM.render(
    <EntryPage />,
    document.getElementById('root'),
  );
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { adalApiFetch, authContext } from './adalConfig';
import fetch from 'isomorphic-fetch';

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      workList: [],
      appList: []
      
    };

    this.getApplicationList.bind(this)
    this.logOut.bind(this)
    this.showWorkgflows = this.showWorkgflows.bind(this);
    
  }

  logOut(){
    localStorage.clear();
    window.location ="https://login.microsoftonline.com/3b3c3125-1d26-40fe-9912-89aba1e3cf32/oauth2/logout"
  }

  
  getApplicationList(){
    const myApiCall = () => adalApiFetch(fetch,"https://drm-gqfsjv-api.azurewebsites.net/api/v1/applications")
    myApiCall().then(res=>{
      return res.json()
    }).then(res =>{
      console.log(res)
      this.setState({appList: res.applications})
    })  

   
  }  


  showWorkgflows(id){
    const myApiCall = () => adalApiFetch(fetch,"https://drm-gqfsjv-api.azurewebsites.net/api/v1/contracts?workflowId="+id)
    
    myApiCall().then((res)=>{
      return res.json()
    }).then((res) =>{
      console.log(res)
      this.setState({workList: res.contracts})
    })
    
  }

componentDidMount(){
 
  this.getApplicationList();
  
}

  render() {
    

    return (
      <div className="App container">
        
        <div className="App-header" >
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React {authContext._user.userName}</h1>
          <button onClick={this.logOut}>Logout</button>
        </div>
        <div className="col-lg-6 col-centered">
          <table className="table">
            <thead>
              <tr className="thead-dark">
                <th>id</th>
                <th>name</th>
                <th>enabled</th>
              </tr>
            </thead>
            <tbody>
              {this.state.appList.map((r, k) => (
                <tr key={k}>
                    <td>{r.id}</td>
                    <td>{r.name}</td>
                    <td> <button onClick={(e) => this.showWorkgflows(r.id,e)}>Show Workflow</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
       
        <div className="col-lg-6 col-centered">
          <table className="table">
            <thead>
              <tr className="thead-dark">
                <th>id</th>
                <th>name</th>
               
              </tr>
            </thead>
            <tbody>
              {this.state.workList.map((r, k) => (
                <tr key={k}>
                    <td>{r.id}</td>
                    <td>{r.name}</td>
                    
                </tr>
              ))}
            </tbody>
          </table>
        </div>     

      </div>
    );
  }
}

export default App;

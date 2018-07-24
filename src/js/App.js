import React, { Component } from 'react';
import '../css/App.css';
import { adalApiFetch, authContext } from '../adalConfig';
import fetch from 'isomorphic-fetch';

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      workList: [],
      appList: [],
      appLabels: [],
      appUsers: []
      
    };
   
    this.getApplicationList.bind(this)
    this.logOut.bind(this)
    this.showWorkgflows = this.showWorkgflows.bind(this);
    this.checkUserByHash = this.checkUserByHash.bind(this)
    this.findDuplicates = this.findDuplicates.bind(this)
    
  }

  logOut(){
    localStorage.clear();
    window.location ="https://login.microsoftonline.com/cfd22cf0-e01a-419f-bc11-a2a7eb936762/oauth2/logout"
  }

  findDuplicates(arr) {
    arr = arr.filter((thing, index, self) =>
    index === self.findIndex((t) => (
      t.id === thing.id 
    )))
  return arr;
  }

  
  
  getApplicationList(){
    const myApiCall = () => adalApiFetch(fetch,"https://cc-44yldo-api.azurewebsites.net/api/v1/applications")
    myApiCall().then(res=>{
      return res.json()
    }).then(res =>{
      console.log(res)
      this.setState({appList: this.findDuplicates(res.applications)})
    })  
    
   

   
  }  
  
  checkUserByHash(arr){
    
  console.log(this.appUsers)
  console.log(arr)
}

  showWorkgflows(id){
    
    //get names for properties of contract for table's labels
    const myApiCall = () => adalApiFetch(fetch,"https://cc-44yldo-api.azurewebsites.net/api/v1/applications/workflows/"+id)
    myApiCall().then((res)=>{
      return res.json()
    }).then((res) =>{
       this.setState({appLabels: res.properties})
       console.log(res)
    })
    
    // assaign address in contract to the user 
    const myApiCall2 = () => adalApiFetch(fetch,"https://cc-44yldo-api.azurewebsites.net/api/v1/contracts?workflowId="+id)
    const myApiCall4 = () => adalApiFetch(fetch,"https://cc-44yldo-api.azurewebsites.net/api/v1/users")
    myApiCall4().then(res=>{
      return res.json()
    }).then(res =>{
      return res.users
    }).then(arrUsr=>{
      myApiCall2().then((res)=>{
        return res.json()
      }).then((res) =>{
        res.contracts.forEach(contract =>{
          contract.contractProperties.map(prop =>{
            arrUsr.map(usr=>{
              usr.userChainMappings.map(chain=>{
                if(chain.chainIdentifier === prop.value){
                  prop['value2'] = prop.value
                  prop.value = usr.emailAddress
                } else if(prop.value === "0x0000000000000000000000000000000000000000"){
                  prop.value = ""
                }
              })
            })
          })
        })
        
       this.setState({workList: res.contracts})
      })

    })  

    
    
    

    const myApiCall3 = () => adalApiFetch(fetch,"https://cc-44yldo-api.azurewebsites.net/api/v1/contracts/2")
    
    myApiCall3().then((res)=>{
      return res.json()
    }).then((res) =>{
      //console.log("app > work")
      console.log(res)
    })
    
  }

componentDidMount(){
 
  this.getApplicationList();
  
}

  render() {
    
    
    return (
      <div className="App">
        
        
        <div className="col-lg-10 col-centered">
          <table className="table">
          <thead>
              <tr className="thead-dark">
                <th>id</th>
                <th>name</th>
                <th> ... </th>               
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
       
        <div className="col-lg-12" style ={{overflowX: 'auto'}}>
          <table className="table">
             <thead>
             <tr className="thead-dark">
                {this.state.appLabels.map((r, k) => (
                  <th className="thead-dark" key={k}>
                      {r.displayName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {this.state.workList.map((r, k) => (
                <tr key={k}>
                    {r.contractProperties.map((r,k) =>(
                      <td key={k}>{r.value}</td>
                    ))} 
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

import React from 'react';
import '../css/App.css';
import { adalApiFetch,  AppID } from '../adalConfig';
import fetch from 'isomorphic-fetch';
import OEM from './OEM'
import RentalCompany from './RentalCompany'
import Driver from './Driver'

class App extends React.PureComponent {

  constructor(props){
    super(props)
    this.state = {
      workList: [],
      appList: [],
      appLabels: [],
      appUsers: [],
      appRole: [],
      appStates: [],
      appUserMe: [],
      app: [],
      usersDeviceAddress: []
      
    };
   
    this.getApplicationList.bind(this)
    this.logOut.bind(this)
    this.showWorkgflows = this.showWorkgflows.bind(this);
    this.findDuplicates = this.findDuplicates.bind(this)
    this.getApplicationRoles = this.getApplicationRoles.bind(this)
    this.createCar = this.createCar.bind(this)
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
    const myApiCall4 = () => adalApiFetch(fetch,"https://cc-44yldo-api.azurewebsites.net/api/v1/applications")
    myApiCall4().then(res=>{
      return res.json()
    }).then(res =>{
      this.setState({appList: this.findDuplicates(res.applications)})
    }) 
  }
  
  getApplicationRoles(){
    const myApiCall = () => adalApiFetch(fetch,"https://cc-44yldo-api.azurewebsites.net/api/v1/users/me")
    const myApiCall2 = () => adalApiFetch(fetch,"https://cc-44yldo-api.azurewebsites.net/api/v1/applications/"+AppID+"/roleAssignments")
    const myApiCall3 = () => adalApiFetch(fetch,"https://cc-44yldo-api.azurewebsites.net/api/v1/applications/"+AppID)

    myApiCall().then(usr=>{
      return usr.json()
    }).then(usr =>{
      this.setState({appUserMe: usr})
      myApiCall2().then(roles=>{
        return roles.json()
      }).then(roles =>{
        const role = roles.roleAssignments.find( role =>{
          return role.user.userID === usr.currentUser.userID
        })
        const users = roles.roleAssignments.filter(role =>{
          return role.applicationRoleId === 11
        })
        this.setState({usersDeviceAddress: users})
        myApiCall3().then(app=>{
          return app.json()
        }).then(app =>{
          const appRole= app.applicationRoles.find( appRole =>{
            return appRole.id === role.applicationRoleId
          })
          this.setState({appRole: appRole.name, appUsers: app.applicationRoles})
          
        })
      }) 
    })  
  }  

  createCar(body){
    const opt = {
                  method: "POST",
                  body: JSON.stringify(body),
                  headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                  }
                }
    const myApiCall = () => adalApiFetch(fetch,"https://cc-44yldo-api.azurewebsites.net/api/v1/contracts?workflowId=3&contractCodeId=3&connectionId=1", opt) 
    console.log(opt)
    myApiCall().then(res =>(res.json)).then(res=>{console.log(res)})

  }


  

  showWorkgflows(id){
    
    //get names for properties of contract for table's labels
    const myApiCall1 = () => adalApiFetch(fetch,"https://cc-44yldo-api.azurewebsites.net/api/v1/applications/workflows/"+id)
    myApiCall1().then((res)=>{
      return res.json()
    }).then((res) =>{
      console.log(res)
       this.setState({appLabels: res.properties, appStates: res.states,app: res})
    })
    
    // assaign address in contract to the user 
    const myApiCall2 = () => adalApiFetch(fetch,"https://cc-44yldo-api.azurewebsites.net/api/v1/users")
    const myApiCall3 = () => adalApiFetch(fetch,"https://cc-44yldo-api.azurewebsites.net/api/v1/contracts?workflowId="+id)
    myApiCall2().then(res=>{
      return res.json()
    }).then(res =>{
      return res.users
    }).then(arrUsr=>{
      myApiCall3().then((res)=>{
        return res.json()
      }).then((res) =>{
        console.log(res)
        res.contracts.forEach(contract =>{
          contract.contractProperties.forEach(prop =>{
            arrUsr.forEach(usr=>{
              usr.userChainMappings.forEach(chain=>{
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
    
  }

componentDidMount(){
  this.getApplicationRoles()
  this.getApplicationList();
  
}

  render() {
    
    
    return (
      <div> 
        <h1>{this.state.appRole}</h1>
        {(() => {
          switch (this.state.appRole) {
              case 'OEM':
                  return <OEM state = {this.state} showWorkgflows = {this.showWorkgflows.bind(this)} createCar={this.createCar.bind(this)} />
              case 'RentalCompany':
                  return <RentalCompany state = {this.state} showWorkgflows = {this.showWorkgflows.bind(this)} />
              case 'Driver':
                  return <Driver state = {this.state} showWorkgflows = {this.showWorkgflows.bind(this)} />
              default :
                  null
          }
        })()}
      </div>
    );
  }
}

export default App;

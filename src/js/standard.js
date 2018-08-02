import React, { Component } from 'react';


class Standard extends React.PureComponent {
    constructor(props){
        super(props)
        this.state = {test: []};
        this.showWorkgflows = this.props.showWorkgflows
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
                  {this.props.state.appList.map((r, k) => (
                    <tr key={k}>
                        <td>{r.id}</td>
                        <td>{r.name}</td>
                        <td> <button onClick={(e) => this.props.showWorkgflows(r.id,e)}>Show Workflow</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
           
            <div className="col-lg-12" style ={{overflowX: 'auto'}}>
              <table className="table">
                 <thead>
                 <tr className="thead-dark">
                    {this.props.state.appLabels.map((r, k) => (
                      <th className="thead-dark" key={k}>
                          {r.displayName}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {this.props.state.workList.map((r, k) => (
                    <tr key={k}>
                        {r.contractProperties.map((t,y) =>{
                            if (y===0){
                                //console.log(this.props.state.appStates[r.value].displayName)
                              return (<td key={y}>{this.props.state.appStates[t.value].displayName}</td>)
                            }else {
                              return (<td key={y}>{t.value}</td>)
                            }
                        })} 
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>     
    
          </div>
        );
      }  


    }

 export default Standard;   
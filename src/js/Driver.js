import React from 'react';
import Cars from './Components/Cars'
import Modal from 'react-responsive-modal';

class Driver extends React.PureComponent {

        constructor(props){
            super(props)
            this.state = {openModal: false}
            this.openActions = this.openActions.bind(this)
        }

      componentDidMount(){
        this.props.showWorkgflows(3)
      }

      openActions(e) {
                if(this.state.openModal){
                    this.setState({ openModal: false })
                }else{
                    this.setState({ openModal: true })
                }
            };

      render() {
        const skipContracts = []
        
        this.props.state.workList.map((con, k) =>{
            (con.contractProperties[3].value === '' || 
                con.contractProperties[3].value2 
                    === this.props.state.appUserMe.currentUser.userChainMappings[0].chainIdentifier)?console.log():skipContracts.push(k)
        })
        return(
            <div>
                <div className="col-lg-12" style ={{overflowX: 'auto'}}>
                    <Cars stateIDs = {[1,2]} state = {this.props.state} colIndex={[0,2,3,4,5,6,7]} skipContracts ={skipContracts} onClick={this.openActions} /> 
                </div>
                <Modal open={this.state.openModal} onClose={this.openActions} center>
                    <h2>Simple centered modal</h2>
                    <h2>Simple centered modal</h2>
                    <h2>Simple centered modal</h2>
                    <h2>Simple centered modal</h2>
                </Modal> 
            </div>
        )
      }




}

export default Driver;
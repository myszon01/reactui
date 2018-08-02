import React from 'react';
import Cars from './Components/Cars'
import Modal from 'react-responsive-modal';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


class RentalCompany extends React.PureComponent {
    constructor(props){
        super(props)
        this.state = {openModal: false, tabIndex: 0}
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
        
            this.props.state.workList.forEach((con, k) =>{
                if(con.contractProperties.length > 0){
                    (con.contractProperties[1].value === '' || 
                        con.contractProperties[1].value2 
                            === this.props.state.appUserMe.currentUser.userChainMappings[0].chainIdentifier)?console.log():skipContracts.push(k)
                }
            })
        

        return(
            <div>
                
                     
                 
                <Modal open={this.state.openModal} onClose={this.openActions} center>
                    <h2>Simple centered modal</h2>
                    <h2>Simple centered modal</h2>
                    <h2>Simple centered modal</h2>
                    <h2>Simple centered modal</h2>
                </Modal>   
                
                    <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
                        <TabList>
                            <Tab>Buy a new car</Tab>
                            <Tab>Your Inventory</Tab>
                            <Tab>Cars currently in maintenance</Tab>
                            <Tab>Cars available to rent or are rented</Tab>
                        </TabList>
                        <TabPanel>
                            <div className="col-lg-12" style ={{overflowX: 'auto'}}>
                                <Cars stateIDs = {[0]} state = {this.props.state} colIndex={[0,1,2,3,4]} skipContracts ={skipContracts} onClick={this.openActions} />
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="col-lg-12" style ={{overflowX: 'auto'}}>
                                <Cars stateIDs = {[1,2,3]} state = {this.props.state} colIndex={[0,1,2,3,4]} skipContracts ={skipContracts} onClick={this.openActions} />
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="col-lg-12" style ={{overflowX: 'auto'}}>
                                <Cars stateIDs = {[1,2,3]} state = {this.props.state} colIndex={[0,1,2,3,4]} skipContracts ={skipContracts} onClick={this.openActions} />
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="col-lg-12" style ={{overflowX: 'auto'}}>
                                <Cars stateIDs = {[1,2,3]} state = {this.props.state} colIndex={[0,1,2,3,4,5,6]} skipContracts ={skipContracts} onClick={this.openActions} />
                            </div>
                        </TabPanel>
                    </Tabs> 
                 
            </div>
        )
      }




}

export default RentalCompany;